import pandas as pd
import geopandas as gpd
import json

def read_geojson_save_as_csv(geojson_path, csv_path):
    """
    Function to save the geojson file to a csv file
    """
    gdf = gpd.read_file(geojson_path)

    gdf['longitude'] = gdf.geometry.x
    gdf['latitude'] = gdf.geometry.y

    df = pd.DataFrame(gdf.drop(columns=['geometry']))

    df.to_csv(csv_path, index=False)
    print(f"Data saved to {csv_path}")

def read_geojson_save_as_csv_for_files_with_problems_in_format(geojson_path, csv_path):
    """
    Function to save the geojson file to a csv file if issues with the format
    """
    with open(geojson_path, 'r') as file:
        geojson_data = json.load(file)

    data = []
    
    for feature in geojson_data['features']:
        properties = feature['properties']
        coordinates = feature['geometry']['coordinates']
        
        if len(coordinates) == 2:
            longitude = coordinates[0]
            latitude = coordinates[1]

            data.append({
                'longitude': longitude,
                'latitude': latitude,
                **properties  
            })
        else:
            print(f"Warning: Unexpected coordinates format for feature {properties.get('id', 'unknown')}: {coordinates}")

    df = pd.DataFrame(data)

    df.to_csv(csv_path, index=False)
    print(f"Data saved to {csv_path}")

def main(geojson_path, csv_path):
    """
    Main function
    """
    #read_geojson_save_as_csv(geojson_path, csv_path)
    read_geojson_save_as_csv_for_files_with_problems_in_format(geojson_path, csv_path)


if __name__ == "__main__":
    main('bleeperbike_map.geojson', 'bleeperbike_map.csv')