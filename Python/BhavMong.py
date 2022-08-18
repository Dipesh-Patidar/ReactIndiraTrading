from typing import List, Any
import os
import pandas as pd
import glob
#from jugaad_data.nse import bhavcopy_save, bhavcopy_fo_save
#from jugaad_data.holidays import holidays
from datetime import datetime, timedelta

import pymongo
from pymongo import MongoClient
import time
# import openpyxl
# from openpyxl.styles import PatternFill

# Result = pd.DataFrame()
# FResult = pd.DataFrame()

# total = {}

# HOST = '192.168.100.22'
# PORT = 27017 

# client = MongoClient(HOST, PORT)

# db = client["OptionData"]

def CollUpdate():
    global db
    for file in Filename:

        if ("bhav" in file):
            # print(file)
            bpd = pd.read_csv(file)

            bpd.drop(
                ["OPEN", "HIGH", "LOW", "CONTRACTS", "VAL_INLAKH", "OPEN_INT", "CHG_IN_OI"],
                axis=1, inplace=True)

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
            total[DSeries] = ResultPer

            # print(ResultPer)

            MIndex = [[DSeries, DSeries, DSeries], ["ATM_PR", "SETTLE_PR", "Percentage"]]

            tuples = list(zip(*MIndex))

            Index = pd.MultiIndex.from_tuples(tuples, names=["first", "second"])

            Result1 = pd.DataFrame([ResultP, ResultS, ResultPer], index=Index)

            Result1 = Result1.reset_index()

            df_dict = Result1.to_dict('records')

            db["OData"].insert_many(df_dict)

            db["ODataPer"].insert_one(ResultPer.to_dict())

if __name__ == '__main__':

    FPath = "/home/pnp/Bhavcopy"
    LPath = "/home/pnp/Bhavcopy/Backup"

    CreFile = LPath +  "/*.csv"

    Filename = glob.glob(CreFile, recursive = True)

    print(Filename)
    for i in Filename:
        os.rename(i,FPath+i.split("/")[-1])


