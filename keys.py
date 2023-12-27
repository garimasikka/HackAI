import os
import sys
from dotenv import load_dotenv, find_dotenv

_ = load_dotenv(find_dotenv())


account_sid = os.environ['account_sid']
auth_token = os.environ['auth_token']

twilio_number = os.environ['twilio_number']
target_number = os.environ['target_number']
