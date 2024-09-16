import React from "react";
import { Link } from "react-router-dom";

const DashMapCard = ({ map_data }) => {
  return (
    <div className="w-full md:w-[300px] overflow-hidden rounded-xl bg-white shadow-md duration-300 hover:shadow-xl p-4 my-4 md:mx-4">
      <h2 className="text-xl font-bold text-center mb-2">
        Map: {map_data.name}
      </h2>
      <p className="font-medium">
        Last Updated: <span className="font-normal">{map_data.updatedAt}</span>
      </p>
      <p className="font-medium">
        Coordinate Count:{" "}
        <span className="font-normal">{map_data.coordinates.length}</span>
      </p>
      <div className="p-5">
        <Link to={`/map/${map_data._id}`}>
          <button className="w-full rounded-md bg-[#337499]  py-2 text-indigo-100 hover:bg-[#4f90b6] hover:shadow-lg duration-75 text-lg">
            View Map
          </button>
        </Link>
      </div>
      <div className="px-5">
        <Link to={`/plot/${map_data.name}/${map_data._id}`}>
          <button className="w-full rounded-md py-2 hover:shadow-lg duration-75 text-lg bg-green-500 hover:bg-green-600 font-semibold">
            Add Coordinates
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DashMapCard;
