from flask import Flask,request
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
import os 
from dotenv import load_dotenv
import psycopg2
from flask_cors import CORS
CREATE_USERS_TABLE = "CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY,email TEXT, password TEXT, username TEXT)"
CREATE_LINKS_TABLE = "CREATE TABLE IF NOT EXISTS links (email TEXT, link TEXT[])"
INSERT_LINK = "INSERT INTO links (email,link) VALUES(%s, %s)"
INSERT_USERS = "INSERT INTO users (email,password,username) VALUES (%s,%s,%s)"
SELECT_LINKS = "SELECT * FROM links WHERE EMAIL = email"
CHECK_USERS = "SELECT * FROM users WHERE email = email AND password = password"
load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
db = psycopg2.connect(database="LinkShorter", user="postgres", password="Haslo123", host="localhost", port="5432")

class User(UserMixin):
    def __init__(self, id, email, username):
        self.id = id
        self.email = email
        self.username = username

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
    username = data["userName"]
    with db:
        with db.cursor() as cursor:
            cursor.execute(CREATE_USERS_TABLE)
            cursor.execute(INSERT_USERS, (email,password,username))          
    return {"message": f"Users {username} created."}, 201
@app.post("/api/login")
def login():
    data = request.get_json()
    email = data["email"]
    password = data["password"]
    with db:
        with db.cursor() as cursor:
            cursor.execute(CHECK_USERS, (email, password))
            user = cursor.fetchone()  # Fetch the user data
            if user:
                user_id, email, _, username = user  # Assuming the user table has four columns: id, email, password, username
                user_obj = User(user_id, email, username)  # Create an instance of your User class
                print(user_obj.username)
                return {"message": f"Logged in as {username}."}, 200
            else:
                return {"message": "Invalid credentials."}, 401