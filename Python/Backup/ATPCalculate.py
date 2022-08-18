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
    # print(datetime.now())
    # if request.method == "POST":
    if 1 == 1:
        # TokenNo = request.json['TokenNo']
        # Min = float(request.json['Min'])

#       
        TokenNo = "3045"
        Min = 1.0

        name = [str(i) for i in range(0,53)]
        sdf = pd.read_csv("security.txt", sep="|",names=name).reset_index()

        # display DataFrame

        dfS = (sdf[["index","0","1"]])

        Fdfs = dfS[["index","0"]]

        sym = ((Fdfs[Fdfs["index"]==int(TokenNo)]["0"]).to_string()).split(" ")[-1]
# 

        td1 = 0
        CNepoch = 0
        Cepoch = 0

        db_connect = pymongo.MongoClient('192.168.100.22', 27017)
        for db in db_connect.list_databases():
            for coll in db_connect[db["name"]].list_collection_names():
                if (coll==("T"+TokenNo)):
                    DBName = db["name"]
                    ColName = coll
                    break

        print("DBName: ",DBName," ColName: ",ColName)

        CName = db_connect[DBName][ColName]

        NC = list(CName.find())

        df = pd.DataFrame(NC)

        date = str(datetime.now().date())

        # print(datetime.now())
        while True:
            td = datetime.now()
            if td.date() != td1:
                # (df["TStamp"][0])
                # epoch = datetime(int(td.strftime("%Y")), int(td.strftime("%m")), int(td.strftime("%d")), 9, 15).timestamp()
                epoch = datetime(int(date[:4]), int(date[5:7]), int(date[8:10]), 9, 15).timestamp()
                # print(epoch)
                # epoch = int(epoch/ 1000000)
                Sec = time.strftime('%S', time.localtime(epoch))
                epoch = epoch - int(Sec)
                Pepoch = (time.strftime('%H:%M:%S', time.localtime(epoch)))

                Nd = {"SNO": [0], "Time": [Pepoch], "Script": [sym], "NBQ": [0], "CNBQ": [0], "NSQ": [0], "CNSQ": [0], "BATP": [0],
                        "SATP": [0], "ANP": [0], "TQ": [0], "ATP": [0]}

                Ndf = pd.DataFrame.from_dict(Nd)

                Cepoch = epoch * 1000000
                CNepoch = (epoch + (60 * Min)) * 1000000
                i = 0
                td1 = td.date()

            if CNepoch - Cepoch >= (60 * Min * 1000000):

                NC = ((df["TStamp"]) >= (Cepoch)) & ((df["TStamp"]) < (CNepoch)) & (df["OType"] == "N") & (
                df["Token"] == int(TokenNo))

                TC = ((df["TStamp"]) >= (Cepoch)) & ((df["TStamp"]) < (CNepoch)) & (df["OType"] == "T") & (
                            df["BS"] == TokenNo)

                BNC = ((df["TStamp"]) >= (Cepoch)) & ((df["TStamp"]) < (CNepoch)) & (df["Token"] == int(TokenNo)) & (
                            df["OType"] == "N") & (df["BS"] == "B")
                            
                SNC = ((df["TStamp"]) >= (Cepoch)) & ((df["TStamp"]) < (CNepoch)) & (df["Token"] == int(TokenNo)) & (
                            df["OType"] == "N") & (df["BS"] == "S")

                BMNC = ((df["TStamp"]) >= (Cepoch)) & ((df["TStamp"]) < (CNepoch)) & (df["Token"] == int(TokenNo)) & ((
                    df["OType"] == "N") | (df["OType"] == "M")) & (df["BS"]=="B")

                SMNC = ((df["TStamp"]) >= (Cepoch)) & ((df["TStamp"]) < (CNepoch)) & (df["Token"] == int(TokenNo)) & ((
                            df["OType"] == "N") | (df["OType"] == "M")) & (df["BS"]=="S")

                TCD = df[TC].reset_index(drop=True)

                dfBMNC = df[BMNC]
                dfSMNC = df[SMNC]
                
                m=0
                j=0

                BTP = pd.DataFrame(columns=["SNO", "TStamp", "Stream", "Exchange", "SN", "OType", "SNumber", "Order", "Token", "BS",
                                "Price", "Qty"])
                STP = pd.DataFrame(columns=["SNO", "TStamp", "Stream", "Exchange", "SN", "OType", "SNumber", "Order", "Token", "BS",
                                "Price", "Qty"])

                for x in range(len(TCD)):
                    BTC = dfBMNC[dfBMNC["Order"]==TCD.loc[x,"Order"]]
                    STC = dfSMNC[dfSMNC["Order"]==TCD.loc[x,"Token"]]

                    BT=0
                    ST=0

                    if not BTC.empty:
                        BT = int(dfBMNC[dfBMNC["Order"]==TCD.loc[x,"Order"]].iloc[-1]["TStamp"])

                    if not STC.empty:
                        ST = int(dfSMNC[dfSMNC["Order"]==TCD.loc[x,"Token"]].iloc[-1]["TStamp"])
                    
                    if (BT-ST)>=0:
                        BTP.loc[m] = TCD.loc[x]
                        m = m + 1
                    else:
                        STP.loc[j] = TCD.loc[x]
                        j = j + 1

                TQ = (df[TC]["Qty"]).astype(int).sum()

                NBQ = (df[BNC]["Qty"]).astype(int).sum()
                NSQ = (df[SNC]["Qty"]).astype(int).sum()

                CNBQ = (df[BNC]["Qty"]).astype(int).count()
                CNSQ = (df[SNC]["Qty"]).astype(int).count()

                ATP = 0
                ANP = 0
                BATP = 0
                SATP = 0

                if ((df[TC]["Qty"]).astype(int).sum()) != 0:
                    ATP = round(((((df[TC]["Qty"]).astype(int) * ((df[TC]["Price"].astype(int)) / 100)).sum()) / (
                        (df[TC]["Qty"]).astype(int).sum())), 2)

                if ((df[NC]["Qty"]).astype(int).sum()) != 0:
                    ANP = round(((((df[NC]["Qty"]).astype(int) * ((df[NC]["Price"].astype(int)) / 100)).sum()) / (
                        (df[NC]["Qty"]).astype(int).sum())), 2)

                if ((BTP["Qty"]).astype(int).sum()) != 0:
                    BATP = round(((((BTP["Qty"]).astype(int) * ((BTP["Price"].astype(int)) / 100)).sum()) / ((BTP["Qty"]).astype(int).sum())), 2)
                    
                if ((STP["Qty"]).astype(int).sum()) != 0:
                    SATP = round(((((STP["Qty"]).astype(int) * ((STP["Price"].astype(int)) / 100)).sum()) / ((STP["Qty"]).astype(int).sum())), 2)
                    
                epoch = int((Cepoch) / 1000000)
                Pepoch = (time.strftime('%H:%M:%S', time.localtime(epoch)))

                if int(BATP)==0:
                    BATP = ATP

                if int(SATP)==0:
                    SATP = ATP  
                            
                Ndf.loc[i] = [i, Pepoch, sym, NBQ, CNBQ, NSQ, CNSQ, BATP, SATP, ANP, TQ, ATP]

                if df["SNO"].astype(int).max() == df[((df["TStamp"]) >= (Cepoch)) & ((df["TStamp"]) <= (CNepoch))][
                    "SNO"].astype(int).max():
                    CNepoch = Cepoch
                    break

                Cepoch = CNepoch

                # Change When Live
                CNepoch = (Cepoch + (60 * Min * 1000000))
                i = i + 1

        result = Ndf.to_json(orient="index")
        print(result)

except Exception as e:
    print(e)
