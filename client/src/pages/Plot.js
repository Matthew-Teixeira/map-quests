import React, { useState } from 'react';

const Plot = () => {
    const [userLocation, setUserLocation] = useState(null);
    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ latitude, longitude });
                },
                (error) => {
                    console.error('Error getting user location:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported.');
        }
    };
    return (
        <>
            <div>Plot</div>
            <button onClick={getUserLocation} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Get User Location
            </button>
            {userLocation && (
                <div>
                    <h2>User Location</h2>
                    <p>Latitude: {userLocation.latitude}</p>
                    <p>Longitude: {userLocation.longitude}</p>
                </div>
            )}
        </>

    );
};

export default Plot;