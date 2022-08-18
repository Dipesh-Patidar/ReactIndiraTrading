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

            SH = int(StartTime.split(":")[0])
            SM = int(StartTime.split(":")[1])
            SS = int(StartTime.split(":")[2])
            EH = int(EndTime.split(":")[0])
            EM = int(EndTime.split(":")[1])
            ES = int(EndTime.split(":")[2])

            stream = TokenDf[TokenDf["Token"]==int(TokenNo)].reset_index().loc[0, 'Stream']

            # print(stream, " ", type(stream))


            CreFile = "/home/dwh/tbt-ncash-str"+str(stream)+"/*.DAT"

            # print("stream: ",stream," CreFile: ",CreFile)

            Filename = glob.glob(CreFile, recursive = True)[0]

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

            # print("Intial Data: ",df)

            STime = datetime(int(date[:4]), int(date[4:6]), int(date[6:8]), SH, SM, SS).timestamp()
            ETime = datetime(int(date[:4]), int(date[4:6]), int(date[6:8]), EH, EM, ES).timestamp()
            
            print(datetime.now())

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

            C = Ndf[Ndf.columns[0]].count()
            # print("C: ",C)
            Od = {"SNO": [0], "Time": [" "], "OType": ["B"], "OrderN": ["NRML"], "Algo": ["SMP"], "MCount": [0], "SQ": ["No"],
                  "SQCount": [0], "OrderID": [0], "TotalNQ": [0], "TQuantity": [0], "OCount": [0], "Price": [0]}
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

                Odf.loc[x] = [x, Pepoch, OT, ON, AO, MCount, SQ, SQCount, TOI, TNQ, TQ, TQC, OP]
                # print(Odf.loc[x])
            print(datetime.now())
            result = Odf.to_json(orient="index")
            # print(result)
            return result

    except Exception as e:
        return "Something issue"


@app.route('/atpcalculator', methods=["GET", "POST"])
def atpcaculator():
    try:

        if request.method == "POST":
            TokenNo = request.json['TokenNo']
            Min = float(request.json['Min'])

            td1 = 0
            CNepoch = 0
            Cepoch = 0

            stream = TokenDf[TokenDf["Token"]==int(TokenNo)].reset_index().loc[0, 'Stream']

            print(stream, " ", type(stream))


            CreFile = "/home/dwh/tbt-ncash-str"+str(stream)+"/*.DAT"

            print("stream: ",stream," CreFile: ",CreFile)

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
            print("df: ",df)
            while True:
                td = datetime.now()
                if td.date() != td1:
                    # (df["TStamp"][0])
                    # epoch = datetime(int(td.strftime("%Y")), int(td.strftime("%m")), int(td.strftime("%d")), 9, 15).timestamp()
                    epoch = datetime(int(date[:4]), int(date[4:6]), int(date[6:8]), 9, 15).timestamp()
                    print(epoch)
                    # epoch = int(epoch/ 1000000)
                    Sec = time.strftime('%S', time.localtime(epoch))
                    epoch = epoch - int(Sec)
                    Pepoch = (time.strftime('%H:%M:%S', time.localtime(epoch)))

                    Nd = {"SNO": [0], "Time": [Pepoch], "NBQ": [0], "CNBQ": [0], "NSQ": [0], "CNSQ": [0], "BATP": [0],
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
                             
                    Ndf.loc[i] = [i, Pepoch, NBQ, CNBQ, NSQ, CNSQ, BATP, SATP, ANP, TQ, ATP]

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


@app.route("/")
def main():

    # Filename = glob.glob('/home/dwh/tbt-ncash-str1/*.DAT', recursive = True)[0]
    # date = Filename.split("_")[1]
    # size = int((os.path.getsize(Filename))/400)
    # print(Filename)
    # dataf=[]
    # th = []

    # def file_read(i, name):

    #     name= pd.read_csv(Filename,
    #                         names=["SNO", "TStamp", "Stream", "Exchange", "SN", "OType", "SNumber", "Order", "Token", "BS", "Price", "Qty"],
    #                         skiprows=i,
    #                         nrows=size)

    #     #trend = name[(name["Token"].astype(str)==Token) or (name["BS"].astype(str)==Token)]
    #     dataf.append(name[(name["Token"].astype(str)=="4") | (name["BS"].astype(str)=="4")])

    # for x in range(0,5):
    #     dfp = "df"+str(x)
    #     t = threading.Thread(target=file_read, args=((x*size), dfp))
    #     th.append(t)

    # for x in range(len(th)):
    #     th[x].start()

    # for x in range(len(th)):
    #     th[x].join()

    # df = pd.concat(dataf,ignore_index=True)

    # print("Intial Data: ",df)

    # result = df.to_json(orient="index")
    # return result

    return "Try Other URL"

if __name__ == '__main__':
    global TokenDf
    td = datetime.now()
    TokenDf= pd.read_csv("StreamToken.CSV",
                        names=["Stream", "Token"])
    # print(TokenDf)
    app.run(debug=True, host="192.168.100.22", port=9000)

