# python Bhavdownload.py 20220605  20220617
from jugaad_data.nse import bhavcopy_save, bhavcopy_fo_save
from jugaad_data.holidays import holidays
import pandas as pd
from random import randint
import time
import sys

SDate = str(sys.argv[1])
EDate = str(sys.argv[2])

date_range = pd.bdate_range(start=SDate, end = EDate,
                    freq='C', holidays = holidays((2022)))

dates = [x.date() for x in date_range]

for date1 in dates:

    try:

      print(bhavcopy_fo_save(date1, "/home/OptionData"))
      time.sleep(1) 

    except:
        time.sleep(1)
        continue

