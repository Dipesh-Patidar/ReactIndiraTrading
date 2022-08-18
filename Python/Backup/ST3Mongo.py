from pymongo import MongoClient
import pandas as pd
from datetime import datetime
from flask import Flask, request
from flask_cors import CORS
from time import sleep
import glob
import os
import threading


HOST = '192.168.100.22'  # Standard loopback interface address (localhost)
PORT = 27017        # Port to listen on (non-privileged ports are > 1023)

def get_database():
    
    print(datetime.now())

    Filename = glob.glob("/home/dwh/tbt-ncash-str3/*.DAT", recursive = True)[0]

    client = MongoClient(HOST, PORT)
    db = client["STREAM3"]
    i=0

    while True:

        name= pd.read_csv(Filename,
                            names=["SNO", "TStamp", "Stream", "Exchange", "SN", "OType", "SNumber", "Order", "Token", "BS", "Price", "Qty"],
                            skiprows=i,
                            nrows=1000000)

        C = name[name.columns[0]].count()
        print("C: ",C," i: ",i)
        i = i+ C
        
        TName = name[name["OType"]=="T"]["BS"]
        BSName = name[name["OType"]=="T"]["Token"]

        name.loc[name['OType'] == "T", 'BS'] = BSName
        name.loc[name['OType'] == "T", 'Token'] = TName.astype(int)

        data_dict={'T'+str(i): grp for i , grp in name.groupby('Token')}

        if C!=0:
            for x,y in ((data_dict.items())):
                df_dict = y.to_dict('records')
                result = db[x].insert_many(df_dict)
                YS = y[y.columns[0]].count()
                
        else:
            print("Sleep for 30 Sec: ",Filename)
            print(datetime.now())
            sleep(30)

if __name__ == "__main__":
    
    # Get the database
    dbname = get_database()
