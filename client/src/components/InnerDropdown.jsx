import React from "react";
import { Link } from "react-router-dom";

const InnerDropdown = ({ list }) => {
  return (
    <ul className="absolute md:right-[-30px] top-8 w-[150px] rounded-md py-2 shadow-xl dark:bg-gray-800 dark:text-[#fdf8ad]">
      {
            list.map((link) => (
              <li key={link.name} className="ml-2 text-lg my-2">
                <Link to={link.link}>{link.name}</Link>
              </li>
            ))
          }
    </ul>
  );
};

export default InnerDropdown;