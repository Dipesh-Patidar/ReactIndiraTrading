# This is a sample Python script.
import pandas as pd
from datetime import datetime, timedelta
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
import calendar

app = Flask(__name__)
CORS(app)

file = "security.txt"
sym = "NotFound"
FPath = "/home/pnp/Bhavcopy"
LPath = "/home/pnp/Bhavcopy/Backup/"

def EFChange(x):
    return datetime.strptime(x, '%d-%b-%Y').strftime('%Y%m%d')

def WeeDay(x):
    return calendar.day_name[datetime.strptime(x, '%Y%m%d').weekday()]

def Stdpoint(x, y):
    return round(((round(x/100)*100) * y * 0.01),2) 

def BhavDownload():
    global Filename

    FilePath = FPath +  "/*.csv"

    Filename = glob.glob(FilePath, recursive = True)

def VixUpdate():
    global vdf

    VPath = "/home/pnp/Bhavcopy/IndiaVix" +  "/*.csv"

    VFilename = glob.glob(VPath, recursive = True)

    for File1 in VFilename:

        if ("hist" in File1):
            vdf = pd.read_csv(File1)
            vdf["Date"] = vdf["Date "].apply(EFChange)
            vdf.drop(["Date "],axis=1,inplace=True)

    print(vdf)

def CollUpdate():
    global db
    global vdf

    for File1 in Filename:

        if ("bhav" in File1):
            
            # print(File1)
            bpd = pd.read_csv(File1)

            bpd.drop(
                ["OPEN", "HIGH", "LOW", "CONTRACTS", "VAL_INLAKH", "OPEN_INT", "CHG_IN_OI"],
                axis=1, inplace=True)

            # FUTURE

            bpd["EXPIRY_DT"] = bpd["EXPIRY_DT"].apply(EFChange)
            bpd["TIMESTAMP"] = bpd["TIMESTAMP"].apply(EFChange)

# NIFTY Straddle 

            Nibpd1 = (((bpd[bpd["SYMBOL"]=="NIFTY"].groupby(["EXPIRY_DT","INSTRUMENT"]).first()).reset_index()).groupby("INSTRUMENT").nth([0,1])).reset_index()

            CD = Nibpd1.iloc[0,7]   #CurentDate
            MS = Nibpd1.iloc[0,6]

            MSp = (round((Nibpd1.iloc[0,6])/100)*100)   #MonthlySettlementPrice_StrikePrice
            WEx = Nibpd1.iloc[2,1]   #WeeklyExpiry
            MEx = Nibpd1.iloc[0,1]   #MonthlyExpiry
            if WEx==MEx:
                MEx = Nibpd1.iloc[1,1]

            Wdf = bpd[(bpd["SYMBOL"]=="NIFTY") & (bpd["EXPIRY_DT"]==WEx) & (bpd["STRIKE_PR"]==MSp)]
            Mdf = bpd[(bpd["SYMBOL"]=="NIFTY") & (bpd["EXPIRY_DT"]==MEx) & (bpd["STRIKE_PR"]==MSp)]

            WSPoint = Wdf["CLOSE"].sum()
            MSPoint = Mdf["CLOSE"].sum()
            WPer = round(((WSPoint/MSp)*100),2)
            MPer = round(((MSPoint/MSp)*100),2)

            print(CD)
            
            IV = round((vdf[(vdf["Date"]==CD)].reset_index().iloc[0,4]),2)

            IVP = round((vdf[(vdf["Date"]==CD)].reset_index().iloc[0,7]),2)

            dic = ({"Date":CD, "WExpiry": WEx, "WSPer": WPer, "WSPoint":WSPoint, "MExpiry": MEx, "MSPer": MPer, "MSPoint":MSPoint, "IV":IV, "IVP":IVP, "FPrice": MS})

            print(dic)

            db["NIOData"].insert_one(dic)

#  BANKNIFTY Straddle

            BNibpd1 = (((bpd[bpd["SYMBOL"]=="BANKNIFTY"].groupby(["EXPIRY_DT","INSTRUMENT"]).first()).reset_index()).groupby("INSTRUMENT").nth([0,1])).reset_index()

            CD = BNibpd1.iloc[0,7]   #CurentDate
            MS = BNibpd1.iloc[0,6]

            MSp = (round((BNibpd1.iloc[0,6])/100)*100)   #MonthlySettlementPrice_StrikePrice
            WEx = BNibpd1.iloc[2,1]   #WeeklyExpiry
            MEx = BNibpd1.iloc[0,1]   #MonthlyExpiry
            if WEx==MEx:
                MEx = BNibpd1.iloc[1,1]

            Wdf = bpd[(bpd["SYMBOL"]=="BANKNIFTY") & (bpd["EXPIRY_DT"]==WEx) & (bpd["STRIKE_PR"]==MSp)]
            Mdf = bpd[(bpd["SYMBOL"]=="BANKNIFTY") & (bpd["EXPIRY_DT"]==MEx) & (bpd["STRIKE_PR"]==MSp)]

            WSPoint = Wdf["CLOSE"].sum()
            MSPoint = Mdf["CLOSE"].sum()

            WPer = round(((WSPoint/MSp)*100),2)
            MPer = round(((MSPoint/MSp)*100),2)

            IV = round((vdf[(vdf["Date"]==CD)].reset_index().iloc[0,4]),2)

            IVP = round((vdf[(vdf["Date"]==CD)].reset_index().iloc[0,7]),2)

            dic = ({"Date":CD, "WExpiry": WEx, "WSPer": WPer, "WSPoint":WSPoint, "MExpiry": MEx, "MSPer": MPer, "MSPoint":MSPoint, "IV":IV, "IVP":IVP, "FPrice": MS})

            print(dic)

            db["BNIODATA"].insert_one(dic)

# Future Stocks Straddle 

            gbpd = list(bpd.groupby(["SYMBOL", "INSTRUMENT"]))

            # FUTURE

            FDf = gbpd[0::2]
            FLDf = list(list(zip(*FDf))[1])
            FTDf = pd.concat(FLDf).groupby("SYMBOL").first()

            # OPTION

            ODf = gbpd[1::2]
            OLDf = list(list(zip(*ODf))[1])
            OTDf1 = pd.concat(OLDf).set_index("SYMBOL")

            OTDf1.rename(columns={'SETTLE_PR': 'OSETTLE_PR'}, inplace=True)

            OTDf1 = OTDf1.join(FTDf["SETTLE_PR"])

            OTDf1["SSD"] = OTDf1["STRIKE_PR"] - OTDf1["SETTLE_PR"]

            OTDf1["SSD"] = OTDf1["SSD"].abs()

            ESeries = FTDf["EXPIRY_DT"].iloc[0]  # Expiry
            DSeries = (FTDf["TIMESTAMP"].iloc[0])     # DAY

    #
            print((DSeries))
    #
            OTDf = OTDf1[OTDf1["EXPIRY_DT"] == ESeries]  # CurrentExpiryOption

            OTDf = OTDf.reset_index()

            ASeries = (OTDf.groupby("SYMBOL")["SSD"].min()).rename("MinSSD")

            OSDf = (OTDf.set_index("SYMBOL"))  # OptionSymbolIndex
    #
            ATMODf = pd.merge(OSDf, ASeries, how="left", left_index=True, right_index=True)  # ATM_Option_DF
    #
            ATMODf = ATMODf[ATMODf["SSD"] == ATMODf["MinSSD"]]  # ATMOPTION

            MSSeries = (ATMODf.groupby(["SYMBOL"])["STRIKE_PR"].min()).rename("MinSTR")

            ATMODf = pd.merge(ATMODf, MSSeries, how="left", left_index=True, right_index=True)

            ATMODf = ATMODf[ATMODf["STRIKE_PR"] == ATMODf["MinSTR"]]

            ResultS = ATMODf.groupby("SYMBOL")["OSETTLE_PR"].sum()
            ResultP = ATMODf.groupby("SYMBOL")["STRIKE_PR"].mean()

            ResultPer = round(((ResultS / ResultP) * 100),2)

            ResultPer["Expiry"] = ESeries

            ResultPer["Date"] = DSeries

            # print(ResultPer)

            MIndex = [[DSeries, DSeries, DSeries], ["ATM_PR", "SETTLE_PR", "Percentage"]]

            tuples = list(zip(*MIndex))

            Index = pd.MultiIndex.from_tuples(tuples, names=["first", "second"])

            Result1 = pd.DataFrame([ResultP, ResultS, ResultPer], index=Index)

            Result1 = Result1.reset_index()

            df_dict = Result1.to_dict('records')

            db["OData"].insert_many(df_dict)

            db["ODataPer"].insert_one(ResultPer.to_dict())
            
            os.rename(File1,LPath+File1.split("/")[-1])

def DataSheet():

    global db

    HOST = '192.168.100.22'  #192.168.100.22
    PORT = 27017 

    client = pymongo.MongoClient(HOST, PORT)

    db = client["IOptionData"]

    VixUpdate()

    BhavDownload()
    CollUpdate()

@app.route('/optionmerdata', methods=["GET", "POST"])
def OptionMerData():

    if request.method == "GET":
        
        print(datetime.now())

        FResult = pd.DataFrame()

        DataSheet()

        pdf = pd.DataFrame(list(db["ODataPer"].find()))
        pdf = pdf.sort_values('Date')
        pdf.drop(["_id"],axis=1, inplace=True)
        pdf.reset_index(inplace=True)
        pdf.drop(["index"],axis=1, inplace=True)
        pdf = pdf.fillna(0)

        CheckFinal: list[Any] = list(pdf.groupby("Expiry"))

        for i in range(0, len(CheckFinal)):

            MeanDf = CheckFinal[i][1].set_index("Date").drop(["Expiry"], axis=1).expanding().mean()
            Bothdf = pd.concat([CheckFinal[i][1].set_index("Date"), MeanDf]).reset_index().groupby("Date")

            CalDf = round((((Bothdf.first().drop(["Expiry"], axis=1)) - (Bothdf.last().drop(["Expiry"], axis=1)))*100)/(Bothdf.last().drop(["Expiry"], axis=1)),2)

            GDF = CalDf[((((Bothdf.first().drop(["Expiry"], axis=1)) - (Bothdf.last().drop(["Expiry"], axis=1)))*100)/(Bothdf.last().drop(["Expiry"], axis=1))) > 0]

            FResult = pd.concat([FResult, GDF])

        FResult = FResult.fillna(-1)
        FResult.reset_index(inplace=True)
        FResult["Expiry"] = pdf["Expiry"]

        FResult = FResult.astype(str)
        pdf = pdf.astype(str)

        MerDf = pd.concat([pdf,FResult], axis=1)
        NewDf = pd.DataFrame()

        for i in list(pdf.columns):
            NewDf[i] = (MerDf[i].iloc[:,0]).str.cat((MerDf[i].iloc[:,1]),sep=",")

        NewDf = NewDf.sort_values("Date", ascending=False).reset_index(drop=True)    
        result = NewDf.to_json(orient="index")
        print("End: ",datetime.now())
        return result

@app.route('/optionidxdata', methods=["GET", "POST"])
def OptionIdxData():

    if request.method == "GET":
        
        print(datetime.now())

        DataSheet()

        WFResult = pd.DataFrame()
        MFResult = pd.DataFrame()

        df = pd.DataFrame(list(db["NIOData"].find()))

        df = df.sort_values('Date')
        df.reset_index(inplace=True)

        df.drop(["_id","index"],axis=1, inplace=True)

        df["PClose"] = pd.concat([pd.Series([df.iloc[0,7]]),df["FPrice"]]).reset_index().drop(["index"],axis=1)

        df["PClose"] = df["PClose"].astype(float)

        df["PChange"] = round((((df["FPrice"]-df["PClose"])/df["PClose"])*100),2)   
        
        df["WeekDay"] = df["Date"].apply(WeeDay)

        
        df['WEEKLY STD PTS N'] = df["WSPoint"].astype(float).round(2)
        df['MONTHLY STD PTS N'] = df["MSPoint"].astype(float).round(2)

        NFDf = df[['WeekDay', 'Date', 'FPrice', 'PChange', 'IV', 'IVP', 'WExpiry','WEEKLY STD PTS N', 'WSPer', 'MExpiry', 'MONTHLY STD PTS N', 'MSPer']]

        NFDf.rename(columns = {'FPrice':'NIFTY CLOSING', 'PChange':"%ChangeN", 'IVP':"%ChangeIV" , 'WSPer':"%ChangeWN" , 'MSPer':"%ChangeMN"}, inplace = True)


        NFDf = NFDf.sort_values("Date", ascending=False).reset_index().drop(["index"],axis=1)

    # 

        df = pd.DataFrame(list(db["BNIODATA"].find()))
        df = df.sort_values('Date')
        df.reset_index(inplace=True)

        df.drop(["_id","index"],axis=1, inplace=True)

        df["PClose"] = pd.concat([pd.Series([df.iloc[0,7]]),df["FPrice"]]).reset_index().drop(["index"],axis=1)

        df["PClose"] = df["PClose"].astype(float)

        df["PChange"] = round((((df["FPrice"]-df["PClose"])/df["PClose"])*100),2)   
        
        df["WeekDay"] = df["Date"].apply(WeeDay)

        
        df['WEEKLY STD PTS BN'] = df["WSPoint"].astype(float).round(2)
        df['MONTHLY STD PTS BN'] = df["MSPoint"].astype(float).round(2)

        BNFDf = df[['WeekDay', 'Date', 'FPrice', 'PChange', 'IV', 'IVP', 'WEEKLY STD PTS BN', 'WSPer', 'MONTHLY STD PTS BN', 'MSPer']]

        BNFDf.rename(columns = {'FPrice':'BANKNIFTY CLOSING', 'PChange':"%ChangeBN", 'IVP':"%ChangeIV" , 'WSPer':"%ChangeWBN" , 'MSPer':"%ChangeMBN"}, inplace = True)

        BNFDf1 = BNFDf[["Date", 'BANKNIFTY CLOSING', "%ChangeBN", 'WEEKLY STD PTS BN' , "%ChangeWBN", 'MONTHLY STD PTS BN', "%ChangeMBN", ]] 

        # print(BNFDf1)
        BNFDf1 = BNFDf1.sort_values("Date", ascending=False).reset_index().drop(["index","Date"],axis=1)

        Fdf = pd.concat([NFDf, BNFDf1], axis=1)

        print(Fdf)

    # 
        
        FResultPerT2 = Fdf[["Date", "WExpiry", '%ChangeWN', '%ChangeWBN']].sort_values('Date', ascending=True)

        CheckFinal: list[Any] = list(FResultPerT2.groupby("WExpiry"))

        for i in range(0, len(CheckFinal)):

            MeanDf = CheckFinal[i][1].set_index("Date").drop(["WExpiry"], axis=1).expanding().mean()
            Bothdf = pd.concat([CheckFinal[i][1].set_index("Date"), MeanDf]).reset_index().groupby("Date")

            CalDf = round(((((Bothdf.first().drop(["WExpiry"], axis=1)) - (Bothdf.last().drop(["WExpiry"], axis=1)))*100)/(Bothdf.last().drop(["WExpiry"], axis=1))),2)

            GDF = CalDf[((((Bothdf.first().drop(["WExpiry"], axis=1)) - (Bothdf.last().drop(["WExpiry"], axis=1)))*100)/(Bothdf.last().drop(["WExpiry"], axis=1))) > 0]

            WFResult = pd.concat([WFResult, GDF])

        WFResult = WFResult.fillna(-1).sort_values('Date', ascending=False)

        WFResult = WFResult

    # 

        FResultPerT2 = Fdf[["Date", "MExpiry", '%ChangeMN', '%ChangeMBN']].sort_values('Date', ascending=True)

        CheckFinal: list[Any] = list(FResultPerT2.groupby("MExpiry"))

        for i in range(0, len(CheckFinal)):

            MeanDf = CheckFinal[i][1].set_index("Date").drop(["MExpiry"], axis=1).expanding().mean()
            Bothdf = pd.concat([CheckFinal[i][1].set_index("Date"), MeanDf]).reset_index().groupby("Date")

            CalDf = round(((((Bothdf.first().drop(["MExpiry"], axis=1)) - (Bothdf.last().drop(["MExpiry"], axis=1)))*100)/(Bothdf.last().drop(["MExpiry"], axis=1))),2)

            GDF = CalDf[((((Bothdf.first().drop(["MExpiry"], axis=1)) - (Bothdf.last().drop(["MExpiry"], axis=1)))*100)/(Bothdf.last().drop(["MExpiry"], axis=1))) > 0]

            MFResult = pd.concat([MFResult, GDF])

        MFResult = MFResult.fillna(-1).sort_values('Date', ascending=False)

        MFResult = MFResult


    # 

        MFResult = MFResult.astype(str)
        WFResult = WFResult.astype(str)
        Fdf = Fdf.astype(str)

        CRes = Fdf.set_index("Date").drop(["WExpiry","MExpiry"], axis=1)
        MerDf = pd.concat([CRes,MFResult,WFResult], axis=1)

        NewDf = pd.DataFrame()

        for i in list(CRes.columns):
            if isinstance(MerDf[i], pd.DataFrame):
                NewDf[i] = (MerDf[i].iloc[:,0]).str.cat((MerDf[i].iloc[:,1]),sep=",")
            else:
                NewDf[i] = (MerDf[i])

        NewDf = NewDf.reset_index()

        print(NewDf)

        result = NewDf.to_json(orient="index")
        print("End: ",datetime.now())
        return result





@app.route('/pendingorder', methods=["GET", "POST"])
def PendingOrder():
    global PS
    global Execute

    PS = {}
    Execute = False
    try:
        print(datetime.now())
        if request.method == "POST":
            TokenNo = str(request.json['TokenNo'])
            OrdID = str(request.json['OrderID'])

# 
            name = [str(i) for i in range(0,53)]
            sdf = pd.read_csv("security.txt", sep="|",names=name, skiprows=1).reset_index()

            # display DataFrame

            Fdfs = (sdf[["index","0"]])

            dataDic = {"index":int, "0":str}

            Fdfs.astype(dataDic)


            # print((Fdfs[Fdfs["index"]==int(TokenNo)]["0"]))
            sym = ((Fdfs[Fdfs["index"]==int(TokenNo)]["0"]).to_string()).split(" ")[-1]

            print(sym)
#           
            
            PS["sym"] = sym

            db_connect = pymongo.MongoClient('192.168.100.22', 27017)
            for db in db_connect.list_databases():
                for coll in db_connect[db["name"]].list_collection_names():
                    if (coll==("T"+TokenNo)):
                        DBName = db["name"]
                        ColName = coll
                        break

            print("DBName: ",DBName," ColName: ",ColName)

            if(DBName=="STREAM1"):
                OrdID = "10" + "0"*(14-len(OrdID)) + OrdID

            elif(DBName=="STREAM2"):
                OrdID = "11" + "0"*(14-len(OrdID)) + OrdID
            
            elif(DBName=="STREAM3"):
                OrdID = "12" + "0"*(14-len(OrdID)) + OrdID
            
            else:
                OrdID = "13" + "0"*(14-len(OrdID)) + OrdID

            CName = db_connect[DBName][ColName]

# ............................

            NO = CName.find_one({"OType":"N","Order": bson.Int64(OrdID)})
            print(NO)
            # OPrice=0
            # for data in NO:
            TStamp = NO["TStamp"]
            OPrice = NO["Price"]
            TType = NO["BS"]

            PS["TStamp"] = (time.strftime('%H:%M:%S', time.localtime(int(int(TStamp)/1000000))))
            PS["OPrice"] = OPrice
            PS["Type"] = TType

            PS["PO"] = 0
            PS["PQ"] = 0

            # new order Less than our order id 
# ...................

            LNO = list(CName.find({"$and":[{"Price":OPrice},{"TStamp":{ "$lt": bson.Int64(TStamp)}},{"BS": TType}]}))

            LOrder = ([d["Order"] for d in (LNO)])
            print("New order of Specific Price: ", len(LOrder)) 

            # print([item for item,count in collections.Counter(LOrder).items() if(count>2)])


            # Cancel Order remove from order list
# .................

            LXO = list(CName.find({"$and":[{"OType":"X"},{"Order":{"$in": LOrder}}]}))

            XOrder = ([d["Order"] for d in (LXO)])

            # After removal of Cancel Order 
            LOrder = list(set(LOrder) - set(XOrder))

            print("After removal of Cancel Order: ", len(LOrder)) 
            # print(LOrder)
            # Modified Quantity

# .....................

            AMO = CName.aggregate([{ "$match": { "$and" : [ {"OType":"M"}, {"Order": {"$in": LOrder}}, {"BS": TType}, {"TStamp": {"$gt": TStamp}}]}},{"$group":{"_id":"$Order"}}])
            AMO = list(AMO)

            AMOrder = ([d["_id"] for d in (AMO)])

            LOrder = list(set(LOrder) - set(AMOrder))
            
            print("After Modified Order: ", len(set(AMOrder)))

# ....................

            LMO = CName.aggregate([{ "$match": { "$and" : [ {"OType":"M"}, {"BS": TType}, {"TStamp": {"$lte": TStamp}}]}},{"$group":{"_id":"$Order", "SNO": {"$max":"$SNO"}}}])
            LMO = list(LMO)

            MOrder = ([d["_id"] for d in (LMO)])
            MSNo = ([d["SNO"] for d in (LMO)])

            LOrder = list(set(LOrder) - set(MOrder))
            

# ...................  Start Updation

            MXMO = list(CName.find({"SNO":{"$in": MSNo}}))

            if TType=="B":
                MXMO = list(CName.find({"$and":[{"SNO":{"$in": MSNo}},{"Price":{"$gte": OPrice}}]}))

            else:
                MXMO = list(CName.find({"$and":[{"SNO":{"$in": MSNo}},{"Price":{"$lte": OPrice}}]}))

            MXMSn = ([d["SNO"] for d in (MXMO)])
            MXMorder = ([d["Order"] for d in (MXMO)])
            MNQty = ([d["Qty"] for d in (MXMO)])

            print("Modified Order: ", len(set(MXMSn)))

            MRQty = []
            TMTQty = []

            for SN in range(len(MXMSn)):

                if TType=="B": 
                    MTQty = list(CName.aggregate([ { "$match": { "$and" : [ {"OType":"T"}, {"Order":MXMorder[SN]}, {"SNO": { "$gt": MXMSn[SN]}}] } }, { "$group": { "_id" : "$Order", "MTTQ": { "$sum": "$Qty" } } } ]))
                else:
                    MTQty = list(CName.aggregate([ { "$match": { "$and" : [ {"OType":"T"}, {"BS":MXMorder[SN]}, {"SNO": { "$gt": MXMSn[SN]}}] } }, { "$group": { "_id" : "$Order", "MTTQ": { "$sum": "$Qty" } } } ]))

                
                MNQ = MNQty[SN]

                if (len((MTQty))>0) :
                    
                    MTQ = [Q["MTTQ"] for Q in MTQty][0]
                    TMTQty.append(MTQ) 
                    MRQty.append(MNQ-MTQ)

                else: 
                    TMTQty.append(0)
                    MRQty.append(MNQ)
                    
            # Fully Modified Traded order id
            B = [MXMorder[j] for j in range(len(MRQty)) if (MRQty[j]<=0)]

            # After removal of Fully Modified Traded Order

            FMOrder = list(set(MXMorder)-set(B))



# ...................  Stop 

            # MRQty = []
            # TMTQty = []

            # for SN in range(len(MSNo)):

            #     if TType=="B": 
            #         MTQty = list(CName.aggregate([ { "$match": { "$and" : [ {"OType":"T"}, {"Order":MOrder[SN]}, {"SNO": { "$gt": MSNo[SN]}}] } }, { "$group": { "_id" : "$Order", "MTTQ": { "$sum": "$Qty" } } } ]))
            #     else:
            #         MTQty = list(CName.aggregate([ { "$match": { "$and" : [ {"OType":"T"}, {"BS":MOrder[SN]}, {"SNO": { "$gt": MSNo[SN]}}] } }, { "$group": { "_id" : "$Order", "MTTQ": { "$sum": "$Qty" } } } ]))

            #     MNQty = list(CName.find({"OType":"M","Order":MOrder[SN],"SNO": MSNo[SN]}))

            #     # print(MNQty)
            #     # MPNQty = list(CName.find({"$and":[{"OType":"N"},{"Order":MOrder[SN]},{"SNO": {"$lt": MSNo[SN]}}]}))

            #     MNQ = [Q["Qty"] for Q in MNQty][0]
            #     MTS = [T["TStamp"] for T in MNQty][0]
            #     MPC = [P["Price"] for P in MNQty][0]

            #     # MPNQ = [Q["Qty"] for Q in MPNQty][0]

            #     if (len((MTQty))>0) :

            #         MTQ = [Q["MTTQ"] for Q in MTQty][0]
            #         TMTQty.append(MTQ) 

            #         # if (MNQ<=MTQ) or (MPNQ<MNQ) or (MTS>TStamp) or (MPC!=OPrice):
            #         if (MNQ<=MTQ) or (MTS>TStamp) or ((MPC<OPrice) and (TType=="B")) or ((MPC>OPrice) and (TType=="S")) :
            #             MRQty.append(0)
            #         else:
            #             MRQty.append(MNQ-MTQ)

            #     else: 
            #         TMTQty.append(0)
            #         if ((MTS>TStamp) or ((MPC<OPrice) and (TType=="B")) or ((MPC>OPrice) and (TType=="S"))):
            #             MRQty.append(0)
            #         else:
            #             MRQty.append(MNQ)
                    
            # # Fully Modified Traded order id
            # B = [MOrder[j] for j in range(len(MRQty)) if (MRQty[j]==0)]

            # # After removal of Fully Modified Traded Order

            # FMOrder = list(set(MOrder)-set(B))

# ..................................

            # Traded Order Quantity

            if TType=="B":
                TTQ = list(CName.aggregate([ { "$match": { "$and" : [ {"OType":"T"},{"Order": { "$in": LOrder}}] } }, { "$group": { "_id" : "$Order", "TTQ": { "$sum": "$Qty" } } } ]))
            else:
                TTQ = list(CName.aggregate([ { "$match": { "$and" : [ {"OType":"T"},{"BS": { "$in": LOrder}}] } }, { "$group": { "_id" : "$BS", "TTQ": { "$sum": "$Qty" } } } ]))

            
            TQty = ([d["TTQ"] for d in (TTQ)])
            TOrder = ([bson.Int64(d["_id"]) for d in (TTQ)])

            TNQ = list(CName.find({ "$and" : [ {"OType":"N"},{"Order": { "$in": LOrder}}]}))
            NQty = ([d["Qty"] for d in (TNQ)])
            FLOrder = ([d["Order"] for d in (TNQ)])

            FNQty = [NQty[FLOrder.index(LOrder[i])] for i in range(len(LOrder))]

            TTQty = [TQty[TOrder.index(LOrder[i])] if (LOrder[i] in TOrder) else 0 for i in range(len(LOrder))]

            RQty = [(NQ-TQ) if (NQ>TQ) else 0 for (TQ,NQ) in zip(TTQty,FNQty)]

            # Fully Traded order id
            A = [LOrder[j] for j in range(len(RQty)) if (RQty[j]<=0)]

            # After removal of Fully Traded Order

            FROrder = list(set(LOrder)-set(A))

            print("After removal of Fully Traded Order: ", len(FROrder))

            PQ = (sum(RQty)+sum(MRQty))
            PO = (len(FROrder)+len(FMOrder))

            # PQ = sum(RQty)
            # PO = len(FROrder)

            print("Total Pending Order: ",PO)

            print("Pending Quntity: ",PQ)

            PS["PO"] = PO
            PS["PQ"] = PQ
            
            Execute = True

            POd = {"SNO":[0],"Time":[" "],"OrderID":[0],"NQuantity":[0],"TQuantity":[0],"RQuantity":[0]}

            POdf = pd.DataFrame.from_dict(POd)

            k = 0 
            for j in range(len(LOrder)):
                RO = CName.find_one({"OType":"N","Order": bson.Int64(LOrder[j])})
                if(RQty[j]>0):
                    epoch = int(int(RO["TStamp"])/1000000)
                    Pepoch = (time.strftime('%H:%M:%S', time.localtime(epoch)))
                    POdf.loc[k] = [k,Pepoch,RO["Order"],RO["Qty"],TTQty[j],RQty[j]]
                    k = k + 1

            for j in range(len(MRQty)):
                RO = CName.find_one({"OType":"M","SNO": bson.Int64(MSNo[j])})
                if(MRQty[j]>0):
                    epoch = int(int(RO["TStamp"])/1000000)
                    Pepoch = (time.strftime('%H:%M:%S', time.localtime(epoch)))
                    POdf.loc[k] = [k,Pepoch,RO["Order"],RO["Qty"],TMTQty[j],MRQty[j]]
                    k = k + 1
            
            result = POdf.to_json(orient="index")
            print("End: ",datetime.now())
            return result


    except Exception as e:
        return e

@app.route('/pendingsummary', methods=["GET", "POST"])
def PendingSummary():

    global PS
    global Execute

    try:
        print(datetime.now())

        while True: 

            if(Execute):
                if request.method == "GET":
                    Execute = False
                    return PS
                    
                    break
                
    except Exception as e:
        return e

@app.route('/ordertype', methods=["GET", "POST"])
def OrderType():
    print(datetime.now())
    try:
        if request.method == "POST": 
            StartTime = request.json['StartTime']
            EndTime = request.json['EndTime']
            TokenNo = request.json['TokenNo']
        # 
            
            name = [str(i) for i in range(0,53)]
            sdf = pd.read_csv("security.txt", sep="|",names=name, skiprows=1).reset_index()

            # display DataFrame

            Fdfs = (sdf[["index","0"]])

            dataDic = {"index":int, "0":str}

            Fdfs.astype(dataDic)


            # print((Fdfs[Fdfs["index"]==int(TokenNo)]["0"]))
            sym = ((Fdfs[Fdfs["index"]==int(TokenNo)]["0"]).to_string()).split(" ")[-1]
            
            print(sym)
            print(StartTime," : ", EndTime, " : ", TokenNo)
        # 

            SH = int(StartTime.split(":")[0])
            SM = int(StartTime.split(":")[1])
            SS = int(StartTime.split(":")[2])
            EH = int(EndTime.split(":")[0])
            EM = int(EndTime.split(":")[1])
            ES = int(EndTime.split(":")[2])

            # print("Intial Data: ",df)

            date = str(datetime.now().date())

            STime = datetime(int(date[:4]), int(date[5:7]), int(date[8:10]), SH, SM, SS).timestamp()
            ETime = datetime(int(date[:4]), int(date[5:7]), int(date[8:10]), EH, EM, ES).timestamp()
            
            print("STime: ",STime, " ETime: ",ETime)
            # print(datetime.now())
            db_connect = pymongo.MongoClient('192.168.100.22', 27017)
            for db in db_connect.list_databases():
                for coll in db_connect[db["name"]].list_collection_names():
                    if (coll==("T"+TokenNo)):
                        DBName = db["name"]
                        ColName = coll
                        break

            print("DBName: ",DBName," ColName: ",ColName)

            CName = db_connect[DBName][ColName]

            MC = list(CName.find({"$and":[{"OType":"M"},{"TStamp":{ "$gt": bson.Int64((STime * 1000000))}},{"TStamp":{ "$lt": bson.Int64((ETime * 1000000))}}]}))

            NC = list(CName.find({"$and":[{"OType":"N"},{"TStamp":{ "$gt": bson.Int64((STime * 1000000))}},{"TStamp":{ "$lt": bson.Int64((ETime * 1000000))}}]}))

            TC = list(CName.find({"$and":[{"OType":"T"},{"TStamp":{ "$gt": bson.Int64((STime * 1000000))}}]}))

            BNC = list(CName.find({"$and":[{"OType":"N"},{"BS":"B"},{"TStamp":{ "$gt": bson.Int64((STime * 1000000))}},{"TStamp":{ "$lt": bson.Int64((ETime * 1000000))}}]}))

            SNC = list(CName.find({"$and":[{"OType":"N"},{"BS":"S"},{"TStamp":{ "$gt": bson.Int64((STime * 1000000))}},{"TStamp":{ "$lt": bson.Int64((ETime * 1000000))}}]}))

            Ndf = pd.DataFrame(NC)

            print("Ndf: ",Ndf)
            Tdf = pd.DataFrame(TC)
            Mdf = pd.DataFrame(MC)

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
                    if ((Tdf[Tdf["BS"] == TOI]["Qty"]).astype(int).sum()) != 0:
                        OP = (((Tdf[Tdf["BS"] == TOI]["Qty"]).astype(int) * (
                                (Tdf[Tdf["BS"] == TOI]["Price"].astype(int)) / 100)).sum()) / (
                                (Tdf[Tdf["BS"] == TOI]["Qty"]).astype(int).sum())

                    TNQ = int(Ndf.loc[x, "Qty"])
                    TQ = Tdf[Tdf["BS"] == TOI]["Qty"].astype(int).sum()
                    TQC = Tdf[Tdf["BS"] == TOI]["Qty"].astype(int).count()

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
            print("End: ",datetime.now())
            return result

    except Exception as e:
        print("Something issue: ",e)


# .........................................................


@app.route('/atpcalculator', methods=["GET", "POST"])
def Atpcalculator():
    try:
        print(datetime.now())
        if request.method == "POST":
            TokenNo = request.json['TokenNo']
            Min = int(request.json['Min'])

    # 

            MinT = str(Min)+"Min" 
            name = [str(i) for i in range(0,53)]
            sdf = pd.read_csv("security.txt", sep="|",names=name, skiprows=1).reset_index()

            # display DataFrame

            Fdfs = (sdf[["index","0"]])

            dataDic = {"index":int, "0":str}

            Fdfs.astype(dataDic)


            # print((Fdfs[Fdfs["index"]==int(TokenNo)]["0"]))
            sym = ((Fdfs[Fdfs["index"]==int(TokenNo)]["0"]).to_string()).split(" ")[-1]
            
            print(sym)
    #  

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

            Nd = {"SNO": [0], "Time": [0], "Script": [sym], "NBQ": [0], "CNBQ": [0], "NSQ": [0], "CNSQ": [0], "BATP": [0],
                            "SATP": [0], "ANP": [0], "BANP": [0], "SANP": [0], "TQ": [0], "ATP": [0]}

            Ndf = pd.DataFrame.from_dict(Nd)

            print(datetime.now())

            df["DTStamp"] = df["TStamp"].apply(lambda x: (datetime.fromtimestamp(x/1000000)))
            df.drop(["_id","Stream","Exchange","SN","SNumber"], inplace=True, axis=1)

            df["TStamp"] = df["TStamp"].apply(lambda x: ((x/1000000)))

            rdf = list(df.resample(MinT, on='DTStamp'))

            k=0
            for i in range(0, len(rdf)):
                
                print(rdf[i][0])
                NC = rdf[i][1][rdf[i][1]["OType"] == "N"]

                BNC = NC[NC["BS"] == "B"]
                SNC = NC[NC["BS"] == "S"]

                TCD = rdf[i][1][rdf[i][1]["OType"] == "T"].reset_index(drop=True)

                TCD["D"] = TCD["Order"]-TCD["BS"]

                BTP = TCD[TCD["D"]>=0]

                STP = TCD[TCD["D"]<0]

                TQ = (TCD["Qty"]).astype(int).sum()

                NBQ = (BNC["Qty"]).astype(int).sum()
                NSQ = (SNC["Qty"]).astype(int).sum()

                CNBQ = (BNC["Qty"]).astype(int).count()
                CNSQ = (SNC["Qty"]).astype(int).count()

                ATP = 0
                ANP = 0
                BATP = 0
                SATP = 0
                BANP = 0
                SANP = 0

                if ((TCD["Qty"]).astype(int).sum()) != 0:
                    ATP = round(((((TCD["Qty"]).astype(int) * ((TCD["Price"].astype(int)) / 100)).sum()) / (
                        (TCD["Qty"]).astype(int).sum())), 2)

                if ((NC["Qty"]).astype(int).sum()) != 0:
                    ANP = round(((((NC["Qty"]).astype(int) * ((NC["Price"].astype(int)) / 100)).sum()) / (
                        (NC["Qty"]).astype(int).sum())), 2)

                if ((BTP["Qty"]).astype(int).sum()) != 0:
                    BATP = round(((((BTP["Qty"]).astype(int) * ((BTP["Price"].astype(int)) / 100)).sum()) / ((BTP["Qty"]).astype(int).sum())), 2)
                    
                if ((STP["Qty"]).astype(int).sum()) != 0:
                    SATP = round(((((STP["Qty"]).astype(int) * ((STP["Price"].astype(int)) / 100)).sum()) / ((STP["Qty"]).astype(int).sum())), 2)

                if ((BNC["Qty"]).astype(int).sum()) != 0:
                    BANP = round(((((BNC["Qty"]).astype(int) * ((BNC["Price"].astype(int)) / 100)).sum()) / ((BNC["Qty"]).astype(int).sum())), 2)
                    
                if ((SNC["Qty"]).astype(int).sum()) != 0:
                    SANP = round(((((SNC["Qty"]).astype(int) * ((SNC["Price"].astype(int)) / 100)).sum()) / ((SNC["Qty"]).astype(int).sum())), 2)


                if int(BATP)==0:
                    BATP = ATP

                if int(SATP)==0:
                    SATP = ATP  
                
                if int(BANP)==0:
                    BANP = ANP

                if int(SANP)==0:
                    SANP = ANP

                if not NC.empty:

                    Pepoch = (datetime.fromtimestamp(NC.iloc[0,1]).strftime('%H:%M'))
                    Ndf.loc[k] = [k, Pepoch, sym, NBQ, CNBQ, NSQ, CNSQ, BATP, SATP, ANP, BANP, SANP, TQ, ATP]
                    k = k + 1 


            result = Ndf.to_json(orient="index")

            print("End: ",datetime.now())

            return result


    except Exception as e:
        return e




# ........................................................
@app.route('/tokenlist', methods=["GET", "POST"])
def tokenlist():

    try:
        print(datetime.now())
        i=0
        TToken = {}
        if request.method == "GET":
            db_connect = pymongo.MongoClient('192.168.100.22', 27017)
            for db in db_connect.list_databases():
                for coll in db_connect[db["name"]].list_collection_names():
                    TToken[i] = (coll.split("T")[-1])
                    i = i + 1

            return TToken
               
    except Exception as e:
        return e

# ............................................................

@app.route('/multiscript', methods=["GET", "POST"])
def multiscript():

    try:
        print(datetime.now())
        i=0
        TToken = {}
        dflist = []
        
        if request.method == "POST":
            Tlist = request.json['Tlist']
            print(type(Tlist))
            
            db_connect = pymongo.MongoClient('192.168.100.22', 27017)
            for db in db_connect.list_databases():
                for coll in db_connect[db["name"]].list_collection_names():
                    DBName = db["name"]
                    ColName = coll

                    if (ColName.split("T")[-1]) in Tlist:
                        print(ColName)
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
                        
                        print(Finaldf)
                        dflist.append(Finaldf)
                        print(dflist)
                        


            Result = (pd.concat(dflist, axis =0)).to_json(orient="index")
            print(Result)
            print(datetime.now())
            return Result
               
    except Exception as e:
        return e

#......................................................

@app.route('/symlist', methods=["GET", "POST"])
def symlist():

    try:
        
        print(datetime.now())

        #     

        name = [str(i) for i in range(0,53)]
        sdf = pd.read_csv("security.txt", sep="|",names=name, skiprows=1).reset_index()

        # display DataFrame

        Fdfs = (sdf[["index","0","1"]])

        dataDic = {"index":int, "0":str, "1":str}

        Fdfs.astype(dataDic)

        ST = {"Token": [0], "Script": ["ACC"]}

        STdf = pd.DataFrame.from_dict(ST)

        ctg = ["BE","BL","EQ","RL","IQ"]

        
        i = 0 
        
        if request.method == "GET":

            db_connect = pymongo.MongoClient('192.168.100.22', 27017)
            for db in db_connect.list_databases():
                for coll in db_connect[db["name"]].list_collection_names():
                    if((coll.split("T")[-1]).isnumeric()):
                        symdf = pd.DataFrame()
                        symdf = Fdfs[Fdfs["index"]==int((coll.split("T")[-1]))]
                        C = symdf["1"].to_string().split(" ")[-1]
                        if not symdf.empty and C in ctg:
                            S = (symdf["0"].to_string().split(" ")[-1]) + "|" + C
                            T = int(coll.split("T")[-1])
                            STdf.loc[i] = [T, S]
                            i = i + 1

            result = STdf.to_json(orient="index")
            return result
            
    except Exception as e:
        return e

# ...................................................
@app.route("/")
def main():
    return "Try Other URL"

# ...................................................
def sortfilename(llist):
    dlist= []
    for e in llist:
        m = e.split("/")[-1].split("_")[-1].split(".")[0]
        if m not in dlist:
            dlist.append(m)
    return dlist

# ..................................................
if __name__ == '__main__':
    global TokenDf

    td = datetime.now()
    app.run(debug=True, host="192.168.100.22", port=9010)
    # app.run(debug=True, host="localhost", port=9000)

