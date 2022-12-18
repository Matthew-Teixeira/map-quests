import React from "react";
import { Link } from "react-router-dom";

const InnerDropdown = ({ list }) => {
  return (
    <ul className="absolute md:right-[-30px] top-8 w-[150px] bg-[#198db1] rounded-md py-2 border-[1px] border-[#00273d] shadow-2xl">
      {
            list.map((link) => (
              <li key={link.name} className="ml-2 text-lg my-2">
                <Link to={link.link} className="hover:text-gray-800 duration-200 font-semibold">{link.name}</Link>
              </li>
            ))
          }
    </ul>
  );
};

export default InnerDropdown;