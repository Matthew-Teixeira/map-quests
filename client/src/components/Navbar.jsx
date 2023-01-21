import { useState } from "react";
import {
  FaBars,
  FaRegWindowClose,
  FaChevronDown,
  FaChevronUp
} from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import InnerDropdown from "./InnerDropdown";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";
import Switcher from "./Switcher";

const Navbar = () => {
  const loggedIn = Auth.loggedIn();
  // Define links for Service dropdown menu
  let Links = [
    { name: "Buy", link: "/" },
    { name: "Sell", link: "/" },
    { name: "Portfolio", link: "/" }
  ];
  let [open, setOpen] = useState(false);
  let [dropdown, setDropdown] = useState(false);

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <nav className="shadow-md relative w-full bg-blue-500 dark:bg-gray-800 dark:text-[#fdf8ad]">
      <div className="md:flex justify-between py-2 px-6">
        <div className="flex items-center">
          <Switcher />
          <div className="font-bold text-2xl cursor-pointer mx-auto pr-[30px]">
            <Link to={"/home"}>Coin-Vault</Link>
          </div>
        </div>

        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 top-5 cursor-pointer md:hidden"
        >
          {open ? <FaRegWindowClose /> : <FaBars />}
        </div>
        <ul
          className={`md:flex md:items-center md:pb-0 pb-4 md:static dark:bg-gray-800 absolute md:z-auto z-[1] left-0 w-full md:w-auto md:pl-0 pl-4 ${
            open
              ? "top-[60px] opacity-100 border-b-2 dark:bg-gray-800"
              : "top-[-500px] opacity-0"
          } md:opacity-100`}
        >
          {loggedIn ? (
            <li className="md:ml-8 text-xl md:my-0 my-6">
              <a
                href="/dashboard"
                className="hover:text-gray-800 dark:hover:text-gray-200 duration-200 font-semibold"
              >
                Dashboard
              </a>
            </li>
          ) : (
            <li className="md:ml-8 text-xl md:my-0 my-6">
              <a
                href="/"
                className="hover:text-gray-800 dark:hover:text-gray-200 duration-200 font-semibold"
              >
                Home
              </a>
            </li>
          )}
          <div className="relative" onClick={() => setDropdown(!dropdown)}>
            <div className="flex items-center cursor-pointer">
              <li className="md:ml-8 text-xl md:my-0 mr-1 hover:text-gray-800 dark:hover:text-gray-200 duration-200 font-semibold">
                Products
              </li>
              {dropdown ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {dropdown ? <InnerDropdown list={Links} /> : false}
          </div>
          {loggedIn ? (
            <>
              <li className="md:ml-8 text-xl md:my-0 my-6">
                <Link
                  to={"/"}
                  onClick={logout}
                  className="hover:text-gray-800 dark:hover:text-gray-200 duration-200 font-semibold"
                >
                  Logout
                </Link>
              </li>
              <Link to={"/settings"}>
                <div className="flex items-center ml-6">
                  <FiSettings />
                </div>
              </Link>
            </>
          ) : (
            <>
              <li className="md:ml-8 text-xl md:my-0 my-6">
                <a
                  href="/login"
                  className="hover:text-gray-800 dark:hover:text-gray-200 duration-200 font-semibold"
                >
                  Login
                </a>
              </li>
              <li className="md:ml-8 text-xl md:my-0 my-6">
                <Link
                  to={"/register"}
                  className="hover:text-gray-800 dark:hover:text-gray-200 duration-200 font-semibold"
                >
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
