import os
from openai import AzureOpenAI
from dotenv import load_dotenv
import json

# Load the .env file
load_dotenv()

# load configuration from environment variables
try:
    OPENAI_API_BASE = os.environ['openai_api_base']
    OPENAI_API_VERSION = os.environ['openai_api_version']
    OPENAI_ENGINE = os.environ['openai_engine']
    OPENAI_API_KEY = os.environ['openai_api_key']
    OPENAI_API_TYPE = os.environ['openai_api_type']
except KeyError as e:
    raise e


def azure_chat_openai(latitude, longitude, temperature, precipitation):     
    
    try:
        client = AzureOpenAI(
            azure_endpoint = OPENAI_API_BASE, 
            api_key=OPENAI_API_KEY,  
            api_version=OPENAI_API_VERSION
            )
        
        prompt = get_prompt()
        formatted_prompt = format_prompt(prompt, latitude, longitude, str(temperature)+'C', str(precipitation)+'mm')

        # Create the request to the Azure OpenAI model
        response = client.chat.completions.create(
            messages=[
                {"role": "system", "content": formatted_prompt}
            ],
            temperature=0.7,
            max_tokens=1000,
            model=OPENAI_ENGINE
        )
        
        # Extract and return the model's response
        text = response.choices[0].message.content     
        data_dict = json.loads(text)
        data = convert_keys_to_pascal_case(data_dict)
        return data
    
    except Exception as e:
        print(f"Error during OpenAI request: {e}")
        return e
    
def get_prompt():
    try:
        with open('prompt_file.txt', 'r') as file:
            prompt = file.read()
            return prompt
    except Exception as e:
        raise e
    
def format_prompt(template, latitude, longitude, temperature, precipitation):
    # Use the format method to replace placeholders
    return template.format(latitude=latitude, longitude=longitude, temperature=temperature, precipitation=precipitation)

def to_pascal_case(camel_str):
    """Convert camelCase to PascalCase."""
    if not camel_str:
        return camel_str  # Return empty string as is
    return camel_str[0].upper() + camel_str[1:]

def convert_keys_to_pascal_case(data):
    """Recursively convert keys of a dictionary or list from camelCase to PascalCase."""
    if isinstance(data, dict):
        return {to_pascal_case(k): convert_keys_to_pascal_case(v) for k, v in data.items()}
    elif isinstance(data, list):
        return [convert_keys_to_pascal_case(item) for item in data]
    else:
        return data  # Return the value if it's neither dict nor list
