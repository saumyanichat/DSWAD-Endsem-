import requests
import pandas as pd

url = "https://store.steampowered.com/appreviews/730?json=1"

response = requests.get(url)

data = response.json()

#get only review list
reviews = data['reviews']

all_reviews = []

for i in range(5):
        review = reviews[i]
        
        customer_name = review["author"]["steamid"]
        comment = review["review"]
        
        if review["voted_up"]:
            rating = "Positive"
            tags = "Recommended"
        else:
            rating = "Negative"
            tags = "Not Recommended"
            
        all_reviews.append({
            "Customer Name": customer_name,
            "Comment": comment,
            "Rating": rating,
            "Tags": tags
        })

df = pd.DataFrame(all_reviews)

df.to_csv("steam_reviews", index=False)

print(df)

print("\nCSV File Successful")