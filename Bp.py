import yfinance as yf

bp = yf.Ticker("BP")
data = bp.history(start="1994-12-31", end="1998-12-31", interval="1wk")
print(data.head())
