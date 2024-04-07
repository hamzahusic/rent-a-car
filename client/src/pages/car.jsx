import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import Modal from 'react-modal';
import { useContext, useEffect, useState } from 'react';
import { IoCloseCircleOutline } from "react-icons/io5";
import { FaRegCheckCircle } from "react-icons/fa";
import { VscError } from "react-icons/vsc";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";

import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import UserContext from '../context/userContext';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

const CarPost = () => {

    const [carData,setCarData] = useState([])
    const [modalIsOpen, setIsOpen] = useState(false);
    const [date1,setDate1] = useState('');
    const [date2,setDate2] = useState('');
    const [ukupna_cijena,setUkupnaCijena] = useState(0);
    const [error,setError] = useState(false);
    
    const {user} = useContext(UserContext);
    const navigate = useNavigate();
    const {id} = useParams();

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setError(false);
        setIsOpen(false);
    }

    const getCar = async () => {
        const request = await axios.get(`http://localhost:8000/car/${id}`)
        console.log(request.data.data[0])
        setCarData(request.data.data[0]);
    }

    const handleRent = () => {

        if(date1=='' || date2 =='') return;

        const oneDay = 24 * 60 * 60 * 1000;
        
        const firstDate = new Date(date1);
        const secondDate = new Date(date2);

        const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));

        if(secondDate<firstDate){
            setError(true);
            openModal();
            return;
        }

        setUkupnaCijena(diffDays * carData.cijena_po_danu);
        openModal();
    }

    const handleDelete = async () => {

        try {
           await axios.delete(`http://localhost:8000/car/?id=${id}&slika=${carData.slika}`,)
        } catch (error) {
            alert("Greška prilikom brisanja automobila");
            return;
        }
        navigate('/cars');
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        getCar();
    },[])

    return ( 
        <div>
            <Navbar/>
            <div className='container flex flex-col lg:flex-row items-center my-20 md:my-44'>
                <img src={'/uploads/' + carData.slika} alt="" className='max-w-[600px]' />
                <div>
                    <h2 className=' font-bold text-4xl'>{carData.naziv}</h2>
                    {user && user.uloga == "admin" &&<div className=' flex items-center gap-3 mt-2'>
                        <Link to={`/admin/edit/${carData.id}`}>
                            <button className=' flex items-center gap-2 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600'>
                                <CiEdit size={20}/>
                                Edit
                            </button>
                        </Link>
                        <button className=' flex items-center gap-2 py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600'
                            onClick={handleDelete}
                        >
                            <MdDeleteForever size={20}/>
                            Delete
                        </button>
                    </div>}
                    <p className='py-7'>{carData.opis}</p>
                    <h2 className=' font-bold text-2xl pb-5'>${carData.cijena_po_danu}/day</h2>
                    <div className='flex gap-2 items-center flex-wrap text-sm'>
                        <p className='px-3 py-1 rounded border-[1px] border-gray-300'>Proizvođač : {carData.proizvodjac}</p>
                        <p className='px-3 py-1 rounded border-[1px] border-gray-300'>Broj sjedišta : {carData.mjesta}</p>
                        <p className='px-3 py-1 rounded border-[1px] border-gray-300'>Transmisija : {carData.transmisija}</p>
                        <p className='px-3 py-1 rounded border-[1px] border-gray-300'>Pogon : {carData.pogon}</p>
                        <p className='px-3 py-1 rounded border-[1px] border-gray-300'>Kategorija : {carData.kategorija}</p>
                    </div>
                    {Object.keys(user).length !==0 && <div className='mt-10 flex flex-wrap flex-col lg:flex-row gap-5 lg:items-center'>
                        <label htmlFor="pocetak">Od :</label>
                        <input type="date" name="pocetak" onChange={(e) => setDate1(e.target.value)} id="pocetak" className='px-4 py-2 border-[1px] border-gray-300'/>
                        <label htmlFor="kraj">Do :</label>
                        <input type="date" name="kraj" id="kraj" onChange={(e) => setDate2(e.target.value)} className='px-4 py-2 border-[1px] border-gray-300'/>
                        <button className=' bg-black text-white px-4 py-2 rounded' onClick={handleRent}>Iznajmi automobil</button>
                            
                        <Modal
                            isOpen={modalIsOpen}
                            onRequestClose={closeModal}
                            style={customStyles}
                            ariaHideApp={false}
                        >
                            <button onClick={closeModal} className=' w-full grid place-items-end'><IoCloseCircleOutline size={25}/></button>
                            <div>
                                {!error && <FaRegCheckCircle size={110} className=' text-green-500 text-center w-full'/>}
                                {error && <VscError  size={110} className=' text-red-500 text-center w-full'/>}
                                <h2 className=' font-semibold pt-4 text-xl'>{error ? "Unesite validne datume!" :"Uspješno iznajmljen automobil!"} </h2>
                                {!error && <p className=' text-sm text-center'>(Uskoro očekujte poziv)</p>}
                                {!error && <h2 className=' font-medium pt-4 text-center'>Ukupna cijena : {ukupna_cijena}KM za {ukupna_cijena/carData.cijena_po_danu} dana</h2>}
                                <h2 className='pt-5 text-center text-sm inline-block'><span className=' font-semibold'>Početni datum : </span> {date1}</h2> <br />
                                <h2 className='pt-1 text-center text-sm inline-block'> <span className=' font-semibold'>Krajnji datum : </span> {date2}</h2>
                            </div>
                        </Modal>
                    </div>}
                </div>
            </div>
            <Footer/>
        </div>
     );
}
 
export default CarPost;