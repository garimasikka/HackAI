from twilio.rest import Client
import keys

def send_notification(products_list, message_type):
    client = Client(keys.account_sid, keys.auth_token)
    message_body = "\n"
    if message_type == "available_products":
        available_products = [product for product in products_list if product["countInStock"] > 0]
        if available_products:
            product_details = "\n".join([f'{product["name"]} (Stock: {product["countInStock"]})' for product in available_products])
            message_body += "Hello! Here are the available products:\n" + product_details

    elif message_type == "discounted_products":
        discounted_products = [product for product in products_list if product["countInStock"] > 0 and product.get("discountedPrice") and product["discountedPrice"] < product["price"]]
        if discounted_products:
            product_details = "\n".join([f'{product["name"]}: Was ${product["price"]}, Now ${product["discount_price"]}' for product in discounted_products])
            message_body += "Great news! Check out these discounted products:\n" + product_details

    if message_body:
        try:
            message = client.messages.create(
                body=message_body,
                from_=keys.twilio_number,
                to=keys.target_number
            )
            return "Message sent successfully: " + message.sid
        except Exception as e:
            return f"Error sending message: {e}"
    else:
        return "No products to notify about"