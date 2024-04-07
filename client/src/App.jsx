import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Component import
import Home from "./pages/home";
import LogIn from './pages/login'
import Register from './pages/register'
import AllCars from "./pages/cars";
import CarPost from "./pages/car";
import AddCarForm from "./pages/AddCar";
import EditCarForm from "./pages/EditCar";
import UserContext from "./context/userContext";
const App = () => {

  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
      once:true
    });
  }, []);

  const [user,setUser] = useState({});

  return (
    <div>
      <UserContext.Provider value={{user,setUser}}>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cars" element={<AllCars />} />
            <Route path="/car/:id" element={<CarPost />} />
            <Route path="/admin/add" element={<AddCarForm />} />
            <Route path="/admin/edit/:id" element={<EditCarForm />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
};

export default App;
