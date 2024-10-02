import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Auth from "../utils/auth";
import MapComp from '../components/MapComp';

const Map = () => {
    const { map_id } = useParams();
    const [mapData, setMapData] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

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
                    mode: "cors",
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                        Authorization: `Bearer ${token}`
                    }
                });

                const data = await response.json();

                if (response.ok && !data.error) {
                    console.log("\ndata.coordinates");
                    console.log(data.coordinates);
                    setMapData(data.coordinates);
                    setLoading(false);
                } else throw new Error(data.error);
            } catch (error) {
                console.log("\n**** error ****\n");
                console.log(error);
            }
        }

        get_user_map();
    }, [token]);


    return (
        <div>
            {loading ? (<p>LOADING...</p>) : (<MapComp coordinates={mapData} />)
            }
        </div>
    );
};

export default Map;