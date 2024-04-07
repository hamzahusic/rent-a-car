import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/userContext";

const ResponsiveMenu = ({ showMenu , toggleMenu}) => {

  const {user,setUser} = useContext(UserContext);

  return (
    <div
      className={`${
        showMenu ? "left-0" : "-left-[100%]"
      } fixed bottom-0 top-0 z-20 flex h-screen w-[75%] flex-col justify-between bg-white dark:bg-gray-900 dark:text-white px-8 pb-6 pt-16 text-black transition-all duration-200 lg:hidden rounded-r-xl shadow-md`}
    >
      <div className="card">
        <nav className="mt-12">
          <ul className="space-y-4 text-xl">
            <li className="py-4">
                  <Link
                    to={"/"}
                    onClick={toggleMenu}
                    className=" text-lg font-medium  hover:text-primary py-2 hover:border-b-2 hover:border-primary transition-colors duration-500"
                  >
                    Početna
                  </Link>
              </li>

              <li className="py-4">
                  <Link
                    to={"/cars"}
                    onClick={toggleMenu}
                    className=" text-lg font-medium  hover:text-primary py-2 hover:border-b-2 hover:border-primary transition-colors duration-500"
                  >
                    Automobili
                  </Link>
              </li>

              <li className="py-4">
                  <Link
                    to={"/#about"}
                    onClick={toggleMenu}
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
                    onClick={toggleMenu}
                    className=" text-lg font-medium  hover:text-primary py-2 hover:border-b-2 hover:border-primary transition-colors duration-500"
                  >
                    Log In
                  </Link>}
                  {Object.keys(user).length !== 0 && 
                  <Link
                    onClick={() => {setUser({});toggleMenu()}}
                    className=" text-lg font-medium  hover:text-primary py-2 hover:border-b-2 hover:border-primary transition-colors duration-500"
                  >
                    Log Out
                  </Link>}
              </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default ResponsiveMenu;
