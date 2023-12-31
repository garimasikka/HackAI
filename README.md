# Personal Shopping Assistant

The Personal Shopping Assistant is a powerful tool leveraging Fetch.ai's uAgent library, designed to enhance your shopping experience. This innovative application utilizes three deep learning models and offers a subscription service, automating the purchase of selected products at regular intervals. Additionally, it provides personalized product recommendations and classifies reviews as positive or negative, ensuring a seamless and informed shopping journey.

Link to uAgent Library: 
- [uAgents Github Repository](https://github.com/fetchai/uAgents)
- [uAgent Documentation](https://fetch.ai/docs)
- [uAgent Examples](https://github.com/fetchai/uAgents-examples)

| Features   | Description  |
| ------------- | ------------- |
|  Product Search  |Easily find products by typing in the search bar. The app provides a list of products based on your search text  |
| Product Recommendations*  | Receive personalized product recommendations based on your preferences and purchase history. |
| Similar Products  | Discover similar products to the ones you're interested in, helping you make informed choices. |
| Automated Purchases  | Use a subscription service where selected products are automatically purchased at specified intervals, making your shopping hassle-free. |
| Product Availability  | Displays if the product is in stock. |
| Positive/Negative Reviews  | Gain insights into product reviews and ratings, distinguishing between positive and negative feedback. |

*Tried to implement product recommendations feature but couldn't due to time limitations.

## Installation
To clone the repository, run the following:
```bash
git clone https://github.com/garimasikka/HackAI.git
```
To install the package, run the follwing command:
```bash
pip install -r requirements.txt
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
The target number in .env file has to be the same as the twilio number that was used for signup.

To run the application, use the following commands in different terminals:

terminal 1:
```bash
cd ./web_app
npm i
```
terminal 2:
```bash
cd web_app/frontend
npm i
```
terminal 3:
```bash
python main.py
```
terminal 4:
```bash
python api.py
```
terminal 5:
```bash
npm run dev
```


It will take a few minutes to download all models.

## Getting Started
To begin using the application, please sign up or log in. 

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

![image](./images/prod.png)

### 3. Navigate to Subscription Page
When you navigate to a subscription page, add the following details:
- Duration: type the number of days (integer). If you enter 7, it will buy the selected product automatically after every 7 days.
- Product ID: type the product id of the product that the application will buy automatically after a fixed interval of time. Due to limited time, product id has been asked instead of selecting product names or images.

![image](./images/sub.png)

### 4. Product Search

Use the search bar to find products by entering specific keywords. The system uses GPT 3.5 to display a list of products related to your search. 

![image](./images/jeans.png)

### 5. Product Reviews

Users can contribute reviews for products, assigning a rating on a scale of 1 to 5 stars. The system employs a machine learning model to analyze and classify reviews as positive, negative, or neutral. Additionally, it aggregates the total count of positive reviews for each product, providing valuable insights into customer satisfaction. This feature enhances the user experience by fostering transparency and aiding in informed purchasing decisions.

![image](./images/review.png)

### 6. Twilio Messages

A user gets notifications on phone for the following reasons:
- When the price of a product in the wishlist gets discounted.
- When the unavailable product in the wishlist becomes available.
 
<img src="./images/rem.jpg" alt="message" width="200"/> <img src="./images/rem2.jpg" alt="message" width="200"/>

## Admin User
To access the admin features of the application, log in using the following credentials:

Email ID: admin@admin.com

Password: 123456

Once logged in as an admin, you have the authority to:

- Create new products
- Delete existing products
- Edit product details
  
These capabilities empower administrators to efficiently manage the product inventory and maintain the application's content.

![image](./images/admin.png)

## Database Overview
This project utilizes MongoDB with six distinct schemas:

- **User**: name, email id, password, role
- **Products**: name, description, image, brand, product type, color, price, discounted price, stock count
- **Review**: product comments, ratings
- **Orders**: payment method, address
- **Subscription**: products selected for subscription service, duration in days
- **Wishlist**: products added to the wishlist by a user

These schemas organize and store data efficiently, supporting various aspects of the application such as user management, product details, reviews, orders, subscriptions, and wishlists.

## Demo

Demo Video Link: https://drive.google.com/drive/folders/1mGlAykozHCC0eMuR_KEvWDSA8p4KETu5?usp=sharing

# Scope of Improvement

While developing this application, we faced time constraints that prevented the inclusion of additional features. However, to enhance the overall user experience, the following features could be considered for future development:

### 1. Multi-User Support:

Current State: The application is designed to accommodate a single user.

Enhancement: Extend the application to support multiple users, providing a more inclusive and interactive experience for a broader user base. This could involve user authentication, personalized profiles, and individualized preferences.

### 2. Subscription Page Enhancement:

Current State: The subscription page currently requires users to input a product ID.

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
