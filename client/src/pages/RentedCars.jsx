import { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import UserContext from "../context/userContext";
import { useNavigate } from "react-router";

const RentedCars = () => {

    const [rentedCars,setRentedCars] = useState([])
    const [error,setError] = useState("")
    const [loading,setLoading] = useState(true)
    const {user} = useContext(UserContext)
    const navigate = useNavigate();
    
    const getAllRentedCars = async () => {
        setLoading(true)
        const request = await fetch('http://localhost:8000/car/allrentedcars')

        if(!request.ok){
            setError("Greska prilikom dobijanja automobila")
            return
        }

        const response = await request.json()

        setRentedCars(response.data)
        setLoading(false)
    }

    useEffect(()=>{
        if(!user || user.uloga !== "admin"){
            navigate("/");
        }
        getAllRentedCars()
    },[])

    
    return ( 
    <>
        <Navbar/>
        <div className="max-w-5xl mx-auto my-10 min-h-[50vh]">
            <h1 className=" text-lg font-bold">ALL RENTED CARS</h1>
            <div className="py-3">
                {loading && <p>Loading...</p>}
                {error && !loading && <p>Ooops, Greska prilikom dobijanja automobila!</p>}
                {rentedCars.length == 0 && !loading && <p>Nema iznajmljenih automobila</p>}
                {!loading && rentedCars && rentedCars.length > 0 && !error && 
                    rentedCars.map((car) => (
                        <div key={car.id} className="bg-gray-200/90 py-2 px-8 mb-3 rounded-md flex items-center justify-start gap-10">
                            <img src={`/uploads/${car.slika}`} className="max-w-[320px]"/>
                            <div className=" flex items-baseline justify-evenly w-full">
                                <div className="bg-white p-5 rounded-md">
                                    <p className=" font-semibold text-lg pb-2">{car.naziv}</p>
                                    <p>Pocetak iznajmljivanja : <span className=" font-semibold">{new Date(car.pocetak_iznajmljivanja).toLocaleDateString('de-DE')}</span></p>
                                    <p>Kraj iznajmljivanja : <span className=" font-semibold">{new Date(car.kraj_iznajmljivanja).toLocaleDateString('de-DE')}</span></p>
                                    <p>Ukupna cijena : <span className=" font-semibold">{car.ukupna_cijena}$</span></p>
                                </div>          
                                <div className="bg-white p-5 rounded-md">
                                    <p className=" font-semibold text-lg pb-2">Podatci klijenta</p>
                                    <p>Ime : {car.ime}</p>
                                    <p>Prezime : {car.prezime}</p>
                                    <p>Email : {car.email}</p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
        <Footer/>
    </> 
    );
}
 
export default RentedCars;