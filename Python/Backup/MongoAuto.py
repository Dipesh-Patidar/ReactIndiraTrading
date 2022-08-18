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
PORT = 27017             # Port to listen on (non-privileged ports are > 1023)


def Stream1(Filename):
    
    print("STREAM1: ",datetime.now())

    ST1Date = datetime.now().date()
    EpSec = 30

    S1db = client["STREAM1"]
    print(S1db)

    i = 0
    for col in S1db.list_collection_names():
        # print(col)
        i = i + (S1db[col].count_documents({}))
    
    print("ST1-i: ",i)


    while True:

        if (ST1Date != datetime.now().date()):
            S1db.drop()
            S1db = client["STREAM1"]
            EpSec = 30

        # if (datetime.now().hour()>15):
        #     EpSec = 240

        name= pd.read_csv(Filename,
                            names=["SNO", "TStamp", "Stream", "Exchange", "SN", "OType", "SNumber", "Order", "Token", "BS", "Price", "Qty"],
                            skiprows=i,
                            nrows=1000000)

        S1C = name[name.columns[0]].count()
        print("S1C: ",S1C," i: ",i)
        i = i + S1C
        
        TName = name[name["OType"]=="T"]["BS"]
        BSName = name[name["OType"]=="T"]["Token"]

        name.loc[name['OType'] == "T", 'BS'] = BSName
        name.loc[name['OType'] == "T", 'Token'] = TName.astype(int)

        data_dict={'T'+str(m): grp for m , grp in name.groupby('Token')}

        if S1C!=0:
            for x,y in ((data_dict.items())):
                df_dict = y.to_dict('records')
                result = S1db[x].insert_many(df_dict)
                YS = y[y.columns[0]].count()
                
        else:
            print("Sleep for ", EpSec ," Sec: ",Filename)
            print("STREAM1: ",datetime.now())
            sleep(EpSec)
        
        ST1Date = datetime.now().date()


def Stream2(Filename):
    
    print("STREAM2: ",datetime.now())

    S2db = client["STREAM2"]
    print(S2db)

    j = 0
    for col in S2db.list_collection_names():
        j = j + (S2db[col].count_documents({}))
    
    print("ST2-J: ",j)

    ST2Date = datetime.now().date()
    EpSec = 30

    while True:

        if (ST2Date != datetime.now().date()):
            S2db.drop()
            S2db = client["STREAM2"]
            EpSec = 30

        # if (datetime.now().hour()>15):
        #     EpSec = 240

        name= pd.read_csv(Filename,
                            names=["SNO", "TStamp", "Stream", "Exchange", "SN", "OType", "SNumber", "Order", "Token", "BS", "Price", "Qty"],
                            skiprows=j,
                            nrows=1000000)

        S2C = name[name.columns[0]].count()
        print("S2C: ",S2C," j: ",j)
        j = j + S2C
        
        TName = name[name["OType"]=="T"]["BS"]
        BSName = name[name["OType"]=="T"]["Token"]

        name.loc[name['OType'] == "T", 'BS'] = BSName
        name.loc[name['OType'] == "T", 'Token'] = TName.astype(int)

        data_dict={'T'+str(m): grp for m , grp in name.groupby('Token')}

        if S2C!=0:
            for x,y in ((data_dict.items())):
                df_dict = y.to_dict('records')
                result = S2db[x].insert_many(df_dict)
                YS = y[y.columns[0]].count()
                
        else:
            print("Sleep for ", EpSec ," Sec: ",Filename)
            print("STREAM2: ",datetime.now())
            sleep(EpSec)

        ST2Date = datetime.now().date()

def Stream3(Filename):
    
    print("STREAM3: ",datetime.now())

    S3db = client["STREAM3"]
    print(S3db)
    k = 0
    for col in S3db.list_collection_names():
        k = k + (S3db[col].count_documents({}))
    
    print("ST3-k: ",k)

    ST3Date = datetime.now().date()
    EpSec = 30

    while True:

        if (ST3Date != datetime.now().date()):
            S3db.drop()
            S3db = client["STREAM3"]
            EpSec = 30

        # if (datetime.now().hour()>15):
        #     EpSec = 240

        name= pd.read_csv(Filename,
                            names=["SNO", "TStamp", "Stream", "Exchange", "SN", "OType", "SNumber", "Order", "Token", "BS", "Price", "Qty"],
                            skiprows=k,
                            nrows=1000000)

        S3C = name[name.columns[0]].count()
        print("S3C: ",S3C," k: ",k)
        k = k + S3C
        
        TName = name[name["OType"]=="T"]["BS"]
        BSName = name[name["OType"]=="T"]["Token"]

        name.loc[name['OType'] == "T", 'BS'] = BSName
        name.loc[name['OType'] == "T", 'Token'] = TName.astype(int)

        data_dict={'T'+str(m): grp for m , grp in name.groupby('Token')}

        if S3C!=0:
            for x,y in ((data_dict.items())):
                df_dict = y.to_dict('records')
                result = S3db[x].insert_many(df_dict)
                YS = y[y.columns[0]].count()
                
        else:
            print("Sleep for ", EpSec ," Sec: ",Filename)
            print("STREAM3: ",datetime.now())
            sleep(EpSec)

        ST3Date = datetime.now().date()

def Stream4(Filename):
    
    print("STREAM4: ",datetime.now())

    S4db = client["STREAM4"]
    print(S4db)
    l = 0
    for col in S4db.list_collection_names():
        l = l + (S4db[col].count_documents({}))
    
    print("ST4-l: ",l)

    ST4Date = datetime.now().date()
    EpSec = 30

    while True:

        if (ST4Date != datetime.now().date()):
            S4db.drop()
            S4db = client["STREAM4"]
            EpSec = 30

        # if (datetime.now().hour()>15):
        #     EpSec = 240

        name= pd.read_csv(Filename,
                            names=["SNO", "TStamp", "Stream", "Exchange", "SN", "OType", "SNumber", "Order", "Token", "BS", "Price", "Qty"],
                            skiprows=l,
                            nrows=1000000)

        S4C = name[name.columns[0]].count()
        print("S4C: ",S4C," l: ",l)
        l = l + S4C
        
        TName = name[name["OType"]=="T"]["BS"]
        BSName = name[name["OType"]=="T"]["Token"]

        name.loc[name['OType'] == "T", 'BS'] = BSName
        name.loc[name['OType'] == "T", 'Token'] = TName.astype(int)

        data_dict={'T'+str(m): grp for m , grp in name.groupby('Token')}

        if S4C!=0:
            for x,y in ((data_dict.items())):
                df_dict = y.to_dict('records')
                result = S4db[x].insert_many(df_dict)
                YS = y[y.columns[0]].count()
                
        else:
            print("Sleep for ", EpSec ," Sec: ",Filename)
            print("STREAM4: ",datetime.now())
            sleep(EpSec)

        ST4Date = datetime.now().date()

def get_database():  

    global client

    CreFile1 = glob.glob("/home/dwh/tbt-ncash-str1/*.DAT", recursive = True)
    CreFile2 = glob.glob("/home/dwh/tbt-ncash-str2/*.DAT", recursive = True)
    CreFile3 = glob.glob("/home/dwh/tbt-ncash-str3/*.DAT", recursive = True)
    CreFile4 = glob.glob("/home/dwh/tbt-ncash-str4/*.DAT", recursive = True)

    t1 = threading.Thread(target=Stream1, args=(CreFile1[0],))
    t2 = threading.Thread(target=Stream2, args=(CreFile2[0],))
    t3 = threading.Thread(target=Stream3, args=(CreFile3[0],))
    t4 = threading.Thread(target=Stream4, args=(CreFile4[0],))

    t1.start()
    t2.start()
    t3.start()
    t4.start()

    t1.join()
    t2.join()
    t3.join()
    t4.join()

    
if __name__ == "__main__":
    global client
    # Get the database
    client = MongoClient(HOST, PORT)
    get_database()
