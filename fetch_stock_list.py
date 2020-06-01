from urllib.request import urlopen

# this list will be sent
stocks = []

# ------------------------------ nasdaqlisted.txt ------------------------------
nasdaqFile = urlopen("ftp://ftp.nasdaqtrader.com/symboldirectory/nasdaqlisted.txt")
nasdaqlisted = nasdaqFile.readlines()

# Symbol|Security Name|Market Category|Test Issue|Financial Status|Round Lot Size|ETF|NextShares
for line in nasdaqlisted[1:-1]: #skip first and last line
    lineStr = line.decode('utf-8', 'ignore')
    lineStrList = lineStr.replace("\r","").replace("\n","").split("|")

    if (lineStrList[3] == "N"): # test issue "Y" is used by nasdaq for testing
        stocks.append({ "symbol":lineStrList[0], "name":lineStrList[1], "exchange":"NASDAQ"})

# ------------------------------ otherlisted.txt ------------------------------
othersFile = urlopen('ftp://ftp.nasdaqtrader.com/symboldirectory/otherlisted.txt')
otherlisted = othersFile.readlines()

# https://www.nasdaqtrader.com/Trader.aspx?id=SymbolDirDefs#other
# A = NYSE MKT
# N = New York Stock Exchange (NYSE)
# P = NYSE ARCA
# Z = BATS Global Markets (BATS)
# V = Investors' Exchange, LLC (IEXG)
exchangeMap = {"A":"NYSE MKT", "N":"NYSE", "P":"NYSE ARCA", "Z":"BATS", "V":"IEXG"}

# ACT Symbol|Security Name|Exchange|CQS Symbol|ETF|Round Lot Size|Test Issue|NASDAQ Symbol
for line in otherlisted[1:-1]: #skip first and last line
    lineStr = line.decode('utf-8', 'ignore')
    lineStrList = lineStr.replace("\r","").replace("\n","").split("|")

    if (lineStrList[6] == "N"):
        stocks.append({ "symbol":lineStrList[7], "name":lineStrList[1], \
            "exchange":exchangeMap[lineStrList[2]]})



print(stocks)
print(stocks[0])