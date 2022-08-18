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
    client = MongoClient(HOST, PORT)
    db = client.IndiraU
    i=0

    CreFile = "/home/dwh/tbt-ncash-str"+str(1)+"/*.DAT"
    AllFile = glob.glob(CreFile, recursive = True)
    Filename = AllFile[0]
    print(AllFile)
    date = Filename.split("_")[1]
    
    while True:

        name= pd.read_csv(Filename,
                            names=["_id", "TStamp", "Stream", "Exchange", "SN", "OType", "SNumber", "Order", "Token", "BS", "Price", "Qty"],
                            skiprows=i,
                            nrows=100000)
        
        C = name[name.columns[0]].count()
        i = i + C
        print(i)

        df_dict = name.to_dict('records')

        if C!=0:
            stream = db.Stream1
            result = stream.insert_many(df_dict)
            print(result)   

        else:
            print("Sleep for 60 Sec")
            print(datetime.now())
            sleep(60)

if __name__ == "__main__":
    
    # Get the database
    dbname = get_database()
