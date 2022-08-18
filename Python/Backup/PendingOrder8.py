import pymongo
from datetime import datetime
import bson 
import collections
import pandas as pd
import numpy as np
import time

print(datetime.now())

TokenNo = "9810"
OrdID = 1000000004039983

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

NO = df[(df["Order"]==OrdID) & (df["OType"]=="N")].reset_index()

if not NO.empty:
    TStamp = NO["TStamp"][0]
    OPrice = NO["Price"][0]
    TType = NO["BS"][0]

    LNO = list(df[(df["Order"]<OrdID) & (df["OType"]=="N") & (df["Price"]==OPrice)]["Order"])
    print("Pervious Placed Order: ", len(LNO))

    LXO = list(df[(df["Order"].isin(LNO)) & (df["OType"]=="X")]["Order"])
    print("Cancel Placed Order: ", len(LXO))

    RPOrder = set(LNO)-set(LXO)
    print("Remaining Placed Order: ", len(RPOrder))

    LMO = list(df[(df["TStamp"]<TStamp) & (df["OType"]=="M") & (df["Price"]==OPrice)]["Order"])
    print("Pervious Modified Order: ", len(LMO))

    RPOrder = set(RPOrder)-set(LMO)
    print("Remaining Placed Order: ", len(RPOrder))

    POrder = df[(df["Order"].isin(RPOrder)) & (df["OType"]=="N")][["TStamp","Order","Qty"]]

    POrder.rename(columns={"Qty":"NQty"}, inplace=True)
    print("POrder")
    print(POrder)

    if TType=="B":
        LTO = df[(df["Order"].isin(RPOrder)) & (df["OType"]=="T") & (df["Price"]==OPrice)][["Order","Qty"]].groupby(["Order"]).sum().reset_index()
    else:
        LTO = df[(df["BS"].isin(RPOrder)) & (df["OType"]=="T") & (df["Price"]==OPrice)][["BS","Qty"]].groupby(["BS"]).sum().reset_index()

    LTO.rename(columns={"Qty":"TQty"}, inplace=True)
    print("LTO")
    print(LTO)

    PTOrder = pd.merge(POrder,LTO,how="left")
    PTOrder["TQty"] = PTOrder["TQty"].replace(np.nan, 0)

    PTOrder["RQty"] = PTOrder["NQty"] - PTOrder["TQty"]

    print("PTOrder")
    print(PTOrder)

    
    RPTOrder = PTOrder[PTOrder["RQty"]>0]
    print("RPTOrder")
    print(RPTOrder)

    print(RPTOrder["RQty"].sum())


# print(OPrice)
# # new order Less than our order id 

# LNO = list(CName.find({"$and":[{"Price":OPrice},{"TStamp":{ "$lt": bson.Int64(TStamp)}},{"BS": TType},{"Order": { "$lt": bson.Int64(OrdID)}}]}))

# LOrder = ([d["Order"] for d in (LNO)])
# print("New order of Specific Price: ", len(LOrder)) 

# # print([item for item,count in collections.Counter(LOrder).items() if(count>2)])


# # Cancel Order remove from order list

# LXO = list(CName.find({"$and":[{"OType":"X"},{"Order":{"$in": LOrder}}]}))

# XOrder = ([d["Order"] for d in (LXO)])

# # After removal of Cancel Order 
# LOrder = list(set(LOrder) - set(XOrder))

# print("After removal of Cancel Order: ", len(LOrder)) 
# # print(LOrder)
# # Modified Quantity

# LMO = CName.aggregate([{ "$match": { "$and" : [ {"OType":"M"},{"Order": {"$in": LOrder}}]}},{"$group":{"_id":"$Order", "SNO": {"$max":"$SNO"}}}])
# LMO = list(LMO)
# MOrder = ([d["_id"] for d in (LMO)])
# MSNo = ([d["SNO"] for d in (LMO)])

# LOrder = list(set(LOrder) - set(MOrder))
# print("After removal of Modified Order: ", len(LOrder)) 

# MRQty = []
# TMTQty = []
# for SN in range(len(MSNo)):

#     MTQty = list(CName.aggregate([ { "$match": { "$and" : [ {"OType":"T"},{"Order":MOrder[SN]},{"SNO": { "$gt": MSNo[SN]}}] } }, { "$group": { "_id" : "$Order", "MTTQ": { "$sum": "$Qty" } } } ]))
#     MNQty = list(CName.find({"OType":"M","Order":MOrder[SN],"SNO": MSNo[SN]}))

#     # print(MOrder[SN])
#     # MPNQty = list(CName.find({"$and":[{"OType":"N"},{"Order":MOrder[SN]},{"SNO": {"$lt": MSNo[SN]}}]}))

#     MNQ = [Q["Qty"] for Q in MNQty][0]
#     MTS = [T["TStamp"] for T in MNQty][0]
#     MPC = [P["Price"] for P in MNQty][0]
#     # MPNQ = [Q["Qty"] for Q in MPNQty][0]

#     if (len((MTQty))>0) :

#         MTQ = [Q["MTTQ"] for Q in MTQty][0]
#         TMTQty.append(MTQ) 

#         # if (MNQ<=MTQ) or (MPNQ<MNQ) or (MTS>TStamp) or (MPC!=OPrice):
#         if (MNQ<=MTQ) or ((MTS>TStamp)) :
#             MRQty.append(0)
#         else:
#             MRQty.append(MNQ-MTQ)

#     else: 
#         TMTQty.append(0)
#         if ((MTS>TStamp)):
#             MRQty.append(0)
#         else:
#             MRQty.append(MNQ)
        
# # Fully Modified Traded order id
# B = [MOrder[j] for j in range(len(MRQty)) if (MRQty[j]==0)]

# # After removal of Fully Modified Traded Order

# FMOrder = list(set(MOrder)-set(B))

# # Traded Order Quantity

# if TType=="B":
#     TTQ = list(CName.aggregate([ { "$match": { "$and" : [ {"OType":"T"},{"Order": { "$in": LOrder}}] } }, { "$group": { "_id" : "$Order", "TTQ": { "$sum": "$Qty" } } } ]))
# else:
#     TTQ = list(CName.aggregate([ { "$match": { "$and" : [ {"OType":"T"},{"BS": { "$in": LOrder}}] } }, { "$group": { "_id" : "$Order", "TTQ": { "$sum": "$Qty" } } } ]))

# TQty = ([d["TTQ"] for d in (TTQ)])
# TOrder = ([bson.Int64(d["_id"]) for d in (TTQ)])

# TNQ = list(CName.find({ "$and" : [ {"OType":"N"},{"Order": { "$in": LOrder}}]}))
# NQty = ([d["Qty"] for d in (TNQ)])
# FLOrder = ([d["Order"] for d in (TNQ)])

# FNQty = [NQty[FLOrder.index(LOrder[i])] for i in range(len(LOrder))]

# TTQty = [TQty[TOrder.index(LOrder[i])] if (LOrder[i] in TOrder) else 0 for i in range(len(LOrder))]

# RQty = [(NQ-TQ) if (NQ>TQ) else 0 for (TQ,NQ) in zip(TTQty,FNQty)]

# # Fully Traded order id
# A = [LOrder[j] for j in range(len(RQty)) if (RQty[j]<=0)]

# # After removal of Fully Traded Order

# FROrder = list(set(LOrder)-set(A))

# print("After removal of Fully Traded Order: ", len(FROrder))


# print("Total Pending Order: ",(len(FROrder)+len(FMOrder)))


# print("Pending Quntity: ",(sum(RQty)+sum(MRQty)))