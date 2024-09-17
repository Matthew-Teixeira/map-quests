import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import CreatMapModal from "../components/modals/CreateMapModal";

export const CreateNewMap = () => {
    const [token, setToken] = useState(null);
    const [formData, setFormData] = useState({
        map_name: null
    });

    useEffect(() => {
        const userToken = Auth.getToken();
        setToken(userToken);
        if (!userToken) {
            window.location.assign("/login");
        }
    }, []);

    const create_map = async (map_name) => {
        try {
            const response = await fetch("/api/maps/create_map", {
                mode: "cors",
                method: "POST",
                body: JSON.stringify({
                    map_name
                }),
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (response.ok) {
                // window.location.assign("/dashboard");
            } else throw new Error(data.error);
        } catch (error) {
            console.log(error.message);
        }
    };

    const onChange = event => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const onSubmit = event => {
        event.preventDefault();
        create_map(formData.map_name);
    };



    return (
        <div className="relative flex flex-col justify-center h-[calc(100vh-66px)] overflow-hidden px-2">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl dark:bg-gray-800">
                <h1 className="text-3xl font-semibold text-center underline dark:text-[#fdf8ad]">
                    Create A New Map
                </h1>
                <form onSubmit={onSubmit} className="mt-6">
                    <div className="mb-2">
                        <label
                            for="map_name"
                            className="block text-sm font-semibold text-gray-800 dark:text-[#fdf8ad]"
                        >
                            Map Name
                        </label>
                        <input
                            type="text"
                            name="map_name"
                            onChange={onChange}
                            required
                            className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mt-6">
                        <CreatMapModal map_name={formData.map_name}/>
                    </div>
                </form>
            </div>
        </div>
    );
};
