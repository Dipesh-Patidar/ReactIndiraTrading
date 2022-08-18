import pandas as pd
from datetime import datetime, timedelta
import time
import os
import threading
import pymongo
import bson 
import collections
import json
from pprint import pprint

TSym = {}
i=0

name = [str(i) for i in range(0,53)]
sdf = pd.read_csv("security.txt", sep="|",names=name, skiprows=1).reset_index()

# display DataFrame

Fdfs = (sdf[["index","0"]])

dataDic = {"index":int, "0":str}

Fdfs.astype(dataDic)

ST = {"SNO": [0], "Token": [0], "Script": ["ACC"]}

STdf = pd.DataFrame.from_dict(ST)

# sym = ((Fdfs[Fdfs["index"]==int(TokenNo)]["0"]).to_string()).split(" ")[-1]

db_connect = pymongo.MongoClient('192.168.100.22', 27017)


for db in db_connect.list_databases():
    for coll in db_connect[db["name"]].list_collection_names():
        if((coll.split("T")[-1]).isnumeric()):
            
            symdf = pd.DataFrame()
            # print("Empty DF: ",symdf)
            symdf = Fdfs[Fdfs["index"]==int((coll.split("T")[-1]))]

            # print("DF: ",symdf)
            if not symdf.empty:
                S = symdf["0"].to_string().split(" ")[-1]
                T = int(coll.split("T")[-1])

                STdf.loc[i] = [i, T, S]
                i = i + 1

            # S = ((Fdfs[Fdfs["index"]==int((coll.split("T")[-1]))]["0"]).to_string()).split(" ")[-1]
            # T = int((coll.split("T")[-1]))
            # # print(S, "  ", type(S), "  ",(coll.split("T")[-1]), " ", type((coll.split("T")[-1])))

            # STdf.loc[i] = [i, T, S]
            # i = i + 1
STdf.to_csv("Sym")
pprint(STdf)