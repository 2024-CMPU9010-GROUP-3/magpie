import pandas as pd
from pyproj import Transformer

def convert_irish_to_lat_long(csv_path, easting_col='X_Value', northing_col='Y_Value'):
    """
    Function to convert the coordiantes to long/lat format
    """
    
    df = pd.read_csv(csv_path, encoding='utf-8', encoding_errors='ignore')
    
    transformer = Transformer.from_crs("EPSG:29902", "EPSG:4326", always_xy=True)

    
    df['longitude'], df['latitude'] = transformer.transform(df[easting_col].values, df[northing_col].values)
    
    df.to_csv(csv_path, index=False)
    print(f"Data with longitude and latitude saved to {csv_path}")


def main(csv_path):
    """
    Main function
    """
    convert_irish_to_lat_long(csv_path)


if __name__ == "__main__":
    main('parking-meter.csv')