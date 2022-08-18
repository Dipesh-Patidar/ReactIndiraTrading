import pymongo
from datetime import datetime
import bson 
import collections
import pandas as pd
import time

print(datetime.now())

TokenNo = "17801"
OrdID = "1200000006699709"


db_connect = pymongo.MongoClient('192.168.100.22', 27017)
for db in db_connect.list_databases():
    for coll in db_connect[db["name"]].list_collection_names():
        if (coll==("T"+TokenNo)):
            DBName = db["name"]
            ColName = coll
            break

print("DBName: ",DBName," ColName: ",ColName)

CName = db_connect[DBName][ColName]


NO = CName.find_one({"OType":"N","Order": bson.Int64(OrdID)})
print(NO)
# OPrice=0
# for data in NO:
TStamp = NO["TStamp"]
OPrice = NO["Price"]
TType = NO["BS"]

print(OPrice)
# new order Less than our order id 

LNO = list(CName.find({"$and":[{"OType":"N"},{"Price":OPrice},{"TStamp":{ "$lt": bson.Int64(TStamp)}},{"BS": TType},{"Order": { "$lt": bson.Int64(OrdID)}}]}))

LOrder = ([d["Order"] for d in (LNO)])
print("New order of Specific Price: ", len(LOrder)) 

# print([item for item,count in collections.Counter(LOrder).items() if(count>2)])


# Cancel Order remove from order list

LXO = list(CName.find({"$and":[{"OType":"X"},{"Order":{"$in": LOrder}}]}))

XOrder = ([d["Order"] for d in (LXO)])

# After removal of Cancel Order 
LOrder = list(set(LOrder) - set(XOrder))

print("After removal of Cancel Order: ", len(LOrder)) 
# print(LOrder)
# Modified Quantity

LMO = CName.aggregate([{ "$match": { "$and" : [ {"OType":"M"},{"Order": {"$in": LOrder}}]}},{"$group":{"_id":"$Order", "SNO": {"$max":"$SNO"}}}])
LMO = list(LMO)
MOrder = ([d["_id"] for d in (LMO)])
MSNo = ([d["SNO"] for d in (LMO)])

LOrder = list(set(LOrder) - set(MOrder))
print("After removal of Modified Order: ", len(LOrder)) 

MRQty = []
TMTQty = []
for SN in range(len(MSNo)):

    MTQty = list(CName.aggregate([ { "$match": { "$and" : [ {"OType":"T"},{"Order":MOrder[SN]},{"SNO": { "$gt": MSNo[SN]}}] } }, { "$group": { "_id" : "$Order", "MTTQ": { "$sum": "$Qty" } } } ]))
    MNQty = list(CName.find({"OType":"M","Order":MOrder[SN],"SNO": MSNo[SN]}))

    MPNQty = list(CName.find({"$and":[{"OType":"N"},{"Order":MOrder[SN]},{"SNO": {"$lt": MSNo[SN]}}]}))

    MNQ = [Q["Qty"] for Q in MNQty][0]
    MTS = [T["TStamp"] for T in MNQty][0]
    MPC = [P["Price"] for P in MNQty][0]
    MPNQ = [Q["Qty"] for Q in MPNQty][0]

    if (len((MTQty))>0) :

        MTQ = [Q["MTTQ"] for Q in MTQty][0]
        TMTQty.append(MTQ) 

        if (MNQ<MTQ) or (MPNQ<MNQ) or (MTS>TStamp) or (MPC!=OPrice):
            MRQty.append(0)
        else:
            MRQty.append(MNQ-MTQ)

    else: 
        TMTQty.append(0)
        if (MPNQ<MNQ) or (MTS>TStamp) or (MPC!=OPrice):
            MRQty.append(0)
        else:
            MRQty.append(MNQ)
        

# Fully Modified Traded order id
B = [MOrder[j] for j in range(len(MRQty)) if (MRQty[j]==0)]

# After removal of Fully Modified Traded Order

FMOrder = list(set(MOrder)-set(B))

# Traded Order Quantity

if TType=="B":
    TTQ = list(CName.aggregate([ { "$match": { "$and" : [ {"OType":"T"},{"Order": { "$in": LOrder}}] } }, { "$group": { "_id" : "$Order", "TTQ": { "$sum": "$Qty" } } } ]))
else:
    TTQ = list(CName.aggregate([ { "$match": { "$and" : [ {"OType":"T"},{"BS": { "$in": LOrder}}] } }, { "$group": { "_id" : "$Order", "TTQ": { "$sum": "$Qty" } } } ]))

TQty = ([d["TTQ"] for d in (TTQ)])
TOrder = ([bson.Int64(d["_id"]) for d in (TTQ)])

TNQ = list(CName.find({ "$and" : [ {"OType":"N"},{"Order": { "$in": LOrder}}]}))
NQty = ([d["Qty"] for d in (TNQ)])
FLOrder = ([d["Order"] for d in (TNQ)])

FNQty = [NQty[FLOrder.index(LOrder[i])] for i in range(len(LOrder))]

TTQty = [TQty[TOrder.index(LOrder[i])] if (LOrder[i] in TOrder) else 0 for i in range(len(LOrder))]

RQty = [(NQ-TQ) if (NQ>TQ) else 0 for (TQ,NQ) in zip(TTQty,FNQty)]


print(RQty)

# Fully Traded order id
A = [LOrder[j] for j in range(len(RQty)) if (RQty[j]<=0)]

# After removal of Fully Traded Order

FROrder = list(set(LOrder)-set(A))

print("After removal of Fully Traded Order: ", len(FROrder))


print("Total Pending Order: ",(len(FROrder)+len(FMOrder)))


print("Pending Quntity: ",(sum(RQty)+sum(MRQty)))

# "Script":[sym]
# "OType":["B"]
# "Price":[0]

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

for j in range(len(MSNo)):
    RO = CName.find_one({"OType":"M","SNO": bson.Int64(MSNo[j])})
    if(MRQty[j]>0):
        epoch = int(int(RO["TStamp"])/1000000)
        Pepoch = (time.strftime('%H:%M:%S', time.localtime(epoch)))
        POdf.loc[k] = [k,Pepoch,RO["Order"],RO["Qty"],TMTQty[j],MRQty[j]]
        k = k + 1

print(POdf)

db_connect.close()
