
import csv
import urllib
from os import path

taburl =[]

with open('tco-metro-lignes-pictogrammes-dm.csv', 'rb') as csvfile:
     spamreader = csv.reader(csvfile, delimiter=';', quotechar='|')
     for col1,ligne_num,col3,resol,img_url in spamreader:
         if resol == '1:100':
             taburl.append((ligne_num,img_url))

#f=urllib2.urlopen(taburl[-1])
#print f.read()
#print type(taburl[5][1])
#print taburl[5][0]


for (nom,url) in taburl[1:]:
    #print col1
    #print (col5,col1+'.png')
    #print col5
    testfile=urllib.URLopener()
    testfile.retrieve(url,nom+'.png')
