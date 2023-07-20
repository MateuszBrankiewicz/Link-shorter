from flask import Flask,request,jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from dotenv import load_dotenv
import psycopg2
from flask_cors import CORS
import hashlib




CREATE_USERS_TABLE = "CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY,email TEXT, password TEXT, username TEXT)"
CREATE_LINKS_TABLE = "CREATE TABLE IF NOT EXISTS links (email TEXT, link TEXT, short_link TEXT)"
INSERT_LINK = "INSERT INTO links (email,link,short_link) VALUES(%s, %s,%s)"
INSERT_USERS = "INSERT INTO users (email,password,username) VALUES (%s,%s,%s)"
SELECT_LINKS = "SELECT * FROM links WHERE EMAIL = %s"
CHECK_USERS = "SELECT * FROM users WHERE email = %s AND password = %s"
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
                user_id, email, _, username = user  
                user_obj = User(user_id, email, username)  
                print(user_obj.username)
                return {"message": f"Logged in as {username}."}, 200
            else:
                return {"message": "Invalid credentials."}, 401
@app.route('/api/home', methods=['POST'])
def getLinks():
    data = request.get_json()
    email = data["email"]
    with db:
        with db.cursor() as cursor:
            cursor.execute(SELECT_LINKS, (email,))
            links = cursor.fetchone()  # Fetch the links data
            if links:
                email, links_list = links
                return {"email": email, "links": links_list}, 200
            else:
                return {"message": "No links found for the given email address."}, 404
@app.route('/api/home/create', methods=["POST"])
def createLink():
    data = request.get_json()
    email = data.get("email")
    url = data.get("url")

    if not email or not url:
        return jsonify({"error": "Email and URL must be provided."}), 400

    with db:
        with db.cursor() as cursor:
            cursor.execute(SELECT_LINKS, (email,))
            links = cursor.fetchone()

        if links:
            email, existing_links, shorted_links = links
            existing_links = existing_links.split(",")  # Convert the string to a list
            shorted_links = shorted_links.split(",")    # Convert the string to a list
        else:
            existing_links = []
            shorted_links = []

        existing_links.append(url)  # Add the new link to the existing links list

        short_link = generate_short_link(url)
        shorted_links.append(short_link)

        # Convert the lists back to strings to store in the database
        existing_links_str = ",".join(existing_links)
        shorted_links_str = ",".join(shorted_links)

        with db.cursor() as cursor:
            cursor.execute(INSERT_LINK, (email, existing_links_str, shorted_links_str))
    print(links)
    return jsonify({"email": email, "links": existing_links}), 200


def generate_short_link(url):
    md5_hash = hashlib.md5(url.encode()).hexdigest()[:8]  
    short_link = f"http://urlxMatty522/{md5_hash}"  
    return short_link