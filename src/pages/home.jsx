import About from "../components/About/About";
import CarList from "../components/CarList/CarList";
import Footer from "../components/Footer/Footer";
import Hero from "../components/Hero/Hero";
import Navbar from "../components/Navbar/Navbar";
import Services from "../components/Services/Services";
import Testimonial from "../components/Testimonial/Testimonial";

import whiteCar from "../assets/white-car.png";
import car2 from "../assets/car5.png";
import car3 from "../assets/car6.png";

const carList = [
    {
      name: "BMW UX",
      price: 100,
      image: whiteCar,
      aosDelay: "0",
    },
    {
      name: "KIA UX",
      price: 140,
      image: car2,
      aosDelay: "500",
    },
    {
      name: "BMW UX",
      price: 100,
      image: car3,
      aosDelay: "1000",
    },
];

const Home = () => {
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