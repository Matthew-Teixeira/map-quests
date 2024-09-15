import React, { useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MapComp = ({ coordinates }) => {
  const [selectedMarker, setSelectedMarker] = useState(null); // Store the clicked marker info

  const [viewport, setViewport] = useState({
    latitude: 37.7749, // Default location (e.g., San Francisco)
    longitude: -122.4194,
    zoom: 10
  });

  const mapboxToken = process.env.REACT_APP_MAPBOX_TOKEN; // Replace with your Mapbox token
  console.log("\n\nmapboxToken");
  console.log(mapboxToken);
  console.log("\n\nmapboxToken");
  return (
    <div style={{ height: "500px", width: "100%" }}>
      <Map
        initialViewState={viewport}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={mapboxToken}
        onClick={() => setSelectedMarker(null)} // Deselect popup on map click
      >
        {coordinates.map((coord, index) => (
          <div key={index}>
            <Marker
              longitude={coord.longitude}
              latitude={coord.latitude}
              onClick={(e) => {
                e.originalEvent.stopPropagation(); // Prevent click event from propagating to the map
                setSelectedMarker(coord); // Set the clicked marker as selected
              }}
            >
              <div
                style={{
                  backgroundColor: "red",
                  height: "10px",
                  width: "10px",
                  borderRadius: "50%"
                }}
              />
            </Marker>

            {selectedMarker &&
              selectedMarker.longitude === coord.longitude &&
              selectedMarker.latitude === coord.latitude && (
                <Popup
                  longitude={coord.longitude}
                  latitude={coord.latitude}
                  onClose={() => setSelectedMarker(null)} // Close popup when clicked outside
                  closeOnClick={true}
                >
                  <div>{coord.name}</div>{" "}
                  {/* Display the name associated with the coordinates */}
                </Popup>
              )}
          </div>
        ))}
      </Map>
    </div>
  );
};

export default MapComp;
