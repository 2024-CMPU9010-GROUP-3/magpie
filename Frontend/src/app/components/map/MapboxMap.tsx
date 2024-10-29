"use client";

import React, { Fragment, useEffect, useMemo, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import DeckGL from "@deck.gl/react";
import "mapbox-gl/dist/mapbox-gl.css";
import {
  MapClickEvent,
  Coordinates,
  Point,
  CoordinatesForGeoJson,
} from "@/lib/interfaces/types";
import Map, { Layer, LayerProps, Marker, Source } from "react-map-gl";
import { lightingEffect, INITIAL_VIEW_STATE } from "@/lib/mapconfig";
import { GeoJSON, FeatureCollection } from "geojson";
// import { FloatingDock } from "@/components/ui/floating-dock";
// import { IconHome } from "@tabler/icons-react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { Grid } from "react-loader-spinner";
import { Badge } from "@/components/ui/badge";

type SliderProps = React.ComponentProps<typeof Slider>;

const initialGeoJson: GeoJSON = {
  type: "FeatureCollection",
  features: [],
};

const LocationAggregatorMap = ({ className, ...props }: SliderProps) => {
  const [mapBoxApiKey, setMapBoxApiKey] = useState<string>("");
  const [isMarkerVisible, setIsMarkerVisible] = useState<boolean>(false);
  const [coordinates, setCoordinates] = useState<Coordinates>({
    latitude: 0,
    longitude: 0,
  });
  const [pointsGeoJson, setPointsGeoJson] =
    useState<FeatureCollection>(initialGeoJson);
  // const [markerSquareSize, setMarkerSquareSize] = useState<number>(0.027);
  const [currentPositionCords, setCurrentPositionCords] = useState<Coordinates>(
    { latitude: 0, longitude: 0 }
  );
  const [sliderValue, setSliderValue] = useState<number>(40);
  const markerCoords = useMemo(
    () => [coordinates?.longitude, coordinates?.latitude],
    [coordinates]
  );

  const [circleCoordinates, setCircleCoordinates] = useState<number[][]>(() => {
    const radiusInMeters = sliderValue * 100; // Convert slider value to meters
    const radiusInDegrees = radiusInMeters / 111320; // Convert meters to degrees (approximation)
    const numPoints = 64; // Number of points to define the circle
    const angleStep = (2 * Math.PI) / numPoints;
    const coordinates = [];

    for (let i = 0; i < numPoints; i++) {
      const angle = i * angleStep;
      const x =
        markerCoords[0] +
        (radiusInDegrees * Math.cos(angle)) /
          Math.cos(markerCoords[1] * (Math.PI / 180));
      const y = markerCoords[1] + radiusInDegrees * Math.sin(angle);
      coordinates.push([x, y]);
    }

    // Close the circle
    coordinates.push(coordinates[0]);

    return coordinates;
  });

  // Handle map click event
  const handleMapClick = (event: unknown) => {
    const mapClickEvent = event as MapClickEvent; // Type assertion
    if (mapClickEvent.coordinate) {
      const [longitude, latitude] = mapClickEvent.coordinate;
      setCoordinates({ latitude, longitude });
      setIsMarkerVisible(true);
    }
  };

  function convertToGeoJson(points: Point[]): GeoJSON {
    console.log("Points>>>", points);

    return {
      type: "FeatureCollection",
      features: points.map((point) => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            (point?.Longlat as CoordinatesForGeoJson)?.coordinates[0],
            (point?.Longlat as CoordinatesForGeoJson)?.coordinates[1],
          ],
        },
        properties: {
          Id: point.Id,
          Type: point.Type,
        },
      })),
    };
  }

  const fetchPointsFromDB = async (
    longitude: number,
    latitude: number,
    sliderValue: number
  ) => {
    console.log("fetchPointsFromDB>>>", longitude, latitude, sliderValue);
    const response = await fetch(
      `/api/points?long=${longitude}&lat=${latitude}&radius=${
        sliderValue * 100
      }`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const data = await response.json();
    const geoJson = convertToGeoJson(data?.response?.content);

    setPointsGeoJson(geoJson as FeatureCollection);
    console.log("GeoJson>>>", geoJson);
  };

  useEffect(() => {
    const radiusInMeters = sliderValue * 100; // Convert slider value to meters
    const radiusInDegrees = radiusInMeters / 111320; // Convert meters to degrees (approximation)
    const numPoints = 64; // Number of points to define the circle
    const angleStep = (2 * Math.PI) / numPoints;
    const coordinates = [];

    for (let i = 0; i < numPoints; i++) {
      const angle = i * angleStep;
      const x =
        markerCoords[0] +
        (radiusInDegrees * Math.cos(angle)) /
          Math.cos(markerCoords[1] * (Math.PI / 180));
      const y = markerCoords[1] + radiusInDegrees * Math.sin(angle);
      coordinates.push([x, y]);
    }

    // Close the circle
    coordinates.push(coordinates[0]);

    setCircleCoordinates(coordinates);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sliderValue, markerCoords]);

  useEffect(() => {
    // Fetch Mapbox API key from the server
    const fetchMapboxKey = async () => {
      const response = await fetch("/api/mapbox-token");
      const data = await response.json();
      setMapBoxApiKey(data.mapBoxApiKey);
    };
    fetchMapboxKey();
  }, []);

  // Queries
  useEffect(() => {
    fetchPointsFromDB(
      coordinates?.longitude,
      coordinates?.latitude,
      sliderValue
    );
    console.log(coordinates, sliderValue);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coordinates, sliderValue]);

  useEffect(() => {
    console.log(currentPositionCords);
  }, [currentPositionCords]);

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  function success(pos: GeolocationPosition) {
    const crd = pos.coords;
    setCurrentPositionCords({
      latitude: crd.latitude,
      longitude: crd.longitude,
    });
  }

  function error(err: unknown) {
    const geolocationError = err as GeolocationPositionError;
    console.warn(
      `ERROR(${geolocationError.code}): ${geolocationError.message}`
    );
  }

  // Get current position
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error, options);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const layerStyle: LayerProps = {
    id: "circle",
    type: "line",
    paint: {
      "line-color": "#007cbf", // Color of the circle outline
      "line-width": 2, // Width of the circle outline
      "line-opacity": 0.8, // Opacity of the circle outline
    },
  };

  return (
    <div>
      {mapBoxApiKey ? (
        <DeckGL
          effects={[lightingEffect]}
          initialViewState={INITIAL_VIEW_STATE}
          controller={true}
          onClick={handleMapClick}
        >
          <Map
            mapboxAccessToken={mapBoxApiKey}
            mapStyle="mapbox://styles/mapbox/streets-v12"
            antialias={true}
          >
            <Marker
              longitude={coordinates?.longitude}
              latitude={coordinates?.latitude}
              anchor="center"
            >
              <div>
                <FaLocationDot size={50} color="FFA15A" />
              </div>
            </Marker>
            <Marker
              latitude={currentPositionCords?.latitude}
              longitude={currentPositionCords?.longitude}
            >
              <div>
                <FaLocationDot size={35} color="blue" />
              </div>
            </Marker>
            <Source
              id="circle"
              type="geojson"
              data={{
                type: "Feature",
                geometry: {
                  type: "Polygon",
                  coordinates: [circleCoordinates],
                },
              }}
            >
              <Layer {...layerStyle} />
            </Source>
            <Source
              id="points"
              type="geojson"
              data={pointsGeoJson}
              cluster={true}
              clusterMaxZoom={14} // Max zoom to cluster points on
              clusterRadius={50}
            >
              <Layer
                id="clusters"
                type="symbol"
                layout={{
                  "icon-image": "parking-garage",
                  "icon-size": 1.5,
                  "icon-allow-overlap": true,
                }}
              />
              <Layer
                id="cluster-count"
                type="symbol"
                layout={{
                  "text-field": "{point_count_abbreviated}",
                  "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
                  "text-size": 12,
                }}
              />
              <Layer
                id="unclustered-point"
                type="symbol"
                layout={{
                  "icon-image": "parking-garage",
                  "icon-size": 1.5,
                  "icon-allow-overlap": true,
                }}
              />
            </Source>
          </Map>
        </DeckGL>
      ) : (
        <div className="absolute top-1/2 right-1/2">
          <Grid
            visible={true}
            height="80"
            width="80"
            color="#ffa15a"
            ariaLabel="grid-loading"
            radius="12.5"
            wrapperStyle={{}}
            wrapperClass="grid-wrapper"
          />
        </div>
      )}
      {isMarkerVisible && (
        <div className="absolute right-24 top-1/3 bg-white p-5 rounded-xl max-h-[400px] max-w-[450px] overflow-scroll">
          <div>
            <div className="text-2xl font-bold mb-5">Dashboard</div>
            <div className="space-y-4">
              <div className="p-2 rounded-xl">
                <div className="flex space-x-5 align-middle justify-between my-2">
                  <div className="text-xl font-medium">Parking</div>
                  <Badge variant="secondary" className="text-sm rounded-full">
                    {pointsGeoJson?.features?.length} Spots
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {mapBoxApiKey ? (
        <>
          <div className="absolute bg-transparent top-20 right-32 scale-125 transition-all">
            <div className="2xl:min-w-[200px] 2xl:max-w-[300px] bg-white rounded-xl ">
              <div className="px-2 py-4 space-y-2">
                <div className="space-y-1">
                  <label>Distance</label>
                  <Slider
                    onValueChange={(value) => setSliderValue(value[0])}
                    defaultValue={[sliderValue]}
                    max={100}
                    step={1}
                    className={cn("w-[60%]", className)}
                    {...props}
                  />
                </div>
                <div className="">
                  <span className="p-1">{sliderValue * 100} meters</span>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default LocationAggregatorMap;
