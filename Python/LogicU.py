# This is a sample Python script.
import pandas as pd
from datetime import datetime
from flask import Flask, request
from flask_cors import CORS
import time
import glob
import os
import threading

app = Flask(__name__)
CORS(app)

file = "security.txt"
sym = "NotFound"
@app.route('/ordertype', methods=["GET", "POST"])
def ordertype():
    print(datetime.now())
    try:
        if request.method == "POST":
            StartTime = request.json['StartTime']
            EndTime = request.json['EndTime']
            LPBand = request.json['LPBand']
            UPBand = request.json['UPBand']
            Value = request.json['Value']
            Quantity = request.json['Quantity']
            TokenNo = request.json['TokenNo']
# 
            name = [str(i) for i in range(0,53)]
            sdf = pd.read_csv(file, sep="|",names=name).reset_index()

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

            stream = 0
            TokenDf= pd.read_csv("StreamToken.CSV",names=["Stream", "Token"])
            streamc = TokenDf[TokenDf["Token"]==int(TokenNo)].reset_index()
            if streamc.empty:
                msg = "Token Not Found"
                return msg, 400
            stream = streamc.loc[0, 'Stream']
            
            print(stream, " ", type(stream))


            CreFile = "/home/dwh/tbt-ncash-str"+str(stream)+"/*.DAT"

            # CreFile = "/var/PnpDevelopment/*.DAT"

            # print("stream: ",stream," CreFile: ",CreFile)

            AllFile = glob.glob(CreFile, recursive = True)
            Filename = AllFile[0]
            print(AllFile)
            date = Filename.split("_")[1]
            size = int((os.path.getsize(Filename))/400)
            print(Filename)
            dataf=[]
            th = []

            def file_read(i, name):

                name= pd.read_csv(Filename,
                                    names=["SNO", "TStamp", "Stream", "Exchange", "SN", "OType", "SNumber", "Order", "Token", "BS", "Price", "Qty"],
                                    skiprows=i,
                                    nrows=size)
                #trend = name[(name["Token"].astype(str)==Token) or (name["BS"].astype(str)==Token)]
                dataf.append(name[(name["Token"].astype(str)==str(TokenNo)) | (name["BS"].astype(str)==str(TokenNo))])
                print(dataf[-1])

            for x in range(0,5):
                dfp = "df"+str(x)
                t = threading.Thread(target=file_read, args=((x*size), dfp))
                th.append(t)

            for x in range(len(th)):
                th[x].start()

            for x in range(len(th)):
                th[x].join()

            df = pd.concat(dataf,ignore_index=True)

            # print("Intial Data: ",df)

            STime = datetime(int(date[:4]), int(date[4:6]), int(date[6:8]), SH, SM, SS).timestamp()
            ETime = datetime(int(date[:4]), int(date[4:6]), int(date[6:8]), EH, EM, ES).timestamp()
            
            # print(datetime.now())

            MC = ((df["TStamp"]) >= ((STime * 1000000))) & ((df["TStamp"]) < (ETime * 1000000)) & (
                    df["Token"] == int(TokenNo)) & (df["OType"] == "M")

            TC = ((df["TStamp"]) >= (STime * 1000000)) & ((df["TStamp"]) < (ETime * 1000000)) & (
                            df["OType"] == "T")  & (df["BS"] == (TokenNo))  & (
                         ((df["Price"].astype(int)) / 100) >= float(LPBand)) & (
                         ((df["Price"].astype(int)) / 100) < float(UPBand))

            NC = ((df["TStamp"]) >= (STime * 1000000)) & ((df["TStamp"]) < (ETime * 1000000)) & (
                    df["Token"] == int(TokenNo)) & (df["OType"] == "N") & (
                         ((df["Price"].astype(int)) / 100) >= float(LPBand)) & (
                         ((df["Price"].astype(int)) / 100) < float(UPBand)) & (
                         ((df["Qty"].astype(int))*((df["Price"].astype(int)) / 100)) >= int(Value)) & (
                         (df["Qty"].astype(int)) >= int(Quantity))

            BNC = ((df["TStamp"]) >= (STime * 1000000)) & ((df["TStamp"]) < (ETime * 1000000)) & (
                    df["Token"] == int(TokenNo)) & (df["OType"] == "N") & (df["BS"] == "B") & (
                          ((df["Price"].astype(int)) / 100) >= float(LPBand)) & (
                          ((df["Price"].astype(int)) / 100) <= float(UPBand)) & (
                          ((df["Qty"].astype(int))*((df["Price"].astype(int)) / 100)) >= int(Value)) & (
                          (df["Qty"].astype(int)) >= int(Quantity))

            SNC = ((df["TStamp"]) >= (STime * 1000000)) & ((df["TStamp"]) < (ETime * 1000000)) & (
                    df["Token"] == int(TokenNo)) & (df["OType"] == "N") & (df["BS"] == "S") & (
                          ((df["Price"].astype(int)) / 100) >= float(LPBand)) & (
                          ((df["Price"].astype(int)) / 100) <= float(UPBand)) & (
                          ((df["Qty"].astype(int))*((df["Price"].astype(int)) / 100)) >= int(Value)) & (
                          (df["Qty"].astype(int)) >= int(Quantity))


            # print(df[NC])
            Ndf = df[NC]
            Tdf = df[TC]
            Mdf = df[MC]
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
                    if ((Tdf[Tdf["Token"] == TOI]["Qty"]).astype(int).sum()) != 0:
                        OP = (((Tdf[Tdf["Token"] == TOI]["Qty"]).astype(int) * (
                                (Tdf[Tdf["Token"] == TOI]["Price"].astype(int)) / 100)).sum()) / (
                                (Tdf[Tdf["Token"] == TOI]["Qty"]).astype(int).sum())

                    TNQ = int(Ndf.loc[x, "Qty"])
                    TQ = Tdf[Tdf["Token"] == TOI]["Qty"].astype(int).sum()
                    TQC = Tdf[Tdf["Token"] == TOI]["Qty"].astype(int).count()

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
            # print(result)
            return result

    except Exception as e:
        return "Something issue"


@app.route('/atpcalculator', methods=["GET", "POST"])
def atpcaculator():
    try:
        # print(datetime.now())
        if request.method == "POST":
            TokenNo = request.json['TokenNo']
            Min = float(request.json['Min'])

# 
            name = [str(i) for i in range(0,53)]
            sdf = pd.read_csv(file, sep="|",names=name).reset_index()

            # display DataFrame

            dfS = (sdf[["index","0","1"]])

            Fdfs = dfS[["index","0"]]

            sym = ((Fdfs[Fdfs["index"]==int(TokenNo)]["0"]).to_string()).split(" ")[-1]
# 

            td1 = 0
            CNepoch = 0
            Cepoch = 0

            stream = 0
            TokenDf= pd.read_csv("StreamToken.CSV",names=["Stream", "Token"])
            streamc = TokenDf[TokenDf["Token"]==int(TokenNo)].reset_index()
            if streamc.empty:
                msg = "Token Not Found"
                return msg, 400
            stream = streamc.loc[0, 'Stream']

            # print(stream, " ", type(stream))


            CreFile = "/home/dwh/tbt-ncash-str"+str(stream)+"/*.DAT"

            # CreFile = "/var/PnpDevelopment/*.DAT"

            # print("stream: ",stream," CreFile: ",CreFile)

            Filename = glob.glob(CreFile, recursive = True)[0]

            date = Filename.split("_")[1]
            size = int((os.path.getsize(Filename))/400)

            dataf=[]
            th = []

            def file_read(i, name):

                name= pd.read_csv(Filename,
                                    names=["SNO", "TStamp", "Stream", "Exchange", "SN", "OType", "SNumber", "Order", "Token", "BS", "Price", "Qty"],
                                    skiprows=i,
                                    nrows=size)
                #trend = name[(name["Token"].astype(str)==Token) or (name["BS"].astype(str)==Token)]
                dataf.append(name[(name["Token"].astype(str)==TokenNo) | (name["BS"].astype(str)==TokenNo)])

            for x in range(0,5):
                dfp = "df"+str(x)
                t = threading.Thread(target=file_read, args=((x*size), dfp))
                th.append(t)

            for x in range(len(th)):
                th[x].start()

            for x in range(len(th)):
                th[x].join()

            df = pd.concat(dataf,ignore_index=True)

            # print(datetime.now())
            while True:
                td = datetime.now()
                if td.date() != td1:
                    # (df["TStamp"][0])
                    # epoch = datetime(int(td.strftime("%Y")), int(td.strftime("%m")), int(td.strftime("%d")), 9, 15).timestamp()
                    epoch = datetime(int(date[:4]), int(date[4:6]), int(date[6:8]), 9, 15).timestamp()
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
            return result

    except Exception as e:
        return e

@app.route('/pendingorder', methods=["GET", "POST"])
def PendingOrder():
    try:
        print(datetime.now())
        if request.method == "POST":
            TokenNo = request.json['TokenNo']
            OrdID = int(request.json['OrderID'])

# 
            name = [str(i) for i in range(0,53)]
            sdf = pd.read_csv(file, sep="|",names=name).reset_index()

            # display DataFrame

            dfS = (sdf[["index","0","1"]])

            Fdfs = dfS[["index","0"]]

            # print((Fdfs[Fdfs["index"]==int(TokenNo)]["0"]))
            sym = ((Fdfs[Fdfs["index"]==int(TokenNo)]["0"]).to_string()).split(" ")[-1]

            print(sym)
# 

            td1 = 0
            CNepoch = 0
            Cepoch = 0

            stream = 0
            TokenDf= pd.read_csv("StreamToken.CSV",names=["Stream", "Token"])

            streamc = TokenDf[TokenDf["Token"]==int(TokenNo)].reset_index()
            if streamc.empty:
                msg = "Token Not Found"
                return msg, 400
            stream = streamc.loc[0, 'Stream']

            CreFile = "/home/dwh/tbt-ncash-str"+str(stream)+"/*.DAT"

            # CreFile = "/var/PnpDevelopment/*.DAT"

            # print("stream: ",stream," CreFile: ",CreFile)

            Filename = glob.glob(CreFile, recursive = True)[0]

            date = Filename.split("_")[1]
            size = int((os.path.getsize(Filename))/400)

            dataf=[]
            th = []

            def file_read(i, name):

                name= pd.read_csv(Filename,
                                    names=["SNO", "TStamp", "Stream", "Exchange", "SN", "OType", "SNumber", "Order", "Token", "BS", "Price", "Qty"],
                                    skiprows=i,
                                    nrows=size)
                
                #trend = name[(name["Token"].astype(str)==Token) or (name["BS"].astype(str)==Token)]
                dataf.append(name[(name["Token"].astype(str)==TokenNo) | (name["BS"].astype(str)==TokenNo)])

            for x in range(0,5):
                dfp = "df"+str(x)
                t = threading.Thread(target=file_read, args=((x*size), dfp))
                th.append(t)

            for x in range(len(th)):
                th[x].start()

            for x in range(len(th)):
                th[x].join()

            df = pd.concat(dataf,ignore_index=True)
            print(datetime.now())

            
            # 

            NC = (df["OType"]=="N") & (df["Token"].astype(str)==TokenNo) & (df["Order"]==OrdID) 
            BNC = (df["OType"]=="N") & (df["Token"].astype(str)==TokenNo) & (df["Order"]==OrdID) & (df["BS"]=="B") 
            SNC = (df["OType"]=="N") & (df["Token"].astype(str)==TokenNo) & (df["Order"]==OrdID) & (df["BS"]=="S")
            MC = (df["OType"]=="M") & (df["Token"].astype(str)==TokenNo) & (df["Order"]==OrdID) 

            Ndf = df[NC]

            Ndf.reset_index(inplace = True)

            ANOP = (df["OType"]=="N") & (df["Token"].astype(str)==TokenNo) & (df["Order"]<=OrdID) & (df["Price"]==Ndf.loc[0,"Price"])

            ANOPdf = df[ANOP]

            ANOPdf.reset_index(inplace = True)
            C = ANOPdf[ANOPdf.columns[0]].count()

            # Trade New Order with Specific OID price

            TC = (df["BS"].astype(str)==TokenNo) & (df["Order"]<=OrdID) & (df["OType"]=="T") & (df["Price"]==Ndf.loc[0,"Price"])
            Tdf = df[TC]

            # Pending New Order prior to Specific OID 

            POd = {"SNO":[0],"Time":[" "],"Script":[sym],"TStamp":[" "],"OType":["B"],"OrderN":["NRML"],"OrderID":[0],"TotalNQ":[0],"TQuantity":[0],"OCount":[0],"Price":[0]}
            POdf = pd.DataFrame.from_dict(POd)

            l=0
            TPQ=0    #Total Pending Quantity
            SLOC=0   #Total SL Order Pending
            for x in range(0,C):
                if ((ANOPdf.loc[x,"BS"])=="B") & ((ANOPdf.loc[x,"BS"])==Ndf.loc[0,"BS"]):

                    TOI = (ANOPdf.loc[x,"Order"])

                    OP = (int(ANOPdf.loc[x,"Price"])/100)

                    if ((Tdf[Tdf["Order"]==TOI]["Qty"]).astype(int).sum())!=0:
                        OP =  (((Tdf[Tdf["Order"]==TOI]["Qty"]).astype(int)*((Tdf[Tdf["Order"]==TOI]["Price"].astype(int))/100)).sum())/((Tdf[Tdf["Order"]==TOI]["Qty"]).astype(int).sum())

                    TNQ = int(ANOPdf.loc[x,"Qty"])
                    TQ = Tdf[Tdf["Order"]==TOI]["Qty"].astype(int).sum()
                    TQC = Tdf[Tdf["Order"]==TOI]["Qty"].astype(int).count()
                    OT = "B"
                    epoch = int(int(ANOPdf.loc[x,"TStamp"])/1000000)
                    Pepoch = (time.strftime('%H:%M:%S', time.localtime(epoch)))

                    ON = "NRML"
                    if x>0 and (ANOPdf.loc[x-1,"Order"])>TOI:
                        ON = "SLO"
                        SLOC = SLOC +1

                    if TNQ<TQ:
                        ON = "DISO"

                    if TNQ>TQ:
                        TPQ = TPQ + (int(TNQ)-int(TQ))
                        POdf.loc[l] = [l,Pepoch,sym,ANOPdf.loc[x,"TStamp"],OT,ON,TOI,TNQ,TQ,TQC,OP]
                        l = l+1

                if ((ANOPdf.loc[x,"BS"])=="S") & ((ANOPdf.loc[x,"BS"])==Ndf.loc[0,"BS"]):
                    TOI = (ANOPdf.loc[x,"Order"])
                    TNQ = int(ANOPdf.loc[x,"Qty"])
                    TQ = Tdf[Tdf["Token"]==TOI]["Qty"].astype(int).sum()
                    TQC = Tdf[Tdf["Token"]==TOI]["Qty"].astype(int).count()

                    OP = (int(ANOPdf.loc[x,"Price"])/100)

                    if ((Tdf[Tdf["Token"]==TOI]["Qty"]).astype(int).sum())!=0:
                        OP =  (((Tdf[Tdf["Token"]==TOI]["Qty"]).astype(int)*((Tdf[Tdf["Token"]==TOI]["Price"].astype(int))/100)).sum())/((Tdf[Tdf["Token"]==TOI]["Qty"]).astype(int).sum())

                    OT = "S"
                    epoch = int(int(ANOPdf.loc[x,"TStamp"])/1000000)
                    Pepoch = (time.strftime('%H:%M:%S', time.localtime(epoch)))

                    ON = "NRML"
                    if x>0 and (ANOPdf.loc[x-1,"Order"])>TOI:
                        ON = "SLO"
                        SLOC = SLOC + 1

                    if x>0 and TNQ<TQ:
                        ON = "DISO"

                    if TNQ>TQ:
                        TPQ = TPQ + (int(TNQ)-int(TQ))
                        POdf.loc[l] = [l,Pepoch,sym,ANOPdf.loc[x,"TStamp"],OT,ON,TOI,TNQ,TQ,TQC,OP]
                        l = l+1

            # 

            result = POdf.to_json(orient="index")
            # print(POdf)
            return result


    except Exception as e:
        return e


@app.route('/streamdetails', methods=["GET", "POST"])
def StreamData():
    try:
        # print(datetime.now())
        if request.method == "POST":
            Stream = request.json['Stream']
            SData = int(request.json['SData'])
            LData = int(request.json['LData'])

            # print(datetime.now())

            td1 = 0
            CNepoch = 0
            Cepoch = 0

# 
            name = [str(i) for i in range(0,53)]
            sdf = pd.read_csv(file, sep="|",names=name).reset_index()

            # display DataFrame

            dfS = (sdf[["index","0","1"]])

            Fdfs = dfS[["index","0"]]

# 

            CreFile = "/home/dwh/tbt-ncash-str"+(Stream)+"/*.DAT"

            # CreFile = "/var/PnpDevelopment/*.DAT"

            # print(CreFile)
            Filename = glob.glob(CreFile, recursive = True)[0]

            date = Filename.split("_")[1]
            size = int((os.path.getsize(Filename))/400)

            dataf=[]
            th = []
            i = SData
            n = LData-SData


            def file_read(i, name):

                name= pd.read_csv(Filename,
                                    names=["SNO", "TStamp", "Stream", "Exchange", "SN", "OType", "SNumber", "Order", "Token", "BS", "Price", "Qty"],
                                    skiprows=i,
                                    nrows=size)
                
                trend = name[(name["OType"]=="N")].sort_values(by = 'Order', ascending = True)
                trend = trend.head((LData-SData))
                # .sort_values(by = 'Order', axis = 1, ascending = True).head((LData-SData))
                dataf.append(trend)


            for x in range(0,5):
                dfp = "df"+str(x)
                t = threading.Thread(target=file_read, args=((x*size), dfp))
                th.append(t)

            for x in range(len(th)):
                th[x].start()

            for x in range(len(th)):
                th[x].join()

            rslt_df = pd.concat(dataf,ignore_index=True)
            # print(datetime.now())

            df = rslt_df.sort_values(by = 'Order', ascending = True).head((LData-SData))

            C = df[df.columns[0]].count()

            SO = {"SNO": [0], "Time": [" "], "Script": [""], "NTStamp":[" "], "OType": ["B"], "Token": [0], "OrderID": [0], "OID": [0], "TotalNQ": [0], "Price": [0]}
            SOdf = pd.DataFrame.from_dict(SO)
            MaxOID = 0
            for x in range(0,C):
                epoch = int(int(df.loc[x,"TStamp"])/1000000)
                Pepoch = (time.strftime('%H:%M:%S', time.localtime(epoch)))

                OID = 0
                if x==0:
                    OID = 0
                    MaxOID = df.loc[x,"Order"]

                else:
                    if(MaxOID< df.loc[x-1,"Order"]):
                        MaxOID = df.loc[x-1,"Order"]
                    OID = (df.loc[x,"Order"] - MaxOID)

                # print((Fdfs[Fdfs["index"]==(df.loc[x,"Token"])]["0"]))
                sym = ((Fdfs[Fdfs["index"]==(df.loc[x,"Token"])]["0"]).to_string()).split(" ")[-1] 

                SOdf.loc[x] = [x,Pepoch, sym, df.loc[x,"TStamp"], (df.loc[x,"BS"]), (df.loc[x,"Token"]), (df.loc[x,"Order"]),OID,(df.loc[x,"Qty"]),((df.loc[x,"Price"])/100)]

            result = SOdf.to_json(orient="index")
            return result

    except Exception as e:
        return e
    
    # print(datetime.now())



@app.route('/orderposition', methods=["GET", "POST"])
def PositionData():
    try:
        # print(datetime.now())
        if request.method == "POST":
            Stream = request.json['Stream']
            OrderNo = int(request.json['OrderNo'])

            # print(datetime.now())

            td1 = 0
            CNepoch = 0
            Cepoch = 0

            CreFile = "/home/dwh/tbt-ncash-str"+(Stream)+"/*.DAT"

            # CreFile = "/var/PnpDevelopment/*.DAT"

            # print(CreFile)
            Filename = glob.glob(CreFile, recursive = True)[0]

            date = Filename.split("_")[1]
            size = int((os.path.getsize(Filename))/400)

# 
            name = [str(i) for i in range(0,53)]
            sdf = pd.read_csv(file, sep="|",names=name).reset_index()

            # display DataFrame

            dfS = (sdf[["index","0","1"]])

            Fdfs = dfS[["index","0"]]

# 

            dataf=[]
            th = []

            def file_read(i, name):

                name= pd.read_csv(Filename,
                                    names=["SNO", "TStamp", "Stream", "Exchange", "SN", "OType", "SNumber", "Order", "Token", "BS", "Price", "Qty"],
                                    skiprows=i,
                                    nrows=size)
                
                trend = name[(name["OType"]=="N")].sort_values(by = 'Order', ascending = True)
                dataf.append(trend)

            for x in range(0,5):
                dfp = "df"+str(x)
                t = threading.Thread(target=file_read, args=((x*size), dfp))
                th.append(t)

            for x in range(len(th)):
                th[x].start()

            for x in range(len(th)):
                th[x].join()

            rslt_df = pd.concat(dataf,ignore_index=True)
            # print(datetime.now())

            df = rslt_df.sort_values(by = 'Order', ascending = True)

            df = df[df["Order"]<=int(OrderNo)]
            
            C = df[df.columns[0]].count()

            SO = {"SNO": [0], "Time": [" "], "Script": [""], "NTStamp":[" "], "OType": ["B"], "Token": [0], "OrderID": [0], "OID": [0], "TotalNQ": [0], "Price": [0]}
            SOdf = pd.DataFrame.from_dict(SO)
            MaxOID = 0
            for x in range(0,C):
                epoch = int(int(df.loc[x,"TStamp"])/1000000)
                Pepoch = (time.strftime('%H:%M:%S', time.localtime(epoch)))

                OID = 0
                if x==0:
                    OID = 0
                    MaxOID = df.loc[x,"Order"]

                else:
                    if(MaxOID< df.loc[x-1,"Order"]):
                        MaxOID = df.loc[x-1,"Order"]
                    OID = (df.loc[x,"Order"] - MaxOID)
                
                # print((Fdfs[Fdfs["index"]==(df.loc[x,"Token"])]["0"]))
                sym = ((Fdfs[Fdfs["index"]==(df.loc[x,"Token"])]["0"]).to_string()).split(" ")[-1] 

                SOdf.loc[x] = [x,Pepoch, sym, df.loc[x,"TStamp"], (df.loc[x,"BS"]), (df.loc[x,"Token"]), (df.loc[x,"Order"]),OID,(df.loc[x,"Qty"]),((df.loc[x,"Price"])/100)]

            result = SOdf.to_json(orient="index")
            return result

    except Exception as e:
        return e
    
    # print(datetime.now())

@app.route('/orderidlist', methods=["GET", "POST"])
def orderidlist():

    CreFile = "/home/analysis/*.csv"

    Filename = glob.glob(CreFile, recursive = True)

    OID = {"SN": [0], "L": [0], "ResponseTime": [0.0], "M": ["ORDLOG"], "S": ["REJECTED"], "ErrCode": [16387], "CtclId": [37357],
                          "RefID": [13], "Token": [0], "Symbol": ["ACC"], "Series": ["EQ"],
                          "ExID": [0], "Price": [0], "OT": ["b"], "Qty": [1], "RemQTY": ["b"], "LTQ": [0],
                           "LTP": [0], "Status": [8], "Qty": [1], "LastActivityReference": [0], "LocalTime": [0],"AccNo":[""]}

    OIDf = pd.DataFrame.from_dict(OID)
    OIDflenth = OIDf.shape
    
    i=0

    tdate = str(datetime.now().date()).replace('-', '')

    for file in Filename:

        if ((file.find('RESPONSE') != -1) and (file.find(tdate) != -1)):
            
            print(file," : ",file.find(tdate), " : ",tdate)
            file1 = open(file, 'r')
            Lines = file1.readlines()
            for line in Lines:
                Values = [x.split("=")[1].rstrip().lstrip() if(len(x.split("="))==2) else (x.split("="))[0].rstrip().lstrip() for x in (line.split(",")) ]

                if OIDflenth[1] == len(Values):
                    Values[0] = i
                    Values[11] = int(float(Values[11]))

                    OIDf.loc[i] = Values
                    
                    i = i + 1

    OrderID = {}
    d=0
    for x in (OIDf["ExID"]).tolist():
        OrderID[str(d)] = x
        d = d + 1

    result = OrderID
    return result
    # print(OrderID)

@app.route('/premarketorder', methods=["GET", "POST"])
def premarketorder():

    if request.method == "POST":
        SDate = request.json['SDate']
        EDate = request.json['EDate']

        print(SDate, " : ", EDate)

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

            fdate = file.split("/")[-1].split("_")[-1].split(".")[0]

            if ((file.find('REQUEST') != -1) and (fdate>=SDate) and (fdate<=EDate)):
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

            if ((file.find('RESPONSE') != -1) and (fdate>=SDate) and (fdate<=EDate)):
                
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

            if ((d>=SDate) and (d<=EDate)) :

                ResD = Ndf[Ndf["RequestTime"]==str(d)].reset_index()
                ReqD = Reqdf[Reqdf["RDate"]==str(d)]

                for i in range(len(ResD)):

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
        # print(result)
        return result
        
@app.route("/")
def main():
    return "Try Other URL"

def sortfilename(llist):
    dlist= []
    for e in llist:
        m = e.split("/")[-1].split("_")[-1].split(".")[0]
        if m not in dlist:
            dlist.append(m)
    return dlist
if __name__ == '__main__':
    global TokenDf
    td = datetime.now()
    TokenDf= pd.read_csv("StreamToken.CSV",
                        names=["Stream", "Token"])
    # print(TokenDf)
    app.run(debug=True, host="192.168.100.22", port=9000)
    # app.run(debug=True, host="localhost", port=9000)

