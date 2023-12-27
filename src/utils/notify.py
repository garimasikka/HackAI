def send_notification(available_products, message_type):
    if message_type == "products_availability":
        for product in available_products:
            print(product["name"])
        return "message sent successfully"
    else:
        return "some error occured"