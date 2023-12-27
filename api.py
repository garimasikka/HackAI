from transformers import pipeline
from openai import OpenAI
import pandas as pd
from sentence_transformers import SentenceTransformer
from transformers import pipeline
import chromadb
from flask import Flask, jsonify, request, make_response
from flask_restful import Api, Resource
import os

from main import get_data

OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY')
app = Flask(__name__)
api = Api(app)

def analyze_sentiment(text):
    """
    Analyze the sentiment of the given text.
    :param text: A string containing the text to be analyzed.
    :return: A dictionary containing the sentiment scores.
    """
    sentiment_classifier = pipeline(
        model="lxyuan/distilbert-base-multilingual-cased-sentiments-student",
        return_all_scores=True
    )
    prediction = sentiment_classifier(text)
    return prediction[0]

def sentiment_analysis(): 
    all_reviews = {}
    total_pos = {}
    if get_data():
        _, products_list, _ = get_data()
        print(products_list)
        for product in products_list:
            total_pos[product["_id"]] = 0
            all_reviews[product["_id"]] = []
            for review in product["reviews"]:
                sentiment = analyze_sentiment(review)
                max_score = 0
                pred_sentiment = ""
                for i in sentiment:
                    if i["score"] > max_score:
                        max_score = i["score"] 
                        pred_sentiment = i["label"]
                if pred_sentiment=="positive":
                    total_pos[product["_id"]]+=1
                all_reviews[product["_id"]].append(pred_sentiment)
        print(total_pos)
        return total_pos
    
def get_openai_response(user_message, OPENAI_API_KEY=OPENAI_API_KEY):
    """
    Get a response from OpenAI's language model based on the user message.
    :param user_message: A string containing the user's message.
    :param OPENAI_API_KEY: Your OpenAI API key.
    :return: The model's response as a string.
    """
    client = OpenAI(api_key=OPENAI_API_KEY)
    delimiter = ">>>>"
    delimiter1 = "####"
    delimiter2 = "***"
    system_message = f"""
        You are a data extracter. Use the following mappings separated using {delimiter1} and return a json containing 'PRODUCT_TYPE', 'PRODUCT_SIZE', 'GENDER', 'COLOR' and 'BRAND' as the keys.

        {delimiter1}
        ----------
        TYPE(name - id)

        Jeans - 0
        Shoes - 1
        Shirts - 2
        Accessories - 3
        Dress - 4

        GENDER(name - id)

        Male - M
        Female - F
        Unisex - U

        BRAND(name)

        Forever21
        Zara
        Arrow
        Mango
        Pantaloons
        Allen Solly
        Jockey
        Reebok

        SIZE(name - id)

        Onesize - O
        Small - S
        Medium - M
        Large - L

        COLOR(name)

        Blue
        Black
        Red
        Pink
        White
        Yellow
        Orange
        Purple
        Green
        ----------
        {delimiter1}

        {delimiter2}
        BRAND = brand name
        PRODUCT_TYPE = TYPE.id
        PRODUCT_SIZE = SIZE.id
        GENDER = GENDER.id
        COLOR = colour
        {delimiter2}

        Return only a json containing all the keys. If anything is not present in the above list(separated using {delimiter1}) return a null.
        """

    messages = [
        {'role': 'system', 'content': system_message},
        {'role': 'user', 'content': f'{delimiter}{user_message}{delimiter}'},
    ]

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=messages,
        temperature=0,
        max_tokens=500,
    )

    return response.choices[0].message.content

# Initialize models
sentiment_classifier = pipeline(
    model="lxyuan/distilbert-base-multilingual-cased-sentiments-student",
    return_all_scores=True
)
model = SentenceTransformer('average_word_embeddings_komninos')
client = chromadb.Client()

# Load data
def load_data():
    products = pd.read_excel("./products.xlsx", header=0)
    reviews = pd.read_excel("./ratings.xlsx", header=0)
    return products, reviews

# Top N products
def top_n_products(products, reviews, n=3):
    merged = pd.merge(products, reviews, how="left", on=['product_id'])
    df = merged.groupby(['product_id']).agg('rating').mean()
    return list(df.sort_values(ascending=False)[:n].index)

# Sentiment score
def score(comments):
    s = 0
    for comment in comments:
        s += sentiment_classifier(comment)[0][0]['score']
    s /= len(comments)
    return s

# Transform database
def transform_db(products, reviews):
    df = pd.merge(reviews, products, how="left", on=['product_id'])
    df = df[['product_id', 'comment', 'rating', 'brand', 'product_code', 'color']]
    df = df.groupby(['product_id']).aggregate({
        'comment': lambda x: x,
        'brand': lambda x: ', '.join(set(x)),
        'product_code': lambda x: ', '.join(set(x)),
        'color': lambda x: ', '.join(set(x))
    })
    df.comment = df['comment'].apply(score)
    return df

# Get recommendations
def get_recommendations(brand, product_code, color, comments, n=3):
    p = []
    embeddings = []
    gender = {
        'M': 'male',
        'F': 'female',
        'U': 'unisex'
    }
    size = {
        'O': 'onesize',
        'S': 'small',
        'M': 'medium',
        'L': 'large'
    }
    product_type = {
        '0': 'jeans',
        '1': 'shoes',
        '2': 'shirts',
        '3': 'accessories',
        '4': 'dress'
    }
    products, reviews = load_data()
    new_db = transform_db(products, reviews)
    for idx in range(new_db.shape[0]):
        p.append(str(idx))
        data = new_db.iloc[idx]['brand'] + gender[new_db.iloc[idx]['product_code'][0]] + \
                size[new_db.iloc[idx]['product_code'][1]] + product_type[new_db.iloc[idx]['product_code'][-1]] + \
                new_db.iloc[idx]['color']
        embeddings.append(list(model.encode(data).astype('float')+[new_db.iloc[idx]['comment']]))

    products_collection = client.create_collection(name="products",
                                      metadata={"hnsw:space": "cosine"})
    
    products_collection.add(
        embeddings=embeddings,
        ids=p
    )
    
    distilled_student_sentiment_classifier = pipeline(
        model="lxyuan/distilbert-base-multilingual-cased-sentiments-student",
        return_all_scores=True
    )
    data = brand + gender[product_code[0]] + size[product_code[1]] + product_type[product_code[2]] + color
    s = 0
    for comment in comments:
        s += distilled_student_sentiment_classifier(comment)[0][0]['score']
    s /= len(comments)
    embedding = list(model.encode(data).astype('float')+s)
    query_result = products_collection.query(
        query_embeddings=embedding,
        n_results=n
    )
    return list(map(int, query_result['ids'][0]))

class Get_Data(Resource):
    def post(self):
        query=request.get_json()["word"]
        data = get_openai_response(query)
        return make_response(jsonify(data))
    
class Recommendation(Resource):
    def post(self):
        data=request.get_json()
        res = get_recommendations(data['brand'], data['product_code'], data['color'], data['comments'])
        return make_response(jsonify({'product_id': res}))
    
    
class Sentiment(Resource):
    def get(self):
        res = sentiment_analysis()
        return make_response(jsonify({'sentiment': res}))
    
api.add_resource(Sentiment, '/api/model/sentiment')
api.add_resource(Get_Data, '/api/model/get_data')
api.add_resource(Recommendation, '/api/model/recommendation')

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080)