from fastapi import FastAPI, Request
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from TwitterAPI import TwitterAPI
import tweepy
import json
import twint


app = FastAPI()

origins = [
    "http://localhost:3000"
]

twitter_tokens = {
    "API_key": "",
    "API_secret_key": "",
    "access_token": "",
    "access_token_secret": ""
}

api = TwitterAPI(twitter_tokens["API_key"],
                 twitter_tokens["API_secret_key"],
                 twitter_tokens["access_token"],
                 twitter_tokens["access_token_secret"])

auth = tweepy.OAuthHandler(
    twitter_tokens["API_key"], twitter_tokens["API_secret_key"])
auth.set_access_token(
    twitter_tokens["access_token"], twitter_tokens["access_token_secret"])

tweepyAPI = tweepy.API(auth)


# Get list of followers using Twint (no API calls used)
def get_followers():
    # c = twint.Config()
    # c.Username = "sagrd90"
    # c.Store_object = True
    # c.Store_json = True
    # c.Output = "followers.json"
    # c.Custom = True
    # twint.run.Followers(c)
    followers = tweepyAPI.followers('sagrd90')
    for follower in followers:
        handle = follower._json['screen_name']
        user_id = follower._json['id']
        bio = follower._json['description']
        followers_count = follower._json['followers_count']
        verified = follower._json['verified']
        location = follower._json['location']
        with open('followers.json', 'r') as json_file:
            followers_data = json.load(json_file)
        followers_data["followers"].update({handle: [user_id, bio,
                                                     followers_count, verified, location]})
        # userObject = {handle: [user_id, bio,
        #                        followers_count, verified, location]}
        with open('followers.json', 'w') as json_file:
            json.dump(followers_data, json_file, indent=4)
    # return followers_data


get_followers()


def get_profile():
    c = twint.Config()
    c.Username = "sagrd90"
    c.Profile_full = True
    twint.run.Profile(c)


# get_profile()


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


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/tokens")
def get_tokens(request: Request):
    tokens_req = request.json
    print(tokens_req, "tokens")
    return tokens_req
