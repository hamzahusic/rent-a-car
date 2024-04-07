import React, { useContext, useEffect, useState } from "react";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";
import ResponsiveMenu from "./ResponsiveMenu";
import { Link } from "react-router-dom";
import UserContext from "../../context/userContext";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const {user,setUser} = useContext(UserContext);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div
      className="relative z-10 shadow-md w-full dark:bg-black dark:text-white duration-300">
      <div className="container py-2 md:py-4">
        <div className="flex justify-between items-center">
          <Link to={"/"}> 
            <span className="text-3xl font-bold font-serif">Car Rental</span>
          </Link>
          <nav className="hidden lg:block">
            <ul className="flex items-center gap-8">
              <li className="py-4">
                  <Link
                    to={"/"}
                    className=" text-lg font-medium  hover:text-primary py-2 hover:border-b-2 hover:border-primary transition-colors duration-500"
                  >
                    Početna
                  </Link>
              </li>

              <li className="py-4">
                  <Link
                    to={"/cars"}
                    className=" text-lg font-medium  hover:text-primary py-2 hover:border-b-2 hover:border-primary transition-colors duration-500"
                  >
                    Automobili
                  </Link>
              </li>

              <li className="py-4">
                  <Link
                    to={"/#about"}
                    className=" text-lg font-medium  hover:text-primary py-2 hover:border-b-2 hover:border-primary transition-colors duration-500"
                  >
                    O Nama
                  </Link>
              </li>

              {Object.keys(user).length !== 0 && user.uloga === "admin" && <li className="py-4">
                  <Link
                    to={"/admin/add"}
                    onClick={toggleMenu}
                    className=" text-lg font-medium  hover:text-primary py-2 hover:border-b-2 hover:border-primary transition-colors duration-500"
                  >
                    Dodaj Automobili
                  </Link>
              </li>}

              <li className="py-4">
                  {Object.keys(user).length === 0 && <Link
                    to={"/login"}
                    className=" text-lg font-medium  hover:text-primary py-2 hover:border-b-2 hover:border-primary transition-colors duration-500"
                  >
                    Log In
                  </Link>}
                  {Object.keys(user).length !== 0 && 
                  <Link
                    onClick={() => setUser({})}
                    className=" text-lg font-medium  hover:text-primary py-2 hover:border-b-2 hover:border-primary transition-colors duration-500"
                  >
                    Log Out
                  </Link>}
              </li>
            </ul>
          </nav>
          {/* Mobile view  */}
          <div className="flex items-center gap-4 lg:hidden ">
            {/* Mobile Hamburger icon */}
            {showMenu ? (
              <HiMenuAlt1
                onClick={toggleMenu}
                className=" cursor-pointer transition-all"
                size={30}
              />
            ) : (
              <HiMenuAlt3
                onClick={toggleMenu}
                className="cursor-pointer transition-all"
                size={30}
              />
            )}
          </div>
        </div>
      </div>
      <ResponsiveMenu showMenu={showMenu} toggleMenu={toggleMenu}/>
    </div>
  );
};

export default Navbar;
