from typing import List, Any
import os
import pandas as pd
import glob
from jugaad_data.nse import bhavcopy_save, bhavcopy_fo_save
from jugaad_data.holidays import holidays
from datetime import datetime, timedelta

import pymongo
from pymongo import MongoClient
import time
import openpyxl
from openpyxl.styles import PatternFill
from pandas.io.formats.style import Styler
import calendar


Result = pd.DataFrame()
WFResult = pd.DataFrame()
MFResult = pd.DataFrame()

FPath = "/home/pnp/Bhavcopy"

CreFile = FPath +  "/*.csv"



total = {}

HOST = '192.168.100.22'  #192.168.100.22
PORT = 27017 

client = MongoClient(HOST, PORT)

db = client["IOptionData"]


j=0

def EFChange(x):
    return datetime.strptime(x, '%d-%b-%Y').strftime('%Y%m%d')

def WeeDay(x):
    return calendar.day_name[datetime.strptime(x, '%Y%m%d').weekday()]

def Stdpoint(x, y):
    return round(((round(x/100)*100) * y * 0.01),2) 

def BhavDownload(SDate, EDate):
    global Filename

    FPath = "/home/pnp/Bhavcopy" +  "/*.csv"

    Filename = glob.glob(FPath, recursive = True)

def VixUpdate():
    global vdf

    VPath = "/home/pnp/Bhavcopy/IndiaVix" +  "/*.csv"

    VFilename = glob.glob(VPath, recursive = True)

    for file in VFilename:

        if ("hist" in file):
            vdf = pd.read_csv(file)
            vdf["Date"] = vdf["Date "].apply(EFChange)
            vdf.drop(["Date "],axis=1,inplace=True)

    print(vdf)

def CollUpdate():
    global db
    global vdf

    for file in Filename:

        if ("bhav" in file):
            
            # print(file)
            bpd = pd.read_csv(file)

            bpd.drop(
                ["OPEN", "HIGH", "LOW", "CONTRACTS", "VAL_INLAKH", "OPEN_INT", "CHG_IN_OI"],
                axis=1, inplace=True)

            # FUTURE

            bpd["EXPIRY_DT"] = bpd["EXPIRY_DT"].apply(EFChange)
            bpd["TIMESTAMP"] = bpd["TIMESTAMP"].apply(EFChange)
            
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

# 

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
            DS = (FTDf["TIMESTAMP"].iloc[0])     # DAY
    #
            DSeries = (datetime.strptime(DS, '%d-%b-%Y').strftime('%Y%m%d'))
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

            ResultPer["Expiry"] = (datetime.strptime(ESeries, '%d-%b-%Y').strftime('%Y%m%d'))

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
            
def color_rule(val):
    global j
    global MFResult
    global WFResult

    clist = []

    if val.name=="%ChangeWBN" or val.name=="%ChangeWN" or val.name=="%ChangeMBN" or val.name=="%ChangeMN":

        if val.name=="%ChangeWBN":
            VarD = WFResult.iloc[1]
        elif val.name=="%ChangeWN":
            VarD = WFResult.iloc[0]
        elif val.name=="%ChangeMN":
            VarD = MFResult.iloc[0]
        elif val.name=="%ChangeMBN":
            VarD = MFResult.iloc[1]


        for x in VarD:
            if x>20:
                clist.append('background-color: red')
            elif x>10:
                clist.append('background-color: orange')
            elif x>0:
                clist.append('background-color: yellow')
            else:
                clist.append('background-color: None')           

    else:
        for x in val:
            clist.append('background-color: None') 

    return clist

def DataSheet():

    global db
    global Filename
    global MFResult
    global WFResult

    df = pd.DataFrame(list(db["NIOData"].find()))
    df = df.sort_values('Date')
    df.reset_index(inplace=True)

    SDate = list(df["Date"].tail(1))[0]

    SDate1 = (datetime.strptime(SDate, '%Y%m%d') + timedelta(days=1)).strftime('%Y%m%d')

    EDate = (datetime.today() + timedelta(days=1)).strftime('%Y%m%d')

    print(SDate, " : ", EDate)

    BhavDownload(SDate1, EDate)

    CollUpdate()

    df = pd.DataFrame(list(db["NIOData"].find()))
    df = df.sort_values('Date')
    df.reset_index(inplace=True)

    df.drop(["_id","index"],axis=1, inplace=True)

    df["PClose"] = pd.concat([pd.Series([df.iloc[0,7]]),df["FPrice"]]).reset_index().drop(["index"],axis=1)

    df["PClose"] = df["PClose"].astype(float)

    df["PChange"] = round((((df["FPrice"]-df["PClose"])/df["PClose"])*100),2)   
    
    df["WeekDay"] = df["Date"].apply(WeeDay)

    
    df['WEEKLY STD PTS N'] = df[['FPrice','WSPer']].apply(lambda x: Stdpoint(*x), axis=1)
    df['MONTHLY STD PTS N'] = df[['FPrice','MSPer']].apply(lambda x: Stdpoint(*x), axis=1)

    NFDf = df[['WeekDay', 'Date', 'FPrice', 'PChange', 'IV', 'IVP', 'WExpiry','WEEKLY STD PTS N', 'WSPer', 'MExpiry', 'MONTHLY STD PTS N', 'MSPer']]

    NFDf.rename(columns = {'FPrice':'NIFTY CLOSING', 'PChange':"%ChangeN", 'IVP':"%ChangeIV" , 'WSPer':"%ChangeWN" , 'MSPer':"%ChangeMN"}, inplace = True)


    NFDf = NFDf.sort_values("Date", ascending=False).reset_index().drop(["index"],axis=1)

# 

    df = pd.DataFrame(list(db["BNIODATA"].find()))
    df = df.sort_values('Date')
    df.reset_index(inplace=True)

    df.drop(["_id","index"],axis=1, inplace=True)

    df["PClose"] = pd.concat([pd.Series([df.iloc[0,7]]),df["FPrice"]]).reset_index().drop(["index"],axis=1)

    df["PClose"] = df["PClose"].astype(float)

    df["PChange"] = round((((df["FPrice"]-df["PClose"])/df["PClose"])*100),2)   
    
    df["WeekDay"] = df["Date"].apply(WeeDay)

    
    df['WEEKLY STD PTS BN'] = df[['FPrice','WSPer']].apply(lambda x: Stdpoint(*x), axis=1)
    df['MONTHLY STD PTS BN'] = df[['FPrice','MSPer']].apply(lambda x: Stdpoint(*x), axis=1)

    BNFDf = df[['WeekDay', 'Date', 'FPrice', 'PChange', 'IV', 'IVP', 'WEEKLY STD PTS BN', 'WSPer', 'MONTHLY STD PTS BN', 'MSPer']]

    BNFDf.rename(columns = {'FPrice':'BANKNIFTY CLOSING', 'PChange':"%ChangeBN", 'IVP':"%ChangeIV" , 'WSPer':"%ChangeWBN" , 'MSPer':"%ChangeMBN"}, inplace = True)

    BNFDf1 = BNFDf[["Date", 'BANKNIFTY CLOSING', "%ChangeBN", 'WEEKLY STD PTS BN' , "%ChangeWBN", 'MONTHLY STD PTS BN', "%ChangeMBN", ]] 

    # print(BNFDf1)
    BNFDf1 = BNFDf1.sort_values("Date", ascending=False).reset_index().drop(["index","Date"],axis=1)

    Fdf = pd.concat([NFDf, BNFDf1], axis=1)

    print(Fdf)

# 
    
    FResultPerT2 = Fdf[["Date", "WExpiry", '%ChangeWN', '%ChangeWBN']].sort_values('Date', ascending=True)

    CheckFinal: list[Any] = list(FResultPerT2.groupby("WExpiry"))

    for i in range(0, len(CheckFinal)):

        MeanDf = CheckFinal[i][1].set_index("Date").drop(["WExpiry"], axis=1).expanding().mean()
        Bothdf = pd.concat([CheckFinal[i][1].set_index("Date"), MeanDf]).reset_index().groupby("Date")

        CalDf = ((((Bothdf.first().drop(["WExpiry"], axis=1)) - (Bothdf.last().drop(["WExpiry"], axis=1)))*100)/(Bothdf.last().drop(["WExpiry"], axis=1)))

        GDF = CalDf[((((Bothdf.first().drop(["WExpiry"], axis=1)) - (Bothdf.last().drop(["WExpiry"], axis=1)))*100)/(Bothdf.last().drop(["WExpiry"], axis=1))) > 0]

        WFResult = pd.concat([WFResult, GDF])

    WFResult = WFResult.fillna(-1).sort_values('Date', ascending=False)

    WFResult = WFResult.T

# 

    FResultPerT2 = Fdf[["Date", "MExpiry", '%ChangeMN', '%ChangeMBN']].sort_values('Date', ascending=True)

    CheckFinal: list[Any] = list(FResultPerT2.groupby("MExpiry"))

    for i in range(0, len(CheckFinal)):

        MeanDf = CheckFinal[i][1].set_index("Date").drop(["MExpiry"], axis=1).expanding().mean()
        Bothdf = pd.concat([CheckFinal[i][1].set_index("Date"), MeanDf]).reset_index().groupby("Date")

        CalDf = ((((Bothdf.first().drop(["MExpiry"], axis=1)) - (Bothdf.last().drop(["MExpiry"], axis=1)))*100)/(Bothdf.last().drop(["MExpiry"], axis=1)))

        GDF = CalDf[((((Bothdf.first().drop(["MExpiry"], axis=1)) - (Bothdf.last().drop(["MExpiry"], axis=1)))*100)/(Bothdf.last().drop(["MExpiry"], axis=1))) > 0]

        MFResult = pd.concat([MFResult, GDF])

    MFResult = MFResult.fillna(-1).sort_values('Date', ascending=False)

    MFResult = MFResult.T

# 

    CRes = Fdf.set_index("Date").drop(["WExpiry","MExpiry"], axis=1)

    html_column = CRes.style.apply(color_rule, axis=0)

    html_column.to_excel('AUpdatedI.xlsx', engine='openpyxl')


if __name__ == '__main__':
    global vdf
    Filename = glob.glob(CreFile, recursive = True)
    VixUpdate()

    try:
        db.validate_collection("NIOData")
        DataSheet()
    except pymongo.errors.OperationFailure:
        Filename = glob.glob(CreFile, recursive = True)

        if len(Filename)==0 :
            print("No File")
            BhavDownload("20220101", "20220105")
        
        # print(Filename)


        VixUpdate()
        CollUpdate()
        DataSheet()