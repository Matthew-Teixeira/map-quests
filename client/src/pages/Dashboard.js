import { useState, useEffect } from 'react';
import Auth from "../utils/auth";
import DashMapCard from "../components/DashMapCard";
import { DateTime } from 'luxon';

const Dashboard = () => {
  const [token, setToken] = useState(null);
  const [mapData, setMapData] = useState(null);

  useEffect(() => {
    const userToken = Auth.getToken();
    setToken(userToken);
    if (!userToken) {
      window.location.assign("/login");
    }
  }, []);

  useEffect(() => {
    async function get_user_maps() {
      try {
        console.log(token);
        if (token) {
          const response = await fetch("/api/maps/my_maps/", {
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
            console.log(data);
            console.log(data.maps[0].updatedAt);
            setMapData(data.maps);
          } else throw new Error(data.error);
        }
      } catch (error) {
        console.log("\n**** error ****\n");
        console.log(error);
      }
    };

    get_user_maps();
  }, [token]);


  // <DashMapCard key={maps._id} map_data={maps}/>

  return (
    <div>
      <h2 className='text-center font-bold text-2xl'>Your Maps</h2>
      <div className='flex justify-center flex-wrap'>
        {mapData ? (
          mapData.map((m) => (
            m.updatedAt = DateTime.fromISO(m.updatedAt).toISODate(),
            <DashMapCard key={m._id} map_data={m} />
          ))
        ) : (<p>No Maps</p>)
        }
      </div>
    </div>

  );
};

export default Dashboard;