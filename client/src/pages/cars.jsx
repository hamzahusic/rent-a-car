import CarList from '../components/CarList/CarList';
import Navbar from '../components/Navbar/Navbar'
import whiteCar from "../assets/white-car.png";
import car2 from "../assets/car5.png";
import car3 from "../assets/car6.png";
import Footer from '../components/Footer/Footer';

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
      aosDelay: "200",
    },
    {
      name: "BMW UX",
      price: 100,
      image: car3,
      aosDelay: "400",
    },
      {
        name: "BMW UX",
        price: 100,
        image: whiteCar,
        aosDelay: "600",
      },
      {
        name: "KIA UX",
        price: 140,
        image: car2,
        aosDelay: "800",
      },
      {
        name: "BMW UX",
        price: 100,
        image: car3,
        aosDelay: "1000",
      },
      {
        name: "BMW UX",
        price: 100,
        image: whiteCar,
        aosDelay: "1200",
      },
      {
        name: "KIA UX",
        price: 140,
        image: car2,
        aosDelay: "1400",
      },
      {
        name: "BMW UX",
        price: 100,
        image: car3,
        aosDelay: "1600",
      },
];

const AllCars = () => {
    return ( 
        <div className=' '>
            <Navbar/>
            <div className='mt-10'>
                <CarList showBtn={false} carList={carList}/>
            </div>
            <Footer/>
        </div>
     );
}
 
export default AllCars;