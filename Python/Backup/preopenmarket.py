# This is a sample Python script.
import pandas as pd
from datetime import datetime
import time
import glob
import os
import threading

def premarketorder():

    Nd = {"SN": [0], "L": [0], "LocalTime": [0.0], "M": ["ORDLOG"], "S": ["REJECTED"], "ErrCode": [16387], "CtclId": [37357],
                          "RefID": [13], "Token": [0], "Symbol": ["ACC"], "Series": ["EQ"],
                          "ExID": [0], "Price": [0], "OT": ["b"], "Qty": [1], "RemQTY": ["b"], "LTQ": [0],
                           "LTP": [0], "Status": [8], "Qty": [1], "LastActivityReference": [0], "ResponseTime": [0],"AccNo":[""],"Req_Res":[0.0],"Res_Loc":[0.0],"Loc_Req":[0.0],"RequestTime":[0.0]}

    Req = {"F": [0], "L": [0], "RequestTime": [0.0], "M": ["ORDLOG"], "CtclId": [37357], "Orderid": [1], "RDate": [0.0]}

    Reqdf = pd.DataFrame.from_dict(Req)
    Reqdflenth = Reqdf.shape

    Ndf = pd.DataFrame.from_dict(Nd)
    Ndflenth = Ndf.shape

    CreFile = "/home/analysis/*.csv"

    Filenam = glob.glob(CreFile, recursive = True)

    CreFile18 = "/home/analysis/18/*.csv"
    CreFile19 = "/home/analysis/19/*.csv"
    CreFile240 = "/home/analysis/240/*.csv"

    Filenam18 = glob.glob(CreFile18, recursive = True)
    Filenam19 = glob.glob(CreFile19, recursive = True)
    Filenam240 = glob.glob(CreFile240, recursive = True)

    Filenam.extend(Filenam18)
    Filenam.extend(Filenam19)
    Filenam.extend(Filenam240)

    # print(Filenam)

    # for i in range(0, len(Filenam)):    
    #     for j in range(i+1, len(Filenam)):    
    #         a = (Filenam[i].split("/")[-1].split("_")[-1].split(".")[0])
    #         b = (Filenam[j].split("/")[-1].split("_")[-1].split(".")[0])
    #         if(a > b):
    #             temp = Filenam[i];    
    #             Filenam[i] = Filenam[j];    
    #             Filenam[j] = temp;   

    Filename = Filenam
    # print(Filename)

    i=0
    j=0

    for file in Filename:

        if (file.find('REQUEST') != -1):
            file2 = file
            file1 = open(file, 'r')
            Lines = file1.readlines()

            for line in Lines:
                Values = [x.split("=")[1].rstrip().lstrip() if(len(x.split("="))==2) else (x.split("="))[0].rstrip().lstrip() for x in (line.split(",")) ]
                if Reqdflenth[1] == len(Values)+1:
                    Values[0] = j
                    Values.append(str((datetime.fromtimestamp(float(Values[2]))).date()).replace('-', ''))
                    Reqdf.loc[j] = Values

                    # print(file, " : ", Values)
                    j = j + 1

        if (file.find('RESPONSE') != -1):
            
            file1 = open(file, 'r')
            Lines = file1.readlines()
            k = 0
            for line in Lines:
                Values = [x.split("=")[1].rstrip().lstrip() if(len(x.split("="))==2) else (x.split("="))[0].rstrip().lstrip() for x in (line.split(",")) ]

                if Ndflenth[1] == len(Values)+4:
                    Values[0] = i
                    Values[11] = int(float(Values[11]))
                    Values.append(str((datetime.fromtimestamp(float(Values[2]))).date()).replace('-', ''))
                    
                    Values.append((round(((float(Values[20])/1000000000)-(float(Values[2]))),6))*1000000)
                    Values.append(str((datetime.fromtimestamp(float(Values[2]))).date()).replace('-', ''))
                    Values.append(str((datetime.fromtimestamp(float(Values[2]))).date()).replace('-', ''))
                    Values[2] = (float(Values[2]))
                    Values[20] = round((float(Values[20])/1000000000),6)

                    Ndf.loc[i] = Values
                    
                    # print(file, " : ", Values)

                    i = i + 1

    wdata = sortfilename(Filename)
    print(wdata)

    for d in wdata:
        ResD = Ndf[Ndf["RequestTime"]==str(d)].reset_index()
        ReqD = Reqdf[Reqdf["RDate"]==str(d)]

        for i in range(len(ResD)):
            
            print(i, " : ", len(ResD))

            check = int(ResD.at[i,"RefID"])

            checkdf = (ReqD[ReqD["Orderid"].astype(int)==check])

            if len(checkdf)>0:    #(datetime.fromtimestamp
                Ndf.loc[ResD.at[i,"SN"],"RequestTime"] = (float(ReqD[ReqD["Orderid"].astype(int)==check].reset_index().at[0,"RequestTime"]))
                Ndf.loc[ResD.at[i,"SN"],"Req_Res"] = round((Ndf.loc[ResD.at[i,"SN"],"RequestTime"] - Ndf.loc[ResD.at[i,"SN"],"ResponseTime"]),6)*1000000
                Ndf.loc[ResD.at[i,"SN"],"Loc_Req"] = round((Ndf.loc[ResD.at[i,"SN"],"LocalTime"] - Ndf.loc[ResD.at[i,"SN"],"RequestTime"]),6)*1000000
                Ndf.loc[ResD.at[i,"SN"],"RequestTime"] = str(datetime.fromtimestamp(Ndf.loc[ResD.at[i,"SN"],"RequestTime"]))
                Ndf.loc[ResD.at[i,"SN"],"ResponseTime"] = str(datetime.fromtimestamp(Ndf.loc[ResD.at[i,"SN"],"ResponseTime"]))
                Ndf.loc[ResD.at[i,"SN"],"LocalTime"] = str(datetime.fromtimestamp(Ndf.loc[ResD.at[i,"SN"],"LocalTime"]))
                ReqD.drop(ReqD[ReqD["Orderid"].astype(int)==check].reset_index().at[0,"F"],inplace = True)
            
            else:
                Ndf.drop(ResD.at[i,"SN"],axis=0, inplace=True)

    result = Ndf.to_json(orient="index")
    print(result)

premarketorder()
