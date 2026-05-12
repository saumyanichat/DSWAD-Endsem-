import requests
from bs4 import BeautifulSoup
import pandas as pd

url = "https://webscraper.io/test-sites/e-commerce/static"

response = requests.get(url)

soup = BeautifulSoup(response.text, "html.parser")

products = soup.find_all("div", class_="thumbnail")

data = []

for product in products:

    # Clean product name
    product_name = product.find("a", class_="title").text.strip()

    # Clean description
    description = product.find("p", class_="description").text.strip()

    price = product.find("span", itemprop="price").text

    # Correct rating
    rating = len(product.find_all("span", class_="ws-icon-star"))

    # Tags
    if rating >= 4:
        tags = "Good"
    else:
        tags = "Average"

    data.append({"Product Name":product_name, "Description":description, "Price":price, "Rating":rating, "Tags":tags})

df = pd.DataFrame(data)

df.to_csv("reviews.csv", index=False)

print(df)