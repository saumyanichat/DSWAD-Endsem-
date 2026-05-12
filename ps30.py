import pandas as pd
from bs4 import BeautifulSoup
import requests

url = "https://books.toscrape.com/"

response = requests.get(url)

soup = BeautifulSoup(response.text, "html.parser")
books = soup.find_all("article", class_="product_pod")
data = []

for book in books:

    book_name = book.h3.a["title"]

    rating_class = book.p["class"][1]

    if rating_class == "One":
        rating = 1
    elif rating_class == "Two":
        rating = 2
    elif rating_class == "Three":
        rating = 3
    elif rating_class == "Four":
        rating = 4
    else:
        rating = 5

    price = book.find("p", class_="price_color").text.strip()

    availability = book.find("p", class_="instock availability").text.strip()

    if rating >= 4:
        tags = "Good"
    else:
        tags = "Average"

    data.append({
        "Book Name": book_name,
        "Rating": rating,
        "Price": price,
        "Availability": availability,
        "Tags": tags
    })

df = pd.DataFrame(data)

df.to_csv("test1.csv", index=False)

print(df)

print("Successfull")