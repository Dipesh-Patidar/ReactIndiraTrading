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
    StartTime = "09:15:00"
    Mid1Time = "11:00:00"
    Mid2Time = "13:00:00" 
    EndTime = "14:45:00"

    name = [str(i) for i in range(0,53)]
    sdf = pd.read_csv("security.txt", sep="|",names=name, skiprows=1).reset_index()

    # display DataFrame

    Fdfs = (sdf[["index","0"]])

    dataDic = {"index":int, "0":str}

    Fdfs.astype(dataDic)



# 

    SH = int(StartTime.split(":")[0])
    SM = int(StartTime.split(":")[1])
    SS = int(StartTime.split(":")[2])

    MH1 = int(Mid1Time.split(":")[0])
    MM1 = int(Mid1Time.split(":")[1])
    MS1 = int(Mid1Time.split(":")[2])

    MH2 = int(Mid2Time.split(":")[0])
    MM2 = int(Mid2Time.split(":")[1])
    MS2 = int(Mid2Time.split(":")[2])

    EH = int(EndTime.split(":")[0])
    EM = int(EndTime.split(":")[1])
    ES = int(EndTime.split(":")[2])

    # print("Intial Data: ",df)


    date = str(datetime.now().date())

    STime = datetime(int(date[:4]), int(date[5:7]), int(date[8:10]), SH, SM, SS).timestamp()
    M1Time = datetime(int(date[:4]), int(date[5:7]), int(date[8:10]), MH1, MM1, MS1).timestamp()
    M2Time = datetime(int(date[:4]), int(date[5:7]), int(date[8:10]), MH2, MM2, MS2).timestamp()
    ETime = datetime(int(date[:4]), int(date[5:7]), int(date[8:10]), EH, EM, ES).timestamp()

    # print(datetime.now())
    db_connect = pymongo.MongoClient('192.168.100.22', 27017)
    for db in db_connect.list_databases():
        for coll in db_connect[db["name"]].list_collection_names():
            DBName = db["name"]
            ColName = coll
            CName = db_connect[DBName][ColName]

            # CName.create_index([("OType",pymongo.ASCENDING),("TStamp",pymongo.ASCENDING)],name = "OTIndex")
            STS = list(CName.aggregate([{ "$match": { "$and" : [{"OType":"T"},{"TStamp":{ "$gte": bson.Int64((STime * 1000000))}},{"TStamp":{ "$lt": bson.Int64((M1Time * 1000000))}}]}},{"$group":{"_id":"1", "Price": {"$avg":"$Price"}, "Qty": {"$sum":"$Qty"}}}]))

            MTS = list(CName.aggregate([{ "$match": { "$and" : [{"OType":"T"},{"TStamp":{ "$gte": bson.Int64((M1Time * 1000000))}},{"TStamp":{ "$lt": bson.Int64((M2Time * 1000000))}}]}},{"$group":{"_id":"1", "Price": {"$avg":"$Price"}, "Qty": {"$sum":"$Qty"}}}]))

            ETS = list(CName.aggregate([{ "$match": { "$and" : [{"OType":"T"},{"TStamp":{ "$gte": bson.Int64((M2Time * 1000000))}},{"TStamp":{ "$lt": bson.Int64((ETime * 1000000))}}]}},{"$group":{"_id":"1", "Price": {"$avg":"$Price"}, "Qty": {"$sum":"$Qty"}}}]))

            # CName.drop_index("OTIndex")
            if((len(STS)!=0) and (len(MTS)!=0) and (len(ETS)!=0)):
                
                STPrice = ([d["Price"] for d in (STS)])
                STQty = ([d["Qty"] for d in (STS)])

                MTPrice = ([d["Price"] for d in (MTS)])
                MTQty = ([d["Qty"] for d in (MTS)])

                ETPrice = ([d["Price"] for d in (ETS)])
                ETQty = ([d["Qty"] for d in (ETS)])

                if (ETPrice[0]>=STPrice[0]) and (MTQty[0]>STQty[0]) and (ETQty[0]>((STQty[0]+MTQty[0])*0.50)):
                    sym = ((Fdfs[Fdfs["index"]==int(ColName.split("T")[-1])]["0"]).to_string()).split(" ")[-1]
                    print(" STQty: ",STQty[0], " MTQty: ",MTQty[0]," ETQty: ",ETQty[0])
                    print(DBName," BTST Token: ",ColName, " Symbol: ",sym)
    print(datetime.now())
    
except Exception as e:
    print(e)

