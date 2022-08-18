import pymongo
from datetime import datetime
import bson 

print(datetime.now())

TokenNo = "14111"
OrdID = "1200000008122210"


db_connect = pymongo.MongoClient('192.168.100.22', 27017)
for db in db_connect.list_databases():
    for coll in db_connect[db["name"]].list_collection_names():
        if (coll==("T"+TokenNo)):
            DBName = db["name"]
            ColName = coll
            break

print("DBName: ",DBName," ColName: ",ColName)

CName = db_connect[DBName][ColName]


NO = CName.find({"OType":"N","Order": bson.Int64(OrdID)})

OPrice=0
for data in NO:
    TStamp = data["TStamp"]
    OPrice = data["Price"]
    TType = data["BS"]

print(OPrice)
# new order Less than our order id 

LNO = CName.find({"OType":"N","Price":OPrice,"BS": TType,"Order": { "$lt": bson.Int64(OrdID)}})

LOrder = []
for data in LNO:
    LOrder.append(bson.Int64(data["Order"]))

print(len(LOrder))

# Traded Order Quantity

if TType=="B":
    TTQ = CName.aggregate([ { "$match": { "$and" : [ {"OType":"T"},{"Order": { "$in": LOrder}}] } }, { "$group": { "_id" : "0", "TTQ": { "$sum": "$Qty" } } } ])
else:
    TTQ = CName.aggregate([ { "$match": { "$and" : [ {"OType":"T"},{"BS": { "$in": LOrder}}] } }, { "$group": { "_id" : "0", "TTQ": { "$sum": "$Qty" } } } ])


TTQty = 0
for data in TTQ:
    TTQty = data["TTQ"]
    print("TTQ: ",data)

# Cancel Order remove from order list

LXO = CName.find({"OType":"X","Order":{"$in": LOrder}})

for data in LXO:
    if data["Order"] in LOrder:
        LOrder.remove(bson.Int64(data["Order"]))

print(len(LOrder))


# Modified
LMO = CName.aggregate([{ "$match": { "$and" : [ {"OType":"M"},{"Order": {"$in": LOrder}}]}},{"$group":{"_id":"$Order", "SNO": {"$max":"$SNO"}}}])
MSNo = []
for data in LMO:
    MSNo.append(bson.Int64(data["SNO"]))
    LOrder.remove(bson.Int64(data["_id"]))

print(len(LOrder))

TMQ = CName.aggregate([ { "$match": { "$and" : [ {"OType":"M"},{"Price": OPrice},{"BS": TType},{"SNO": { "$in": MSNo}}] } }, { "$group": { "_id" : "0", "TMQ": { "$sum": "$Qty" } } } ])

TMQty = 0
for data in TMQ:
    TMQty = data["TMQ"]
    print("TMQ: ",data)

# New Order
TNQ = CName.aggregate([ { "$match": { "$and" : [ {"OType":"N"},{"Price": OPrice},{"BS": TType},{"Order": { "$in": LOrder}}] } }, { "$group": { "_id" : "0", "TNQ": { "$sum": "$Qty" } } } ])

TNQty = 0
for data in TNQ:
    TNQty = data["TNQ"]
    print("TNQ: ",data)

print("Pending Quntity: ",(TNQty+TMQty-TTQty))
