import pandas as pd
from datetime import datetime
import threading
import glob
import os 

print(datetime.now())


Filename = glob.glob('/home/dwh/tbt-ncash-str4/*.DAT', recursive = True)[0]

print(Filename)
date = Filename.split("_")[1]

size = int((os.path.getsize(Filename))/400)

LogFile = "StreamToken.CSV"

log_Ava = os.path.isfile('./'+LogFile)
if log_Ava==False:
    wlog =  open(LogFile,'w')
    wlog.close()

dataf=[]
th = []

def file_read(i, name):
    name= pd.read_csv(Filename,
                        names=["SNO", "TStamp", "Stream", "Exchange", "SN", "OType", "SNumber", "Order", "Token", "BS", "Price", "Qty"],
                        skiprows=i,
                        nrows=size)
    trend = name[(name["OType"].astype(str)=="N")].groupby(['Token'])
    print(trend)
    dftrend = pd.DataFrame(trend)
    dataf.append(dftrend)
    
    for col in dftrend.columns:
        print(col)

    print(dftrend)

for x in range(0,5):
    df = "df"+str(x)
    t = threading.Thread(target=file_read, args=((x*size), df))
    th.append(t)

for x in range(len(th)):
    th[x].start()

for x in range(len(th)):
    th[x].join()

result = pd.concat(dataf,ignore_index=True)
print(result[0])
Final =  result.groupby(0)
FinalR = pd.DataFrame(Final).reset_index()
stm = (list(FinalR[0]))
for x in range(0, len(stm)):
    wlog =  open(LogFile,'a')
    msg = "4_"+ str(stm[x])+ "\n"
    wlog.write(msg)
    wlog.close()
print(datetime.now())
