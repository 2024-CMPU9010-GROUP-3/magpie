"use server";
import { GeoJsonObject } from "geojson";

export async function getPointsUsingLatLongAndRadius(): Promise<GeoJsonObject> {
// lat: number,
// long: number,
// radius: number
  return new Promise((resolve, reject) => {
    fetch(
      `http://localhost:8080/v1/public/points/inRadius?lat=,-6.271562&long=53.360813&radius=4000`
    )
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
}
