import glob
import os

CreFile = "/home/dwh/tbt-ncash-str"+str(1)+"/*.DAT"
Filename = glob.glob(CreFile, recursive = True)[0]

# Using readlines()
file1 = open(Filename, 'r')
Lines = file1.readlines()

count = 0
# Strips the newline character
for line in Lines:
	count += 1
	print("Line{}: {}".format(count, line.strip()))
	if count >100:
		break
