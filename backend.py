from fastapi import FastAPI, Request
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from TwitterAPI import TwitterAPI
import json

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

ids = {"foodtruckfinde1":"1013860593738997760",
"interviewsndbox":"1266792700701007872"}

# user_id = ids["foodtruckfinde1"]

for user in ids:
    message_text = "Hey %s,\n\nSo we're getting started with a new program, where we can message our followers on several platforms. \n\nFind us on substack.com here. Look forward to your continued support!  \n\n-Sagar" % user
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