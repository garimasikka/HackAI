from src.utils.notify import send_notification

def available_products(wishlist_products):  
    available_products = []
    for product in wishlist_products:
        if product["stock_count"]>0:
            available_products.append(product)
    if available_products!=[]:
        print(send_notification(available_products, "available_products"))


def discounted_products(products_list):  
    discounted_products = []
    for product in products_list:
        if product["stock_count"]>0 and product["discount_price"]:
            if product["discount_price"]<product["price"]:
                discounted_products.append(product)
    print(discounted_products)
    if discounted_products!=[]:
        print(send_notification(discounted_products, "discounted_products"))


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