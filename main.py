import os
import requests
from uagents import Agent, Context, Bureau
from src.utils.notify import send_notification
from src.utils.subscriptions import buy_subscribed_products
import pandas as pd


agent1 = Agent(name="product_available_notifier", seed="seed")
agent2 = Agent(name="product_discounts_notifier", seed="seed")
agent3 = Agent(name="subscribed_products_buyer", seed="seed")

user_id = 2 ##change

def get_data():
    try:
        response1 = requests.get("https://weak-ruby-rhinoceros-slip.cyclic.app/api/products")
        response1.raise_for_status()
        products_list = response1.json() ["products"]

        wishlist_products = response1.json()["products"] ##change immediately!!!!!!!!
        subscriptions = response1.json()["products"] ##change immediately!!!!!!!!

        # response2 = requests.get("https://weak-ruby-rhinoceros-slip.cyclic.app/api/wishlists/"+user_id) 
        # response2.raise_for_status()
        # wishlist_products = response2.json()

        # response3 = requests.get("https://weak-ruby-rhinoceros-slip.cyclic.app/api/subscriptions/"+user_id) 
        # response3.raise_for_status()
        # subscriptions = response3.json()
        return wishlist_products, products_list, subscriptions
    except:
        return "some error occured"


 
_, _, subscriptions = get_data()
subscription_period = 2 #change!!!
# subscription_period = int(subscriptions["duration"])*24*3600 ######ADD!
    
@agent1.on_event("startup")
async def initialize_storage(ctx: Context):
    ctx.storage.set("count", 0)

@agent2.on_event("startup")
async def initialize_storage(ctx: Context):
    ctx.storage.set("count", 0)

@agent3.on_event("startup")
async def initialize_storage(ctx: Context):
    ctx.storage.set("count", 0)

@agent1.on_interval(period=2)
async def available_products(ctx: Context):
    current_count = ctx.storage.get("count")
    ctx.storage.set("count", current_count + 1)
    if current_count<2:  
        wishlist_products, _, _ = get_data()
        available_products = []
        for product in wishlist_products:
            if product["countInStock"]>0:
                available_products.append(product)
        if available_products!=[]:
            print(send_notification(available_products, "available_products"))

@agent2.on_interval(period=2)
async def discounted_products(ctx: Context): 
    current_count = ctx.storage.get("count")
    ctx.storage.set("count", current_count + 1)
    if current_count<2:
        _, products_list, _ = get_data() 
        discounted_products = []
        for product in products_list:
            if product["countInStock"]>0 and product["discountedPrice"]:
                if product["discountedPrice"]<product["price"]:
                    discounted_products.append(product)
        if discounted_products!=[]:
            print(send_notification(discounted_products, "discounted_products"))

#buy every week 
@agent3.on_interval(period=subscription_period)
async def subscribed_products(ctx: Context): 
    current_count = ctx.storage.get("count")
    ctx.storage.set("count", current_count + 1)
    if current_count<2:  
        _, products_list, subscriptions = get_data()
        print(buy_subscribed_products(subscriptions))

def similar_products(main_product, products_list):
    similar_products=[]
    color = main_product["color"]
    features = list(main_product["product_type"])
    gender, size, type = features[0], features[1], features[2]
    for product in products_list:
        color_1 = product["color"]
        features_1 = list(product["product_type"])
        gender_1, size_1, type_1 = features_1[0], features_1[1], features_1[2]
        if color==color_1 and gender==gender_1 and type==type_1:
            similar_products.append(product)
    return similar_products

bureau = Bureau(port=8000, endpoint="http://localhost:8000/submit")
bureau.add(agent1)
bureau.add(agent2)
bureau.add(agent3)

if __name__ == "__main__":
    bureau.run()





