def send_notification(products_list, message_type):
    if message_type == "available_products":
        for product in products_list:
            print(product["name"])
        return "message sent successfully"
    if message_type == "discounted_products":
        for product in products_list:
            print(product["name"], product["price"], product["discount_price"])
        return "message sent successfully"
    else:
        return "some error occured"