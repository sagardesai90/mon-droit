from fastapi import FastAPI, Request
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
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

user_id = <user id of the recipient>
message_text = <the DM text>

r = api.request('direct_messages/events/new', json.dumps(event))
print('SUCCESS' if r.status_code == 200 else 'PROBLEM: ' + r.text)

event = {
    "event": {
        "type": "message_create",
        "message_create": {
            "target": {
                "recipient_id": user_id
            },
            "message_data": {
                "text": message_text
            }
        }
    }
}



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