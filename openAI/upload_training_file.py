from openai import OpenAI
import os
from dotenv import load_dotenv
load_dotenv(".env")

api_key = os.getenv("OPENAI_API_KEY")
org_id = os.getenv("OPENAI_ORG_ID")
client = OpenAI(api_key=api_key, organization=org_id)

client.files.create(
  file=open("openAI/training_data.jsonl", "rb"),
  purpose='fine-tune'
)