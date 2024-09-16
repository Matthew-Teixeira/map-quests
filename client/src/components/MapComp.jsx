import React, { useState, useEffect } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MapComp = ({ coordinates }) => {
  const [selectedMarker, setSelectedMarker] = useState(null); // Store the clicked marker info

  const [viewport, setViewport] = useState({
    latitude: coordinates[0].latitude, // Default location (e.g., San Francisco)
    longitude: coordinates[0].longitude,
    zoom: 11
  });

  const mapboxToken = process.env.REACT_APP_MAPBOX_TOKEN; // Replace with your Mapbox token

  return (
    <div style={{ height: `calc(100vh - 88px)`, width: "100%" }}>
      <Map
        initialViewState={viewport}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
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
                  borderRadius: "50%",
                  cursor: 'pointer'
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
