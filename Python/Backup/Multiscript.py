from datetime import datetime
print(datetime.now())
import pandas as pd
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
dflist = []
try:

    # print(datetime.now())
    db_connect = pymongo.MongoClient('192.168.100.22', 27017)
    for db in db_connect.list_databases():
        for coll in db_connect[db["name"]].list_collection_names():
            DBName = db["name"]
            ColName = coll
            
            if ColName in ["T100", "T1467", "T8112"]:

                CName = db_connect[DBName][ColName]

                # CName.drop_index('OBIndex')

                # CName.create_index([('OType',pymongo.ASCENDING),('BS',pymongo.ASCENDING)],name="OBIndex")

                NC = list(CName.find({"OType":"N"}))
                df = pd.DataFrame(NC) 


                df["TStamp"] = df["TStamp"].apply(lambda x: (datetime.fromtimestamp(x/1000000)))
                df.drop(["_id","Stream","Exchange","SN","SNumber","Order"], inplace=True, axis=1)
                rdf = list(df.resample('1Min', on='TStamp'))

                rdf[0][1]["TStamp"] = rdf[0][1]["TStamp"].apply(lambda x: (str(x).split(" "))[1][:5])
                Finaldf = (rdf[0][1].groupby(["TStamp","Token","BS"]).aggregate({"Price":["mean"],"SNO":["count"],"Qty":["sum"]}))

                for i in range(1,len(rdf)):

                    rdf[i][1]["TStamp"] = rdf[i][1]["TStamp"].apply(lambda x: (str(x).split(" "))[1][:5])
                    urdf = (rdf[i][1].groupby(["TStamp","Token","BS"]).aggregate({"Price":["mean"],"SNO":["count"],"Qty":["sum"]}))
                    Finaldf = pd.concat([Finaldf,urdf])
                

                dflist.append(Finaldf)
                print(Finaldf)


    print(pd.concat(dflist, axis =0))
    print(datetime.now())

except Exception as e:
    print(e)

