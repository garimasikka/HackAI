from src.agents.functions import available_products, discounted_products, similar_products
from src.utils.notify import send_notification
from twilio.rest import Client
from transformers import pipeline
import keys 

##################
prod1 = {"name":"blue_navy_t-shirt", "stock_count":2}
prod2 = {"name":"midnight_dress", "stock_count":12}
wishlist_products = [prod1, prod2] #prod1 and prod2 are objects of userid in wishlists
##################

##################
main_product = {"name":"navy_t-shirt", "stock_count":2, "color":"black", "product_type":"MO2", "discount_price":9, "price":90}
prod1 = {"name":"black_shirt", "stock_count":2, "color":"black", "product_type":"MS2", "discount_price":99, "price":1000}
prod2 = {"name":"white_midnight_dress", "stock_count":0, "color":"white", "product_type":"MO3", "discount_price":299, "price":67}
prod3 = {"name":"blacky", "stock_count":4, "color":"black", "product_type":"MM2", "discount_price":31, "price":11}
products_list = [prod1, prod2, prod3] #prod1 and prod2 are objects of userid in wishlists
##################

# available_products(wishlist_products)
# discounted_products(products_list)
similar_products(main_product, products_list)



send_notification(products_list, 'available_products')
send_notification(products_list, 'discounted_products')

# ML Model

distilled_student_sentiment_classifier = pipeline(
    model="lxyuan/distilbert-base-multilingual-cased-sentiments-student",
    return_all_scores=True
)

distilled_student_sentiment_classifier("Running very fast this laptop") # add reviews

