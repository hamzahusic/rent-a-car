import CarList from '../components/CarList/CarList';
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer';
import { useEffect, useState } from 'react';
import axios from 'axios';
import whiteCar from "../assets/white-car.png";

const AllCars = () => {

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
      setCarList(request.data.data);
    }

    useEffect(() => {
      window.scrollTo(0, 0)
      getCars();
    },[])

    return ( 
        <div>
            <Navbar/>
            <div className='mt-10'>
                <CarList showBtn={false} carList={carList} setCarList={setCarList}/>
            </div>
            <Footer/>
        </div>
     );
}
 
export default AllCars;