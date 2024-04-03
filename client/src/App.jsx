import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Component import
import Home from "./pages/home";
import LogIn from './pages/login'
import Register from './pages/register'
import AllCars from "./pages/cars";
import CarPost from "./pages/car";
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
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cars" element={<AllCars />} />
          <Route path="/car/:id" element={<CarPost />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
