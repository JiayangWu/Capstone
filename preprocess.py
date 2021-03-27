import pandas as pd

df = pd.read_csv("data/video_games.csv")

year = df.Year

# print(min(year), max(year))

# l = []
# for y in range(1980, 2021):
#     l.append(str(y))

# print(l)

# '''['1980', '1981', '1982', '1983', '1984', '1985', '1986', '1987', '1988', '1989', '1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020']
# '''
from collections import defaultdict
Other_Genre2Total = defaultdict(int)
for index, row in df.iterrows():
    # print(row)
    Other_Genre2Total[row['Genre']] += row['Other_Sales']

res = []
for genre, count in Other_Genre2Total.items():
    res.append({"Genre": genre, "count":str(count)})

print({"Other":res})
# defaultdict(<class 'int'>, {'Sports': 683.3499999999967, 'Platform': 447.0499999999991, 'Racing': 359.41999999999774, 'Role-Playing': 327.279999999999, 'Puzzle': 123.78000000000009, 'Misc': 410.23999999999904, 'Shooter': 582.599999999995, 'Simulation': 183.31000000000068, 'Action': 877.8299999999916, 'Fighting': 223.59000000000017, 'Adventure': 105.79999999999998, 'Strategy': 68.70000000000019})

# print(NA_Genre2Total)

# JP_Genre2Total = defaultdict(int)
# for index, row in df.iterrows():
#     # print(row)
#     JP_Genre2Total[row['Genre']] += row['JP_Sales']
# print(JP_Genre2Total)

# defaultdict(<class 'int'>, {'Sports': 135.3700000000004, 'Platform': 130.77000000000012, 'Racing': 56.69000000000002, 'Role-Playing': 352.3099999999979, 'Puzzle': 57.30999999999997, 'Misc': 107.75999999999995, 'Shooter': 38.28000000000007, 'Simulation': 63.70000000000007, 'Action': 159.95000000000087, 'Fighting': 87.35000000000014, 'Adventure': 52.0700000000003, 'Strategy': 49.46000000000003})

# EU_Genre2Total = defaultdict(int)
# for index, row in df.iterrows():
#     # print(row)
#     EU_Genre2Total[row['Genre']] += row['EU_Sales']
# print(EU_Genre2Total)

# defaultdict(<class 'int'>, {'Sports': 376.84999999999457, 'Platform': 201.63000000000017, 'Racing': 238.39000000000024, 'Role-Playing': 188.06000000000031, 'Puzzle': 50.77999999999998, 'Misc': 215.98000000000036, 'Shooter': 313.2699999999967, 'Simulation': 113.3800000000002, 'Action': 524.9999999999854, 'Fighting': 101.32000000000025, 'Adventure': 64.13000000000008, 'Strategy': 45.34000000000005})

# Other_Genre2Total = defaultdict(int)
# for index, row in df.iterrows():
#     # print(row)
#     Other_Genre2Total[row['Genre']] += row['Other_Sales']
# print(Other_Genre2Total

# defaultdict(<class 'int'>, {'Sports': 134.96999999999758, 'Platform': 51.589999999999776, 'Racing': 77.27000000000116, 'Role-Playing': 59.60999999999999, 'Puzzle': 12.549999999999935, 'Misc': 75.32000000000136, 'Shooter': 102.69000000000112, 'Simulation': 31.520000000000294, 'Action': 187.3799999999972, 'Fighting': 36.67999999999998, 'Adventure': 16.810000000000024, 'Strategy': 11.359999999999932})

