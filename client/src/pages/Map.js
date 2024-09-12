import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Auth from "../utils/auth";

const Map = () => {
    const { map_id } = useParams();
    const [mapData, setMapData] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const userToken = Auth.getToken();
        setToken(userToken);
        if (!userToken) {
            window.location.assign("/login");
        }
    }, []);

    useEffect(() => {
        async function get_user_map() {
            try {
                const response = await fetch(`/api/maps/map/${map_id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                });

                const data = await response.json();

                if (response.ok) {
                    console.log(data);
                    setMapData(data);
                } else throw new Error(data.error);
            } catch (error) {
                console.log("\n**** error ****\n");
                console.log(error);
            }
        }

        get_user_map();
    }, [token]);

    return (
        <div>Map</div>
    );
};

export default Map;