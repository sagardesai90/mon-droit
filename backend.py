from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from pydantic import BaseModel
from TwitterAPI import TwitterAPI
import tweepy
import json
import twint


app = Flask(__name__)
CORS(app)


def set_tokens(req):
    with open("tokens.json", 'r') as json_file:
        token_data = json.load(json_file)
    token_data.update({"API_key": req["apiKey"],
                       "API_secret_key": req["secretApiKey"],
                       "access_token": req["accessToken"],
                       "access_token_secret": req["secretAccessToken"]})
    with open('tokens.json', 'w') as json_file:
        json.dump(token_data, json_file, indent=4)


# GET TOKEN DATA FROM tokens.json
with open('tokens.json', 'r') as json_file:
    token_data = json.load(json_file)

api = TwitterAPI(token_data["API_key"],
                 token_data["API_secret_key"],
                 token_data["access_token"],
                 token_data["access_token_secret"])


auth = tweepy.OAuthHandler(
    token_data["API_key"], token_data["API_secret_key"])
auth.set_access_token(
    token_data["access_token"], token_data["access_token_secret"])

tweepyAPI = tweepy.API(auth)

# YOUR TWITTER SCREEN NAME GOES HERE

your_user_id = None


def set_user(name):
    get_all_followers(name)


def get_all_followers(name):
    print("Getting all the followers for ", name,
          ". Please know that twitter has rate limits, so only up to 3000 followers can be returned at every 15 minute interval.")
    all_followers = tweepy.Cursor(
        tweepyAPI.followers, screen_name=name, count=200).pages()
    for request in range(15):
        your_200_followers = next(all_followers)
        for each_follower in your_200_followers:
            handle = each_follower._json['screen_name']
            user_id = each_follower._json['id']
            bio = each_follower._json['description']
            followers_count = each_follower._json['followers_count']
            verified = each_follower._json['verified']
            location = each_follower._json['location']
            with open('followers.json', 'r') as json_file:
                followers_data = json.load(json_file)
            followers_data["followers"].update({handle: [user_id, bio,
                                                         followers_count, verified, location]})
            # userObject = {handle: [user_id, bio,
            #                        followers_count, verified, location]}
            with open('followers.json', 'w') as json_file:
                json.dump(followers_data, json_file, indent=4)


ids = {"foodtruckfinde1": "1013860593738997760",
       "interviewsndbox": "1266792700701007872"}


# Lets you send DMs to a set of users with a custom message. (API calls used)
def send_DM():
    for user in ids:
        # Message you want to send to users
        message_text = "Hey %s,\n\nWe're getting started with a new program, where we can message our followers on several platforms. \n\nFind us on substack.com here. Look forward to your continued support!  \n\n-Sagar" % user
        print(ids[user], "ids[user]")
        event = {
            "event": {
                "type": "message_create",
                "message_create": {
                    "target": {
                        "recipient_id": ids[user]
                    },
                    "message_data": {
                        "text": message_text
                    }
                }
            }
        }
        r = api.request('direct_messages/events/new', json.dumps(event))
    print('SUCCESS' if r.status_code == 200 else 'PROBLEM: ' + r.text)
# send_DM()


@app.route('/', methods=['GET'])
@cross_origin(origin='*')
def read_root():
    return "hi"


@app.route('/user', methods=['POST'])
def get_user():
    user_req = request.json
    set_user(user_req['screenName'])
    return user_req


@app.route('/tokens', methods=['POST'])
def get_tokens():
    tokens_req = request.json
    set_tokens(tokens_req)
    return tokens_req
