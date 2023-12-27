HACKAI - FETCH.AI

# Personal Shopping Assistant

Personal Shopping Assistant is a tool built using the Fetch.ai's uAgent library. It provides real-time tracking and alert functionality for different currency exchange rates. Users can set their base currency, select one or more foreign currencies to monitor, and set thresholds for alerts.

Link to uAgent Library: 
- [uAgents Github Repository](https://github.com/fetchai/uAgents)
- [uAgent Documentation](https://fetch.ai/docs)
- [uAgent Examples](https://github.com/fetchai/uAgents-examples)

| Features   | Description  |
| ------------- | ------------- |
|  Product Search  |Easily find products by typing in the search bar. The app provides a list of products based on your search text  |
| Product Recommendations  | Receive personalized product recommendations based on your preferences and purchase history. |
| Similar Products  | Discover similar products to the ones you're interested in, helping you make informed choices. |
| Automated Purchases  | Use a subscription service where selected products are automatically purchased at specified intervals, making your shopping hassle-free. |
| Positive/Negative Reviews  | Gain insights into product reviews and ratings, distinguishing between positive and negative feedback. |

## Installation
To clone the repository, run the following:
```bash
git clone https://github.com/garimasikka/HackAI.git
```
To install the package, run the follwing command:
```bash
pip install -r requirments.txt
```
To run the application, use the following commands:
```bash
python ./src/ main.py
```
Generate your API key using this link:

 - OpenAPI: [create API Key](https://www.alphavantage.co/support/#api-key)

 - Twilio: [create API Key](https://www.alphavantage.co/support/#api-key)

Create a .env file and use the follwoing commands:
```bash
account_sid= <twilio account sid>
auth_token= <twilio authentication token> 
twilio_number= <twilio phone number>
target_number= <any target phone number with country code>
OPENAI_API_KEY= <openai api>
```

## Getting Started

### 1. Navigate to the Main Page
Here, the page provides following information regarding the products.
- Subscribed Products: a user can opt for a subscription service where he/she can select a few products to be bought automatically after a fixed interval eg. every month, week, etc. The page shows products subscribed by the user.
- Recommended Products: the page displays recommended products based on past history. For a new user, it shows recommendations using star rating.
### 2. Navigate to any Product Page
When you navigate to a product page, you'll find the following features:

- Product Listing: view a list of available dress products.
- Product Interaction: choose a product based on your preference.
- Wishlist:add the selected product to your wishlist.
- Shopping Cart: include the product in your cart for future purchase.
- Comments: read or add comments related to the product. This uses an ML model which classifies each tweet as either positive or negative and this information helps in the recommendation system.
- Similar Products: It displays images with similar features.
![image](./images/settings.png)

### 3. Navigate to Subscription Page
When you navigate to a subscription page, add the following details:
- Duration: type the number of days (integer). If you enter 7, it will buy the selected product automatically after every 7 days.
- Product ID: type the product id (integer starting from 0) of the product that the application will buy automatically after a fixed interval of time. Due to limited time, product id has been asked instead of selecting product names or images.


### 4. Twilio Messages

A user gets notifications on phone for the following reasons:
- When the price of a product in the wishlist gets discounted.
- When the unavailable product in the wishlist becomes available.
![image](./images/exchange_rate.png)

# Scope of Improvement

While developing this application, we faced time constraints that prevented the inclusion of additional features. However, to enhance the overall user experience, the following features could be considered for future development:

### 1. Multi-User Support:

Current State: The application is designed to accommodate a single user.
Enhancement: Extend the application to support multiple users, providing a more inclusive and interactive experience for a broader user base. This could involve user authentication, personalized profiles, and individualized preferences.

### 2. Subscription Page Enhancement:

Current State: The subscription page currently requires users to input a product ID, which is an integer starting from 0.
Enhancement: Improve the subscription page by allowing users to add various products with a more user-friendly approach. Instead of manually entering product IDs, users should be able to choose products from a list, accompanied by images. This simplifies the selection process and enhances the visual appeal of the subscription page.

### 3. Multiple Product Subscription:
Current State: The subscription functionality is limited to allowing users to add only one product.
Enhancement: Enhance the subscription feature to enable users to subscribe to multiple products. This flexibility allows users to explore and engage with a broader range of offerings, tailoring their subscriptions to diverse preferences and needs. Implementing this improvement can significantly enrich the user experience and increase the application's appeal to a wider audience.

## Meta
Mehak Singal – 21f1006390@ds.study.iitm.ac.in

Nidhish Kumar - 21f1003758@ds.study.iitm.ac.in 

Garima Sikka - 21f1005923@ds.study.iitm.ac.in

Mohammed Samir - abutech8801@gmail.com

Distributed under the MIT license. See ``LICENSE`` for more information.
