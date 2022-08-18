from typing import List, Any
import os
import pandas as pd
import glob

from datetime import datetime

import openpyxl
from openpyxl.styles import PatternFill

Result = pd.DataFrame()
FResult = pd.DataFrame()

CreFile = "C:\\Users\\Sachin\\Desktop\\DEVELOPMENT\\Python\\Bhavcopy" +  "/*.csv"

Filename = glob.glob(CreFile, recursive = True)

total = {}

j=0

def color_rule(val):
    global j
    VarD = FResult.iloc[j]
    j = j + 1

    clist = []
    for x in VarD:
        if x>20:
            clist.append('background-color: red')
        elif x>15:
            clist.append('background-color: orange')
        elif x>10:
            clist.append('background-color: yellow')
        else:
            clist.append('background-color: None')           

              
    return clist


if __name__ == '__main__':

    Acc_File = os.path.isfile('./' + "OptionDataPer.csv")

    if Acc_File == True:

        FResultPerT2 = pd.read_csv("OptionDataPer.csv")

        CheckFinal: list[Any] = list(FResultPerT2.groupby("Expiry"))

        for i in range(0, len(CheckFinal)):

            MeanDf = CheckFinal[i][1].set_index("Date").drop(["Expiry"], axis=1).expanding().mean()
            Bothdf = pd.concat([CheckFinal[i][1].set_index("Date"), MeanDf]).reset_index().groupby("Date")

            CalDf = ((((Bothdf.first().drop(["Expiry"], axis=1)) - (Bothdf.last().drop(["Expiry"], axis=1)))*100)/(Bothdf.last().drop(["Expiry"], axis=1)))

            GDF = CalDf[((((Bothdf.first().drop(["Expiry"], axis=1)) - (Bothdf.last().drop(["Expiry"], axis=1)))*100)/(Bothdf.last().drop(["Expiry"], axis=1))) > 0]

            FResult = pd.concat([FResult, GDF])

        FResult = FResult.fillna(-1)

        # FResult.to_excel('styled8.xlsx', engine='openpyxl')
        # print(FResult)

        CRes = FResultPerT2.set_index("Date").drop(["Expiry"], axis=1)
        html_column = CRes.style.apply(color_rule, axis=1)

        print(html_column)
        
        html_column.to_excel('styled2.xlsx', engine='openpyxl')

    else:

        for file in Filename:

            if ("bhav" in file):
                # print(file)
                bpd = pd.read_csv(file)

                bpd.drop(
                    ["OPEN", "HIGH", "LOW", "CONTRACTS", "VAL_INLAKH", "OPEN_INT", "CHG_IN_OI"],
                    axis=1, inplace=True)

                gbpd = list(bpd.groupby(["SYMBOL", "INSTRUMENT"]))

                # FUTURE

                FDf = gbpd[0::2]
                FLDf = list(list(zip(*FDf))[1])
                FTDf = pd.concat(FLDf).groupby("SYMBOL").first()

                # FTDf.rename(columns={'SETTLE_PR': 'Date'}, inplace=True)

                # OPTION

                ODf = gbpd[1::2]
                OLDf = list(list(zip(*ODf))[1])
                OTDf1 = pd.concat(OLDf).set_index("SYMBOL")

                OTDf1.rename(columns={'SETTLE_PR': 'OSETTLE_PR'}, inplace=True)

                OTDf1 = OTDf1.join(FTDf["SETTLE_PR"])

                OTDf1["SSD"] = OTDf1["STRIKE_PR"] - OTDf1["SETTLE_PR"]

                OTDf1["SSD"] = OTDf1["SSD"].abs()

                ESeries = FTDf["EXPIRY_DT"].iloc[0]  # Expiry
                DS = (FTDf["TIMESTAMP"].iloc[0])     # DAY
    #
                DSeries = (datetime.strptime(DS, '%d-%b-%Y').strftime('%Y%m%d'))
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

                ResultPer["Expiry"] = (datetime.strptime(ESeries, '%d-%b-%Y').strftime('%Y%m%d'))

                total[DSeries] = ResultPer

                # print(ResultPer)

                MIndex = [[DSeries, DSeries, DSeries], ["ATM_PR", "SETTLE_PR", "Percentage"]]

                tuples = list(zip(*MIndex))

                Index = pd.MultiIndex.from_tuples(tuples, names=["first", "second"])

                Result1 = pd.DataFrame([ResultP, ResultS, ResultPer], index=Index)

                Result = pd.concat([Result, Result1])

        FResultPer = pd.DataFrame(total).reset_index().set_index("SYMBOL")

        FResultPerT = FResultPer.T

        FResultPerT = FResultPerT.reset_index()
        FResultPerT.rename(columns={'index': 'Date'}, inplace=True)
        FResultPerT = FResultPerT.fillna(0)
        FResultPerT = FResultPerT.sort_values(by=['Date'])

        FResultPerT = FResultPerT.set_index("Date")

        Result.to_csv("OptionData.csv")
        FResultPerT.to_csv("OptionDataPer.csv")

        FResultPerT2 = pd.read_csv("OptionDataPer.csv")

        CheckFinal: list[Any] = list(FResultPerT2.groupby("Expiry"))

        for i in range(0, len(CheckFinal)):
            MeanDf = CheckFinal[i][1].set_index("Date").drop(["Expiry"], axis=1).expanding().mean()
            Bothdf = pd.concat([CheckFinal[i][1].set_index("Date"), MeanDf]).reset_index().groupby("Date")

            CalDf = ((((Bothdf.first().drop(["Expiry"], axis=1)) - (Bothdf.last().drop(["Expiry"], axis=1)))*100)/(Bothdf.last().drop(["Expiry"], axis=1)))

            GDF = CalDf[((((Bothdf.first().drop(["Expiry"], axis=1)) - (Bothdf.last().drop(["Expiry"], axis=1)))*100)/(Bothdf.last().drop(["Expiry"], axis=1))) > 0]

            FResult = pd.concat([FResult, GDF])

        FResult = FResult.fillna(-1)

        CRes = FResultPerT2.set_index("Date").drop(["Expiry"], axis=1)
        html_column = CRes.style.apply(color_rule, axis=1)

        print(html_column)
        #
        html_column.to_excel('styled2.xlsx', engine='openpyxl')
