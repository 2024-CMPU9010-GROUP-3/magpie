import requests
from PIL import Image
from io import BytesIO
import os
import csv
import pandas as pd


df = pd.read_csv("2020-coach-parking-dcc-1.csv")
location_data = df.to_dict('records')


def get_images(name, latitude, longitude):
    url = f'https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/{longitude},{latitude},18,0,0/400x400?access_token=pk.eyJ1Ijoia2F1c3R1Ymh0cml2ZWRpIiwiYSI6ImNtMWo2NndsbzB4N3EycHM1aGF2cDd5NzkifQ.4aegzX6Kfy3zW8pHkLWU7Q'
    response = requests.get(url)
    print(response)
    if response.status_code == 200:
        img = Image.open(BytesIO(response.content))
        if not os.path.exists('output'):
            os.makedirs('output')

        output_folder = 'output'
        output_path = os.path.join(output_folder, f'{name}_coach_parking.png')
        img.save(output_path)
        print(f"Image saved to {output_path}")


for place in location_data:
    name = place["Street Name"]
    if ("/" in name):
        name = name.replace("/", "-")
    latitude = place["Latitude"]
    longitude = place["Longitude"]
    get_images(name, latitude, longitude) 
