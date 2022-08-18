import pandas as pd
from datetime import datetime
from flask import Flask, request
from flask_cors import CORS
import time
import glob
import os
import threading
import pymongo
import bson 
import collections
import json

# app = Flask(__name__)
# CORS(app)

print(datetime.now())
try:

    # StartTime = request.json['StartTime']
    # EndTime = request.json['EndTime']
    # LPBand = request.json['LPBand']
    # UPBand = request.json['UPBand']
    # Value = request.json['Value']
    # Quantity = request.json['Quantity']
    # TokenNo = request.json['TokenNo']
# 
    TokenNo = "3045"
    StartTime = "09:15:00"
    EndTime = "09:15:10"

    name = [str(i) for i in range(0,53)]
    sdf = pd.read_csv("security.txt", sep="|",names=name).reset_index()

    # display DataFrame

    dfS = (sdf[["index","0","1"]])

    Fdfs = dfS[["index","0"]]

    sym = ((Fdfs[Fdfs["index"]==int(TokenNo)]["0"]).to_string()).split(" ")[-1]
# 

    SH = int(StartTime.split(":")[0])
    SM = int(StartTime.split(":")[1])
    SS = int(StartTime.split(":")[2])
    EH = int(EndTime.split(":")[0])
    EM = int(EndTime.split(":")[1])
    ES = int(EndTime.split(":")[2])

    # print("Intial Data: ",df)


    date = str(datetime.now().date())

    STime = datetime(int(date[:4]), int(date[5:7]), int(date[8:10]), SH, SM, SS).timestamp()
    ETime = datetime(int(date[:4]), int(date[5:7]), int(date[8:10]), EH, EM, ES).timestamp()
    
    # print(datetime.now())
    db_connect = pymongo.MongoClient('192.168.100.22', 27017)
    for db in db_connect.list_databases():
        for coll in db_connect[db["name"]].list_collection_names():
            if (coll==("T"+TokenNo)):
                DBName = db["name"]
                ColName = coll
                break

    print("DBName: ",DBName," ColName: ",ColName)

    CName = db_connect[DBName][ColName]

    MC = list(CName.find({"$and":[{"OType":"M"},{"TStamp":{ "$gt": bson.Int64((STime * 1000000))}},{"TStamp":{ "$lt": bson.Int64((ETime * 1000000))}}]}))

    NC = list(CName.find({"$and":[{"OType":"N"},{"TStamp":{ "$gt": bson.Int64((STime * 1000000))}},{"TStamp":{ "$lt": bson.Int64((ETime * 1000000))}}]}))

    TC = list(CName.find({"$and":[{"OType":"T"},{"TStamp":{ "$gt": bson.Int64((STime * 1000000))}},{"TStamp":{ "$lt": bson.Int64((ETime * 1000000))}}]}))

    BNC = list(CName.find({"$and":[{"OType":"N"},{"BS":"B"},{"TStamp":{ "$gt": bson.Int64((STime * 1000000))}},{"TStamp":{ "$lt": bson.Int64((ETime * 1000000))}}]}))

    SNC = list(CName.find({"$and":[{"OType":"N"},{"BS":"S"},{"TStamp":{ "$gt": bson.Int64((STime * 1000000))}},{"TStamp":{ "$lt": bson.Int64((ETime * 1000000))}}]}))


    Ndf = pd.DataFrame(NC)

    Tdf = pd.DataFrame(TC)
    Mdf = pd.DataFrame(MC)

    Ndf.reset_index(inplace=True)
    MaxOID = 0
    C = Ndf[Ndf.columns[0]].count()
    # print("C: ",C)
    Od = {"SNO": [0], "Time": [" "], "Script": [sym], "NTStamp":[0], "OType": ["B"], "OrderN": ["NRML"], "Algo": ["SMP"], "MCount": [0], "SQ": ["No"],
            "SQCount": [0], "OrderID": [0], "OID": [0], "TotalNQ": [0], "TQuantity": [0], "OCount": [0], "Price": [0]}
    Odf = pd.DataFrame.from_dict(Od)

    for x in range(0, C):

        SNOT = int(int(Ndf.loc[x, "TStamp"]) / 1000000)
        ENOT = SNOT + 1


        SNOT = SNOT * 1000000
        ENOT = ENOT * 1000000

        TOI = (Ndf.loc[x, "Order"])
        TOQ = (Ndf.loc[x, "Qty"])


        OP = round((int(Ndf.loc[x, "Price"]) / 100),2)
        TNQ = int(Ndf.loc[x, "Qty"])
        TQ = Tdf[Tdf["Order"] == TOI]["Qty"].astype(int).sum()
        TQC = Tdf[Tdf["Order"] == TOI]["Qty"].astype(int).count()

        if (Ndf.loc[x, "BS"] == "B"):
            if ((Tdf[Tdf["Order"] == TOI]["Qty"]).astype(int).sum()) != 0:
                OP = (((Tdf[Tdf["Order"] == TOI]["Qty"]).astype(int) * (
                        (Tdf[Tdf["Order"] == TOI]["Price"].astype(int)) / 100)).sum()) / (
                        (Tdf[Tdf["Order"] == TOI]["Qty"]).astype(int).sum())

            TNQ = int(Ndf.loc[x, "Qty"])
            TQ = Tdf[Tdf["Order"] == TOI]["Qty"].astype(int).sum()
            TQC = Tdf[Tdf["Order"] == TOI]["Qty"].astype(int).count()
        else:
            if ((Tdf[Tdf["BS"] == TOI]["Qty"]).astype(int).sum()) != 0:
                OP = (((Tdf[Tdf["BS"] == TOI]["Qty"]).astype(int) * (
                        (Tdf[Tdf["BS"] == TOI]["Price"].astype(int)) / 100)).sum()) / (
                        (Tdf[Tdf["BS"] == TOI]["Qty"]).astype(int).sum())

            TNQ = int(Ndf.loc[x, "Qty"])
            TQ = Tdf[Tdf["BS"] == TOI]["Qty"].astype(int).sum()
            TQC = Tdf[Tdf["BS"] == TOI]["Qty"].astype(int).count()

        epoch = int(int(Ndf.loc[x, "TStamp"]) / 1000000)
        Pepoch = (time.strftime('%H:%M:%S', time.localtime(epoch)))

        ON = "NRML"
        if x > 0 and (Ndf.loc[x - 1, "Order"]) > TOI:
            ON = "SLO"

        if TNQ < TQ:
            ON = "DISO"

        MCount = (
            Mdf[(Mdf["Order"] == TOI) & (Mdf["TStamp"] >= (SNOT)) & (Mdf["TStamp"] < (ENOT))]["Qty"]).astype(
            int).count()

        AO = "SMP"
        if MCount > 0:
            AO = "Algo"

        OT = Ndf.loc[x, "BS"]

        # Similar Quantity Calculation

        SQ = "No"

        SQCount = (Ndf[(Ndf["Qty"] == TOQ) & (Ndf["BS"] == Ndf.loc[x, "BS"])]["Qty"]).astype(int).count()

        # Addition Of Same Quntity Price
        SQPrice = (Ndf[(Ndf["Qty"] == TOQ) & (Ndf["BS"] == Ndf.loc[x, "BS"])]["Price"]).astype(int).sum()

        # Average Price Of Same Quntity Price
        ASPrice = SQPrice / SQCount

        # Difference Average And Same Quntity Price
        DASPrice = ASPrice - Ndf.loc[x, "Price"]

        if SQCount > 1:
            SQ = "SQ"

        if abs(DASPrice) < (Ndf.loc[x, "Price"] * 0.005) and SQCount > 1:
            SQ = "BIDSQ"

        OID = 0
        if x==0:
            OID = 0
            MaxOID = Odf.loc[x,"OrderID"]

        else:
            if(MaxOID< Odf.loc[x-1,"OrderID"]):
                MaxOID = Odf.loc[x-1,"OrderID"]
            OID = (TOI - MaxOID)

        NTStamp = Ndf.loc[x, "TStamp"]

        Odf.loc[x] = [x, Pepoch, sym, NTStamp, OT, ON, AO, MCount, SQ, SQCount, TOI, OID, TNQ, TQ, TQC, OP]

        # print(Odf.loc[x])
    # print(datetime.now())
    result = Odf.to_json(orient="index")
    print(result)
    # return result

except Exception as e:
    print("Something issue: ",e)
