import pymongo
from datetime import datetime
import bson 

print(datetime.now())

TokenNo = "8110"
OrdID = "1000000017079382"


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

LNO = CName.find({"OType":"N","Price":OPrice,"BS": TType,"Order": { "$lt": bson.Int64(OrdID)}},{"_id":0,"Order":1})
LOrder = ([d["Order"] for d in list(LNO)])
print("New order of Specific Price: ", len(LOrder)) 

# Cancel Order remove from order list

LXO = CName.find({"OType":"X","Order":{"$in": LOrder}},{"_id":0,"Order":1})
XOrder = ([d["Order"] for d in list(LXO)])

# After removal of Cancel Order 
LOrder = list(set(LOrder) - set(XOrder))
print("After removal of Cancel Order: ", len(LOrder)) 

# Modified Quantity

LMO = CName.aggregate([{ "$match": { "$and" : [ {"OType":"M"},{"Order": {"$in": LOrder}}]}},{"$group":{"_id":"$Order", "SNO": {"$max":"$SNO"}}}])
LMO = list(LMO)
MOrder = ([d["_id"] for d in (LMO)])
MSNo = ([d["SNO"] for d in (LMO)])

print(MOrder)

LOrder = list(set(LOrder) - set(MOrder))
print("After removal of Modified Order: ", len(LOrder)) 

MRQty = []

for SN in range(len(MSNo)):

    MTQty = list(CName.aggregate([ { "$match": { "$and" : [ {"OType":"T"},{"Order":MOrder[SN]},{"SNO": { "$gt": MSNo[SN]}}] } }, { "$group": { "_id" : "$Order", "MTTQ": { "$sum": "$Qty" } } } ]))
    MNQty = list(CName.find({"OType":"M","Order":MOrder[SN],"SNO": MSNo[SN]}))
    MNQ = [Q["Qty"] for Q in MNQty][0]

    if (len((MTQty))>0):

        MTQ = [Q["MTTQ"] for Q in MTQty][0]
        

        if MNQ<MTQ:
            MRQty.append(0)
        else:
            MRQty.append(MNQ-MTQ)

    else: 
        MRQty.append(MNQ)

# Fully Modified Traded order id
B = [MOrder[j] if (MRQty[j]<=0) else 0 for j in range(len(MRQty))]

# After removal of Fully Modified Traded Order

MOrder = list(set(MOrder)-set(B))

print(len(MOrder))
print(len(MRQty))

# Traded Order Quantity

if TType=="B":
    TTQ = CName.aggregate([ { "$match": { "$and" : [ {"OType":"T"},{"Order": { "$in": LOrder}}] } }, { "$group": { "_id" : "$Order", "TTQ": { "$sum": "$Qty" } } } ])
else:
    TTQ = CName.aggregate([ { "$match": { "$and" : [ {"OType":"T"},{"BS": { "$in": LOrder}}] } }, { "$group": { "_id" : "$Order", "TTQ": { "$sum": "$Qty" } } } ])

TTQ = list(TTQ)

TQty = ([d["TTQ"] for d in (TTQ)])
TOrder = ([bson.Int64(d["_id"]) for d in (TTQ)])


TNQ = CName.aggregate([ { "$match": { "$and" : [ {"OType":"N"},{"Order": { "$in": LOrder}}] } }, { "$group": { "_id" : "$Order", "TNQ": { "$sum": "$Qty" } } } ])
NQty = ([d["TNQ"] for d in (TNQ)])

TTQty = [TQty[TOrder.index(LOrder[i])] if (LOrder[i] in TOrder) else 0 for i in range(len(NQty))]

RQty = [(NQ-TQ) if NQ>TQ else 0 for (TQ,NQ) in zip(TTQty,NQty)]

# Fully Traded order id
A = [LOrder[j] if (RQty[j]<=0) else 0 for j in range(len(RQty))]

# After removal of Fully Traded Order

LOrder = list(set(LOrder)-set(A))

# LOrder = LOrder + MOrder
# RQty = RQty + MRQty
print("After removal of Fully Traded Order: ", len(LOrder))


# Modified Quantity
# LMO = CName.aggregate([{ "$match": { "$and" : [ {"OType":"M"},{"Order": {"$in": LOrder}}]}},{"$group":{"_id":"$Order", "SNO": {"$max":"$SNO"}}}])
# MSNo = []
# for data in LMO:
#     MSNo.append(bson.Int64(data["SNO"]))
#     LOrder.remove(bson.Int64(data["_id"]))


# TMQ = CName.aggregate([ { "$match": { "$and" : [ {"OType":"M"},{"BS": TType},{"SNO": { "$in": MSNo}}] } }, { "$group": { "_id" : "0", "TMQ": { "$sum": "$Qty" } } } ])

# TMQty = 0
# for data in TMQ:
#     TMQty = data["TMQ"]
#     print("TMQ: ",data)

# WTNQ = CName.aggregate([ { "$match": { "$and" : [ {"OType":"N"},{"BS": TType},{"Order": { "$in": LOrder}}] } }, { "$group": { "_id" : "0", "WTNQ": { "$sum": "$Qty" } } } ])

# WTNQty = 0
# for data in WTNQ:
#     WTNQty = data["WTNQ"]
#     print("WTNQ: ",data)

print("Total Pending Order: ",(len(LOrder)+len(MOrder)))
print("Pending Quntity: ",(sum(RQty)+sum(MRQty)))
