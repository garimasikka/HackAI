def send_notification(products_list, message_type):
    if message_type == "available_products":
        return "message sent successfully"
    if message_type == "discounted_products":
        return "message sent successfully"
    else:
        return "some error occured"