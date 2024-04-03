import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import car5 from '../assets/car5.png'
import Modal from 'react-modal';
import { useState } from 'react';
import { IoCloseCircleOutline } from "react-icons/io5";
import { FaRegCheckCircle } from "react-icons/fa";

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

    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    return ( 
        <div>
            <Navbar/>
            <div className='container flex flex-col lg:flex-row items-center my-20 md:my-44'>
                <img src={car5} alt="" className='max-w-[600px]' />
                <div>
                    <h2 className=' font-bold text-4xl'>Škoda Fabia</h2>
                    <p className='py-7'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia quia beatae ab doloremque vitae praesentium ipsum cum,
                     obcaecati mollitia velit, ex hic quaerat vero reiciendis? Expedita odio molestias itaque unde hic dolor distinctio voluptate nisi perferendis,
                      laborum sint praesentium, sed amet. Laudantium ipsam, alias voluptatibus repudiandae corrupti deleniti itaque assumenda.</p>
                    <h2 className=' font-bold text-2xl pb-5'>$100/day</h2>
                    <div className='flex gap-2 items-center flex-wrap text-sm'>
                        <p className='px-3 py-1 rounded border-[1px] border-gray-300'>Proizvodjač : Volkswagen</p>
                        <p className='px-3 py-1 rounded border-[1px] border-gray-300'>Broj sjedišta : 4</p>
                        <p className='px-3 py-1 rounded border-[1px] border-gray-300'>Transmisija : Manuelni</p>
                        <p className='px-3 py-1 rounded border-[1px] border-gray-300'>Pogon : Prednji</p>
                        <p className='px-3 py-1 rounded border-[1px] border-gray-300'>Kategorija : SUV</p>
                    </div>
                    <div className='mt-10 flex flex-wrap flex-col lg:flex-row gap-5 lg:items-center'>
                        <label htmlFor="pocetak">Od :</label>
                        <input type="date" name="pocetak" id="pocetak" className='px-4 py-2 border-[1px] border-gray-300'/>
                        <label htmlFor="kraj">Do :</label>
                        <input type="date" name="kraj" id="kraj" className='px-4 py-2 border-[1px] border-gray-300'/>
                        <button className=' bg-black text-white px-4 py-2 rounded' onClick={openModal}>Iznajmi automobil</button>
                            
                        <Modal
                            isOpen={modalIsOpen}
                            onRequestClose={closeModal}
                            style={customStyles}
                            ariaHideApp={false}
                        >
                            <button onClick={closeModal} className=' w-full grid place-items-end'><IoCloseCircleOutline size={25}/></button>
                            <div>
                                <FaRegCheckCircle size={110} className=' text-green-500 text-center w-full'/>
                                <h2 className=' font-semibold pt-4 text-xl'>Uspješno iznajmljen automobil!</h2>
                                <p className=' text-sm text-center'>(Uskoro očekujte poziv)</p>
                                <h2 className=' font-medium pt-4 text-center'>Ukupna cijena : 100$</h2>
                                <h2 className='pt-5 text-center text-sm inline-block'><span className=' font-semibold'>Početni datum : </span> 4/3/2024</h2> <br />
                                <h2 className='pt-1 text-center text-sm inline-block'> <span className=' font-semibold'>Krajnji datum : </span> 5/3/2024</h2>
                            </div>
                        </Modal>

                    </div>
                </div>
            </div>
            <Footer/>
        </div>
     );
}
 
export default CarPost;