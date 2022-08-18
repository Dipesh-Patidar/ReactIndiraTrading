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

Result = pd.DataFrame()
FResult = pd.DataFrame()

FPath = "C:\\Users\\Sachin\\Desktop\\DEVELOPMENT\\Python\\Bhavcopy"

CreFile = FPath +  "/*.csv"



total = {}

HOST = 'localhost'  #192.168.100.22
PORT = 27017 

client = MongoClient(HOST, PORT)

db = client["IOptionData"]


j=0

def EFChange(x):
    return datetime.strptime(x, '%d-%b-%Y').strftime('%Y%m%d')


def color_rule(val):
    global j
    global FResult

    print(j)
    VarD = FResult.iloc[j]
    j = j + 1

    clist = []
    for x in VarD:
        if x>20:
            clist.append('background-color: red')
        elif x>15:
            clist.append('background-color: orange')
        elif x>10:
            clist.append('background-color: yellow')
        else:
            clist.append('background-color: None')           

    
    # print(clist)   
    return clist


def Style():
    global FResult
    global j

    FResultPerT2 = pd.read_csv("IOptionData.csv")

# 
    print(FResultPerT2)

#

    FResultPerM = FResultPerT2.loc[ : , ["Date","MExpiry","MSPer"]]
    print("FResultPerM")
    print(FResultPerM)
    MCheckFinal: list[Any] = list(FResultPerM.groupby("MExpiry"))

    FResult = pd.DataFrame()

    print("FResult: ",FResult)

    for i in range(0, len(MCheckFinal)):

        MMeanDf = MCheckFinal[i][1].set_index("Date").drop(["MExpiry"], axis=1).expanding().mean()
        MBothdf = pd.concat([MCheckFinal[i][1].set_index("Date"), MMeanDf]).reset_index().groupby("Date")

        MCalDf = ((((MBothdf.first().drop(["MExpiry"], axis=1)) - (MBothdf.last().drop(["MExpiry"], axis=1)))*100)/(MBothdf.last().drop(["MExpiry"], axis=1)))

        MGDF = MCalDf[((((MBothdf.first().drop(["MExpiry"], axis=1)) - (MBothdf.last().drop(["MExpiry"], axis=1)))*100)/(MBothdf.last().drop(["MExpiry"], axis=1))) > 0]

        FResult = pd.concat([FResult, MGDF])

    FResult = FResult.fillna(-1)

    CResM = FResultPerM.set_index("Date").drop(["MExpiry"], axis=1)
    html_columnM = CResM.style.apply(color_rule, axis=1)

# 
    FResultPerW = FResultPerT2.loc[0: , ["Date","WExpiry","WSPer"]]
    print("FResultPerM")
    print(FResultPerW)
    CheckFinal: list[Any] = list(FResultPerW.groupby("WExpiry"))

    FResult = pd.DataFrame()
    j=0

    for i in range(0, len(CheckFinal)):

        MeanDf = CheckFinal[i][1].set_index("Date").drop(["WExpiry"], axis=1).expanding().mean()
        Bothdf = pd.concat([CheckFinal[i][1].set_index("Date"), MeanDf]).reset_index().groupby("Date")

        CalDf = ((((Bothdf.first().drop(["WExpiry"], axis=1)) - (Bothdf.last().drop(["WExpiry"], axis=1)))*100)/(Bothdf.last().drop(["WExpiry"], axis=1)))

        GDF = CalDf[((((Bothdf.first().drop(["WExpiry"], axis=1)) - (Bothdf.last().drop(["WExpiry"], axis=1)))*100)/(Bothdf.last().drop(["WExpiry"], axis=1))) > 0]

        FResult = pd.concat([FResult, GDF])

    FResult = FResult.fillna(-1)

    CResW = FResultPerW.set_index("Date").drop(["WExpiry"], axis=1)
    html_columnW = CResW.style.apply(color_rule, axis=1)

    MWdf = pd.concat([html_columnM,html_columnW])

    print(MWdf)
    MWdf.to_excel('IOstyledWM.xlsx', engine='openpyxl')

# 

    # RFResultPerT2
def BhavDownload(SDate, EDate):
    global Filename

    Filename = []

    date_range = pd.bdate_range(start=SDate, end = EDate,
                    freq='C', holidays = holidays((2022)))

    dates = [x.date() for x in date_range]

    for date1 in dates:

        try:

          BD = (bhavcopy_fo_save(date1, FPath))
          print(BD)
          Filename.append(BD)
          time.sleep(1) 

        except:
            time.sleep(1)
            continue

    Filename = Filename[1:]

def VixUpdate():
    global vdf

    for file in Filename:

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
            
            ibpd = (bpd[bpd["SYMBOL"]=="NIFTY"].groupby(["EXPIRY_DT","INSTRUMENT"]).first())

            # ibpd = ibpd.sort_values(by=['EXPIRY_DT'])

            ibpd = ibpd.reset_index()

            ibpd1 = (ibpd.groupby("INSTRUMENT").nth([0,1])).reset_index()

            CD = ibpd1.iloc[0,7]   #CurentDate
            MS = ibpd1.iloc[0,6]

            MSp = (round((ibpd1.iloc[0,6])/100)*100)   #MonthlySettlementPrice_StrikePrice
            WEx = ibpd1.iloc[2,1]   #WeeklyExpiry
            MEx = ibpd1.iloc[0,1]   #MonthlyExpiry
            if WEx==MEx:
                MEx = ibpd1.iloc[1,1]

            Wdf = bpd[(bpd["SYMBOL"]=="NIFTY") & (bpd["EXPIRY_DT"]==WEx) & (bpd["STRIKE_PR"]==MSp)]
            Mdf = bpd[(bpd["SYMBOL"]=="NIFTY") & (bpd["EXPIRY_DT"]==MEx) & (bpd["STRIKE_PR"]==MSp)]

            WPer = round(((Wdf["CLOSE"].sum()/MSp)*100),2)
            MPer = round(((Mdf["CLOSE"].sum()/MSp)*100),2)

            IV = round((vdf[(vdf["Date"]==CD)].reset_index().iloc[0,4]),2)

            IVP = round((vdf[(vdf["Date"]==CD)].reset_index().iloc[0,7]),2)

            dic = ({"Date":CD, "WExpiry": WEx, "WSPer": WPer, "MExpiry": MEx, "MSPer": MPer, "IV":IV, "IVP":IVP, "FPrice": MS})

            # dic = {"Date":CD, "Expiry": WEx, "WSPer": WPer}
            # dic = {"Date":CD, "Expiry": MEx, "MSPer": WPer}

            print(dic)

            db["IOData"].insert_one(dic)

def DataSheet():

    global db
    global Filename

    df = pd.DataFrame(list(db["IOData"].find()))
    df = df.sort_values('Date')
    df.reset_index(inplace=True)

    # SDate = list(df["Date"].tail(1))[0]

    # EDate = (datetime.today() + timedelta(days=1)).strftime('%Y%m%d')

    # print(SDate, " : ", EDate)

    # BhavDownload(SDate, EDate)

    # CollUpdate()

    # df = pd.DataFrame(list(db["IOData"].find()))
    # df = df.sort_values('Date')
    # df.reset_index(inplace=True)

    df.drop(["_id","index"],axis=1, inplace=True)

    df["PClose"] = pd.concat([pd.Series([df.iloc[0,7]]),df["FPrice"]]).reset_index().drop(["index"],axis=1)

    df["PClose"] = df["PClose"].astype(float)

    print(df["PClose"])
    print(df["FPrice"])

    df["PChange"] = round((((df["FPrice"]-df["PClose"])/df["PClose"])*100),2)   
    

    print(df)
    df.to_csv("IOptionData.csv")

    # Style()


if __name__ == '__main__':
    global vdf

    try:
        db.validate_collection("IOData")
        DataSheet()
        Style()
    except pymongo.errors.OperationFailure:
        Filename = glob.glob(CreFile, recursive = True)

        if len(Filename)==0 :
            print("No File")
            BhavDownload("20220101", "20220105")
        
        # print(Filename)


        VixUpdate()
        CollUpdate()
        DataSheet()
        Style()
