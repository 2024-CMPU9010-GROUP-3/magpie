import pandas as pd
import requests
import sys
from tqdm import tqdm
from concurrent.futures import ThreadPoolExecutor, as_completed

# Define a generic send function
def send_point(session, url, point_type, coordinates, details):
    point_data = {
        "longlat": {
            "type": "Point",
            "coordinates": coordinates
        },
        "type": point_type,
        "details": details
    }
    try:
        response = session.post(url, json=point_data)
        return response.status_code in (200, 201)
    except:
        return False

# Dictionary of types with field mappings
MAPPING = {
    "parking": {"point_type": "parking", "coordinates": ["longitude", "latitude"], "details": {}},
    "coach_parking": {"point_type": "coach_parking", "coordinates": ["Longitude", "Latitude"], "details": {"number_spaces_available": "Spaces available"}},
    "bike_sharing_station": {"point_type": "bike_sharing_station", "coordinates": ["Longitude", "Latitude"], "details": {"number_bikes_available": "Number"}},
    # Add other mappings as needed...
}

# Function to process points from DataFrame rows
def process_point(row, session, url, point_config):
    coords = [row[point_config["coordinates"][0]], row[point_config["coordinates"][1]]]
    details = {k: row[v] for k, v in point_config["details"].items()}
    return send_point(session, url, point_config["point_type"], coords, details)

# Send points with threading
def send_points_to_api(data, point_type):
    url = "http://localhost:8080/v1/private/points/"
    total = len(data)
    successful_posts = 0

    point_config = MAPPING.get(point_type)
    if not point_config:
        print(f"Point type '{point_type}' not found in configuration.")
        return

    session = requests.Session()
    with ThreadPoolExecutor() as executor:
        futures = [executor.submit(process_point, row, session, url, point_config) for _, row in data.iterrows()]

        with tqdm(total=total, desc=f"Uploading {point_type}", unit="spot") as pbar:
            for future in as_completed(futures):
                if future.result():
                    successful_posts += 1
                pbar.update(1)
                pbar.set_postfix(successful=successful_posts, failed=(pbar.n - successful_posts))

    session.close()

def read_csv_file(csv_file_path):
    try:
        return pd.read_csv(csv_file_path)
    except:
        print("Error reading CSV file.")
        return None

def main(csv_file_path, point_type):
    data = read_csv_file(csv_file_path)
    if data is None:
        return

    send_points_to_api(data, point_type)

if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
