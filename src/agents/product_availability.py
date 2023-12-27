from src.utils.notify import send_notification

##################
prod1 = {"name":"blue_navy_t-shirt", "stock_count":2}
prod2 = {"name":"midnight_dress", "stock_count":0}
wishlist_products = [prod1, prod2] #prod1 and prod2 are objects of userid in wishlists
##################


def product_availability():  
    available_products = []
    for product in wishlist_products:
        if product["stock_count"]>0:
            available_products.append(product)
    print(send_notification(available_products, "products_availability"))
