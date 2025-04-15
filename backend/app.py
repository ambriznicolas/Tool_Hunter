from flask import Flask,request,jsonify
from scraping.scrape import main

from flask_cors import CORS
import asyncio

app = Flask(__name__)
CORS(app)

@app.post("/scrape")
def search():
   search_product = request.get_json()["product"]
   product_list = asyncio.run(main(search_product))
   return jsonify(product_list)



   

   
    



    