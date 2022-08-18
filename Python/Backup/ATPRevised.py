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


db_connect = pymongo.MongoClient('192.168.100.22', 27017)
for db in db_connect.list_databases():
    for coll in db_connect[db["name"]].list_collection_names():
        if (coll==("T"+"3045")):
            DBName = db["name"]
            ColName = coll
            break

print("DBName: ",DBName," ColName: ",ColName)

CName = db_connect[DBName][ColName]

NC = list(CName.find())

df = pd.DataFrame(NC)

date = str(datetime.now().date())

sym = "SBIN"

Nd = {"SNO": [0], "Time": [0], "Script": [sym], "NBQ": [0], "CNBQ": [0], "NSQ": [0], "CNSQ": [0], "BATP": [0],
                "SATP": [0], "ANP": [0], "TQ": [0], "ATP": [0]}

Ndf = pd.DataFrame.from_dict(Nd)

print(datetime.now())

df["DTStamp"] = df["TStamp"].apply(lambda x: (datetime.fromtimestamp(x/1000000)))
df.drop(["_id","Stream","Exchange","SN","SNumber"], inplace=True, axis=1)

df["TStamp"] = df["TStamp"].apply(lambda x: ((x/1000000)))

rdf = list(df.resample('1Min', on='DTStamp'))

for i in range(0, len(rdf)):

    print(rdf[i][0])
    NC = rdf[i][1][rdf[i][1]["OType"] == "N"]

    BNC = NC[NC["BS"] == "B"]
    SNC = NC[NC["BS"] == "S"]

    TCD = rdf[i][1][rdf[i][1]["OType"] == "T"].reset_index(drop=True)

    TCD["D"] = TCD["Order"]-TCD["BS"]

    BTP = TCD[TCD["D"]>=0]

    STP = TCD[TCD["D"]<0]

    TQ = (TCD["Qty"]).astype(int).sum()

    NBQ = (BNC["Qty"]).astype(int).sum()
    NSQ = (SNC["Qty"]).astype(int).sum()

    CNBQ = (BNC["Qty"]).astype(int).count()
    CNSQ = (SNC["Qty"]).astype(int).count()

    ATP = 0
    ANP = 0
    BATP = 0
    SATP = 0

    if ((TCD["Qty"]).astype(int).sum()) != 0:
        ATP = round(((((TCD["Qty"]).astype(int) * ((TCD["Price"].astype(int)) / 100)).sum()) / (
            (TCD["Qty"]).astype(int).sum())), 2)

    if ((NC["Qty"]).astype(int).sum()) != 0:
        ANP = round(((((NC["Qty"]).astype(int) * ((NC["Price"].astype(int)) / 100)).sum()) / (
            (NC["Qty"]).astype(int).sum())), 2)

    if ((BTP["Qty"]).astype(int).sum()) != 0:
        BATP = round(((((BTP["Qty"]).astype(int) * ((BTP["Price"].astype(int)) / 100)).sum()) / ((BTP["Qty"]).astype(int).sum())), 2)
        
    if ((STP["Qty"]).astype(int).sum()) != 0:
        SATP = round(((((STP["Qty"]).astype(int) * ((STP["Price"].astype(int)) / 100)).sum()) / ((STP["Qty"]).astype(int).sum())), 2)
        
    print("BATP: ",BATP," SATP: ",SATP)
    if int(BATP)==0:
        BATP = ATP

    if int(SATP)==0:
        SATP = ATP  

    if not NC.empty:
        print(NC.iloc[0,1])
        print(datetime.fromtimestamp(NC.iloc[0,1]))
        Pepoch = (datetime.fromtimestamp(NC.iloc[0,1]).strftime('%H:%M'))
        print(Pepoch)

        Ndf.loc[i] = [i, Pepoch, sym, NBQ, CNBQ, NSQ, CNSQ, BATP, SATP, ANP, TQ, ATP]


result = Ndf.to_json(orient="index")

print("End: ",datetime.now())

print(result)

