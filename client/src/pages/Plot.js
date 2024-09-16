import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Auth from "../utils/auth";

const Plot = () => {
    const [userLocation, setUserLocation] = useState(null);
    const [locationName, setLocationName] = useState({ name: null });
    const { map_name, map_id } = useParams();
    const [token, setToken] = useState(null);

    useEffect(() => {
        const userToken = Auth.getToken();
        setToken(userToken);
        if (!userToken) {
            window.location.assign("/login");
        }
    }, []);

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

    const post_coordinates = async () => {
        try {
            const response = await fetch("/api/coordinate/create_coordiante/", {
                mode: "cors",
                method: "POST",
                body: JSON.stringify({
                    name: locationName.name,
                    latitude: userLocation.latitude,
                    longitude: userLocation.longitude,
                    map_id
                }),
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (response.ok) {
                window.location.assign("/dashboard");
            } else throw new Error(data.error);
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post_coordinates();
    };

    const onChange = event => {
        setLocationName({ ...locationName, [event.target.name]: event.target.value });
    };

    return (
        <div className='relative flex flex-col justify-center h-[calc(100vh-66px)] overflow-hidden px-2'>
            <div className="flex flex-col justify-center w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl dark:bg-gray-800">
                <button onClick={getUserLocation} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                    Get Your Coordinates
                </button>
                {userLocation && (
                    <form onSubmit={handleSubmit} className="mt-6">
                        <div className="mb-2">
                            <label
                                htmlFor="name"
                                className="block text-sm font-semibold text-gray-800 dark:text-[#fdf8ad]"
                            >
                                Location Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                onChange={onChange}
                                required
                                className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>
                        <div className="mb-2">
                            <label
                                htmlFor="latitude"
                                className="block text-sm font-semibold text-gray-800 dark:text-[#fdf8ad]"
                            >
                                Current Latitude
                            </label>
                            <input
                                type="text"
                                name="latitude"
                                value={userLocation.latitude || ''}
                                required
                                readOnly
                                className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>
                        <div className="mb-2">
                            <label
                                htmlFor="longitude"
                                className="block text-sm font-semibold text-gray-800 dark:text-[#fdf8ad]"
                            >
                                Current Longitude
                            </label>
                            <input
                                type="text"
                                name="longitude"
                                value={userLocation.longitude || ''}
                                required
                                readOnly
                                className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>
                        <div className="mt-6">
                            <button
                                type="submit"
                                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Plot;