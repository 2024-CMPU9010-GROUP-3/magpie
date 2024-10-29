import pandas as pd
import requests

def send_parking_spots_to_api(data):
    """
    Function to send the data as post requests to the backend
    """
    url = "http://localhost:8080/v1/private/points/"

    successful_posts = 0

    for index, row in data.iterrows():
        point_data = {
            "longlat": {
                "type": "Point",
                "coordinates": [row['longitude'], row['latitude']]
            },
            "type": "parking",
            "details": {
            }
        }
        
        try:
            response = requests.post(url, json=point_data)
            
            if response.status_code == 200 or response.status_code == 201:
                print(f"Successfully added point with longitude {row['longitude']} and latitude {row['latitude']}")
                successful_posts += 1
            else:
                print(f"Failed to add point: {response.status_code}, {response.text}")
        
        except Exception as e:
            print(f"Error sending data to API: {e}")
    
    print(f"Total successful posts: {successful_posts}/{len(data)}")


def read_csv_file(csv_file_path):
    """
    Functiion to read the csv file in a pandas dataframe
    """
    try:
        data = pd.read_csv(csv_file_path)
        return data
    except Exception as e:
        print(f"Error reading CSV file: {e}")
        return None

def main(csv_file_path):
    """
    Main function to send all the coordiantes in a csv file to the backend
    """
    data = read_csv_file(csv_file_path)

    if data is not None:
        send_parking_spots_to_api(data)


if __name__ == "__main__":
    main('coordinates_in_-6.3072_53.4044--6.3031_53.4068.csv')
