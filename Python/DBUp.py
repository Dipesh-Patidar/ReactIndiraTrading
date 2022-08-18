from typing import List, Any
import os
import pandas as pd
import glob
from datetime import datetime, timedelta

import pymongo
from pymongo import MongoClient
import time
from pandas.io.formats.style import Styler
import calendar


FPath = "/home/pnp/Bhavcopy"
LPath = "/home/pnp/Bhavcopy/Backup/"

HOST = '192.168.100.22'  #192.168.100.22
PORT = 27017 

client = MongoClient(HOST, PORT)

db = client["IOptionData"]

def EFChange(x):
    return datetime.strptime(x, '%d-%b-%Y').strftime('%Y%m%d')

def WeeDay(x):
    return calendar.day_name[datetime.strptime(x, '%Y%m%d').weekday()]

def Stdpoint(x, y):
    return round(((round(x/100)*100) * y * 0.01),2) 

def BhavDownload():
    global Filename

    FilePath = FPath +  "/*.csv"

    Filename = glob.glob(FilePath, recursive = True)

def VixUpdate():
    global vdf

    VPath = "/home/pnp/Bhavcopy/IndiaVix" +  "/*.csv"

    VFilename = glob.glob(VPath, recursive = True)

    for File1 in VFilename:

        if ("hist" in File1):
            vdf = pd.read_csv(File1)
            vdf["Date"] = vdf["Date "].apply(EFChange)
            vdf.drop(["Date "],axis=1,inplace=True)

    print(vdf)

def CollUpdate():
    global db
    global vdf

    for File1 in Filename:

        if ("bhav" in File1):
            
            # print(File1)
            bpd = pd.read_csv(File1)

            bpd.drop(
                ["OPEN", "HIGH", "LOW", "CONTRACTS", "VAL_INLAKH", "OPEN_INT", "CHG_IN_OI"],
                axis=1, inplace=True)

            # FUTURE

            bpd["EXPIRY_DT"] = bpd["EXPIRY_DT"].apply(EFChange)
            bpd["TIMESTAMP"] = bpd["TIMESTAMP"].apply(EFChange)

# NIFTY Straddle 

            Nibpd1 = (((bpd[bpd["SYMBOL"]=="NIFTY"].groupby(["EXPIRY_DT","INSTRUMENT"]).first()).reset_index()).groupby("INSTRUMENT").nth([0,1])).reset_index()

            CD = Nibpd1.iloc[0,7]   #CurentDate
            MS = Nibpd1.iloc[0,6]

            MSp = (round((Nibpd1.iloc[0,6])/100)*100)   #MonthlySettlementPrice_StrikePrice
            WEx = Nibpd1.iloc[2,1]   #WeeklyExpiry
            MEx = Nibpd1.iloc[0,1]   #MonthlyExpiry
            if WEx==MEx:
                MEx = Nibpd1.iloc[1,1]

            Wdf = bpd[(bpd["SYMBOL"]=="NIFTY") & (bpd["EXPIRY_DT"]==WEx) & (bpd["STRIKE_PR"]==MSp)]
            Mdf = bpd[(bpd["SYMBOL"]=="NIFTY") & (bpd["EXPIRY_DT"]==MEx) & (bpd["STRIKE_PR"]==MSp)]

            WSPoint = Wdf["CLOSE"].sum()
            MSPoint = Mdf["CLOSE"].sum()
            WPer = round(((WSPoint/MSp)*100),2)
            MPer = round(((MSPoint/MSp)*100),2)

            IV = round((vdf[(vdf["Date"]==CD)].reset_index().iloc[0,4]),2)

            IVP = round((vdf[(vdf["Date"]==CD)].reset_index().iloc[0,7]),2)

            dic = ({"Date":CD, "WExpiry": WEx, "WSPer": WPer, "WSPoint":WSPoint, "MExpiry": MEx, "MSPer": MPer, "MSPoint":MSPoint, "IV":IV, "IVP":IVP, "FPrice": MS})

            print(dic)

            db["NIOData"].insert_one(dic)

#  BANKNIFTY Straddle

            BNibpd1 = (((bpd[bpd["SYMBOL"]=="BANKNIFTY"].groupby(["EXPIRY_DT","INSTRUMENT"]).first()).reset_index()).groupby("INSTRUMENT").nth([0,1])).reset_index()

            CD = BNibpd1.iloc[0,7]   #CurentDate
            MS = BNibpd1.iloc[0,6]

            MSp = (round((BNibpd1.iloc[0,6])/100)*100)   #MonthlySettlementPrice_StrikePrice
            WEx = BNibpd1.iloc[2,1]   #WeeklyExpiry
            MEx = BNibpd1.iloc[0,1]   #MonthlyExpiry
            if WEx==MEx:
                MEx = BNibpd1.iloc[1,1]

            Wdf = bpd[(bpd["SYMBOL"]=="BANKNIFTY") & (bpd["EXPIRY_DT"]==WEx) & (bpd["STRIKE_PR"]==MSp)]
            Mdf = bpd[(bpd["SYMBOL"]=="BANKNIFTY") & (bpd["EXPIRY_DT"]==MEx) & (bpd["STRIKE_PR"]==MSp)]

            WSPoint = Wdf["CLOSE"].sum()
            MSPoint = Mdf["CLOSE"].sum()

            WPer = round(((WSPoint/MSp)*100),2)
            MPer = round(((MSPoint/MSp)*100),2)

            IV = round((vdf[(vdf["Date"]==CD)].reset_index().iloc[0,4]),2)

            IVP = round((vdf[(vdf["Date"]==CD)].reset_index().iloc[0,7]),2)

            dic = ({"Date":CD, "WExpiry": WEx, "WSPer": WPer, "WSPoint":WSPoint, "MExpiry": MEx, "MSPer": MPer, "MSPoint":MSPoint, "IV":IV, "IVP":IVP, "FPrice": MS})

            print(dic)

            db["BNIODATA"].insert_one(dic)

# Future Stocks Straddle 

            gbpd = list(bpd.groupby(["SYMBOL", "INSTRUMENT"]))

            # FUTURE

            FDf = gbpd[0::2]
            FLDf = list(list(zip(*FDf))[1])
            FTDf = pd.concat(FLDf).groupby("SYMBOL").first()

            # OPTION

            ODf = gbpd[1::2]
            OLDf = list(list(zip(*ODf))[1])
            OTDf1 = pd.concat(OLDf).set_index("SYMBOL")

            OTDf1.rename(columns={'SETTLE_PR': 'OSETTLE_PR'}, inplace=True)

            OTDf1 = OTDf1.join(FTDf["SETTLE_PR"])

            OTDf1["SSD"] = OTDf1["STRIKE_PR"] - OTDf1["SETTLE_PR"]

            OTDf1["SSD"] = OTDf1["SSD"].abs()

            ESeries = FTDf["EXPIRY_DT"].iloc[0]  # Expiry
            DSeries = (FTDf["TIMESTAMP"].iloc[0])     # DAY

    #
            print((DSeries))
    #
            OTDf = OTDf1[OTDf1["EXPIRY_DT"] == ESeries]  # CurrentExpiryOption

            OTDf = OTDf.reset_index()

            ASeries = (OTDf.groupby("SYMBOL")["SSD"].min()).rename("MinSSD")

            OSDf = (OTDf.set_index("SYMBOL"))  # OptionSymbolIndex
    #
            ATMODf = pd.merge(OSDf, ASeries, how="left", left_index=True, right_index=True)  # ATM_Option_DF
    #
            ATMODf = ATMODf[ATMODf["SSD"] == ATMODf["MinSSD"]]  # ATMOPTION

            MSSeries = (ATMODf.groupby(["SYMBOL"])["STRIKE_PR"].min()).rename("MinSTR")

            ATMODf = pd.merge(ATMODf, MSSeries, how="left", left_index=True, right_index=True)

            ATMODf = ATMODf[ATMODf["STRIKE_PR"] == ATMODf["MinSTR"]]

            ResultS = ATMODf.groupby("SYMBOL")["OSETTLE_PR"].sum()
            ResultP = ATMODf.groupby("SYMBOL")["STRIKE_PR"].mean()

            ResultPer = round(((ResultS / ResultP) * 100),2)

            ResultPer["Expiry"] = ESeries

            ResultPer["Date"] = DSeries

            # print(ResultPer)

            MIndex = [[DSeries, DSeries, DSeries], ["ATM_PR", "SETTLE_PR", "Percentage"]]

            tuples = list(zip(*MIndex))

            Index = pd.MultiIndex.from_tuples(tuples, names=["first", "second"])

            Result1 = pd.DataFrame([ResultP, ResultS, ResultPer], index=Index)

            Result1 = Result1.reset_index()

            df_dict = Result1.to_dict('records')

            db["OData"].insert_many(df_dict)

            db["ODataPer"].insert_one(ResultPer.to_dict())
            
            os.rename(File1,LPath+File1.split("/")[-1])

def DataSheet():

    global db

    VixUpdate()

    BhavDownload()
    CollUpdate()
    

if __name__ == '__main__':
    global vdf
    
    DataSheet()

