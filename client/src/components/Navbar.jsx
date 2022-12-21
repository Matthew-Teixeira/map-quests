import { useState, useContext } from "react";
import {
  FaBars,
  FaRegWindowClose,
  FaChevronDown,
  FaChevronUp,
  FaShoppingCart
} from "react-icons/fa";
import InnerDropdown from "./InnerDropdown";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";
import CartContext from "../context/CartContext";
import Switcher from "./Switcher";

const Navbar = () => {
  const { items } = useContext(CartContext);

  const loggedIn = Auth.loggedIn();
  // Define links for Service dropdown menu
  let Links = [
    { name: "All Products", link: "/products" },
    { name: "Sports", link: "/products/sports" },
    { name: "Office", link: "/products/office" },
    { name: "Settings", link: "/settings" }
  ];
  let [open, setOpen] = useState(false);
  let [dropdown, setDropdown] = useState(false);

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <nav className="shadow-md relative w-full bg-[#009fcf] dark:bg-[#4b4b4b]">
      <div className="md:flex justify-between py-4 md:px-10 px-4">
        <div className="flex items-center font-bold text-2xl cursor-pointer">
          <Link to={"/home"}>My-Amazona</Link>
          <Switcher/>
        </div>
        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 top-5 cursor-pointer md:hidden"
        >
          {open ? <FaRegWindowClose /> : <FaBars />}
        </div>
        <ul
          className={`md:flex md:items-center md:pb-0 pb-4 md:static bg-[#009fcf] dark:bg-[#4b4b4b] absolute md:z-auto z-[1] left-0 w-full md:w-auto md:pl-0 pl-4 ${
            open
              ? "top-[60px] opacity-100 border-b-2 bg-[#198db1] dark:bg-[#4b4b4b]"
              : "top-[-500px] opacity-0"
          } md:opacity-100`}
        >
          {loggedIn ? (
            <li className="md:ml-8 text-xl md:my-0 my-6">
              <a
                href="/dashboard"
                className="hover:text-gray-800 duration-200 font-semibold"
              >
                Dashboard
              </a>
            </li>
          ) : (
            <li className="md:ml-8 text-xl md:my-0 my-6">
              <a
                href="/"
                className="hover:text-gray-800 duration-200 font-semibold"
              >
                Home
              </a>
            </li>
          )}
          <div className="relative" onClick={() => setDropdown(!dropdown)}>
            <div className="flex items-center cursor-pointer">
              <li className="md:ml-8 text-xl md:my-0 mr-1 hover:text-gray-800 duration-200 font-semibold">
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
                  to={"/upload_images"}
                  className="hover:text-gray-800 duration-200 font-semibold mr-8"
                >
                  Image Upload
                </Link>
                <Link
                  to={"/"}
                  onClick={logout}
                  className="hover:text-gray-800 duration-200 font-semibold"
                >
                  Logout
                </Link>
              </li>
              <Link to={"/cart"}>
                <div className="flex items-center ml-6">
                  <FaShoppingCart />
                  <span className="ml-1">{items.length}</span>
                </div>
              </Link>
            </>
          ) : (
            <>
              <li className="md:ml-8 text-xl md:my-0 my-6">
                <a
                  href="/login"
                  className="hover:text-gray-800 duration-200 font-semibold"
                >
                  Login
                </a>
              </li>
              <li className="md:ml-8 text-xl md:my-0 my-6">
                <a
                  href="/register"
                  className="hover:text-gray-800 duration-200 font-semibold"
                >
                  Sign Up
                </a>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
