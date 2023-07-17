from flask import Flask,request
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
import os 
from dotenv import load_dotenv
import psycopg2
CREATE_USERS_TABLE = "CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY,email TEXT, password TEXT, username TEXT)"
CREATE_LINKS_TABLE = "CREATE TABLE IF NOT EXISTS links (email TEXT, link TEXT[])"
INSERT_LINK = "INSERT INTO links (email,link) VALUES(%s, %s)"
INSERT_USERS = "INSERT INTO users (email,password,username) VALUES (%s,%s,%s)"
SELECT_LINKS = "SELECT * FROM links WHERE EMAIL = email"
load_dotenv()

app = Flask(__name__)

db = psycopg2.connect(database="LinkShorter", user="postgres", password="Haslo123", host="localhost", port="5432")



@app.route('/')
def home():
    return "Hello from flask"

if __name__ == '__main__':
    app.run(debug = True)

@app.post("/api/register")
def register():
    data = request.get_json()
    email = data["email"]
    password = data["password"]
    username = data["username"]
    with db:
        with db.cursor() as cursor:
            cursor.execute(CREATE_USERS_TABLE)
            cursor.execute(INSERT_USERS, (email,password,username))          
    return {"message": f"Users {username} created."}, 201