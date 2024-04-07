import About from "../components/About/About";
import CarList from "../components/CarList/CarList";
import Footer from "../components/Footer/Footer";
import Hero from "../components/Hero/Hero";
import Navbar from "../components/Navbar/Navbar";
import Services from "../components/Services/Services";
import Testimonial from "../components/Testimonial/Testimonial";
import axios from 'axios'

import whiteCar from "../assets/white-car.png";
import { useEffect, useState } from "react";

const Home = () => {

    const [carList,setCarList] = useState([
      {
        name: "BMW UX",
        price: 100,
        image: whiteCar,
        aosDelay: "0",
      }
    ])

    const getCars = async () => {
      const request = await axios.get('http://localhost:8000/car/all');
      setCarList(request.data.data.slice(0,3));
    }

    useEffect(() => {
      getCars();
    },[])

    return (  
        <div className="bg-white dark:bg-black dark:text-white text-black overflow-x-hidden dark">
            <Navbar />
            <Hero />
            <About />
            <Services />
            <CarList showBtn={true} carList={carList}/>
            <Testimonial />
            <Footer />
        </div>
    );
}
 
export default Home;