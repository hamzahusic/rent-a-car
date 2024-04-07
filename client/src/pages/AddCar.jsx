import { useContext, useEffect, useState } from 'react';
import UserContext from '../context/userContext'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { Link } from 'react-router-dom';

const AddCarForm = () => {

  const {user} = useContext(UserContext)
  const navigate = useNavigate();
  const [slika,setSlika] = useState([]);
  const [img_prev,setImgPrev] = useState();
  const [categories,setCategories] = useState([]);


  const [carData, setCarData] = useState({
    naziv: '',
    proizvodjac: '',
    mjesta: '',
    transmisija: '',
    pogon: '',
    opis: '',
    cijena_po_danu: '',
    kategorija_id : ''
  });

  const handleImg = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSlika(file)
      const reader = new FileReader();
      reader.onload = () => {
        setImgPrev(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
      setCarData({
        ...carData,
        [name]: value
      });

  };

  const handleSubmit = async (e) => {
      e.preventDefault();
    
      if(!carData.naziv || !carData.proizvodjac || !carData.mjesta || !carData.transmisija || !carData.pogon || !carData.opis || !carData.cijena_po_danu || !slika){
        alert("Unesite sve informacije!");
        return;
      }

      const formData = new FormData();
      formData.append("naziv", carData.naziv);
      formData.append("proizvodjac", carData.proizvodjac);
      formData.append("mjesta", carData.mjesta);
      formData.append("transmisija", carData.transmisija);
      formData.append("pogon", carData.pogon);
      formData.append("opis", carData.opis);
      formData.append("cijena", carData.cijena_po_danu);
      formData.append("slika", slika);
      formData.append("idKategorija", carData.kategorija_id);
      formData.append("idKorisnik", user.id);


      const request = await axios.post('http://localhost:8000/car/',formData);

      if(request.status != 200){
        alert("Greska prilikom dodavanja automobila") 
        return;
      }

      navigate("/cars")
  };

  const getCategories = async () => {
    const request = await axios.get('http://localhost:8000/category/');
    setCategories(request.data.categories)
  }

  useEffect(() => {
    if(!user || user.uloga !== "admin"){
        navigate("/");
    }
    getCategories();
  },[])

  return (
    <div className="container mx-auto mb-10">
      <div className=' flex items-center justify-between flex-wrap'>
        <h2 className="text-4xl font-semibold my-7">Add Car</h2>
        <Link to={"/"} className=' text-base bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>Nazad na početnu</Link>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Name of Car:</label>
          <input
            type="text"
            name="naziv"
            value={carData.naziv}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-red-500"
          />
        </div>
        {/* Other input fields */}
        {/* Manufacturer */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Manufacturer:</label>
          <select
            name="proizvodjac"
            value={carData.proizvodjac}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-red-500"
          >
            <option value="">Select Manufacturer</option>
            <option value="Volkswagen">Volkswagen</option>
            <option value="Toyota">Toyota</option>
            <option value="Mercedes-Benz">Mercedes-Benz</option>
            <option value="Ford Motor">Ford Motor</option>
            <option value="BMW Group">BMW Group</option>
            <option value="Honda">Honda</option>
            <option value="Hyundai">Hyundai</option>
            <option value="Nissan">Nissan</option>
            <option value="Kia">Kia</option>
            <option value="Mazda">Mazda</option>
            <option value="Audi">Audi</option>
            <option value="Chevrolet">Chevrolet</option>
            <option value="Tesla">Tesla</option>
          </select>
        </div>
        {/* Number of Seats */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Number of Seats:</label>
          <select
            name="mjesta"
            value={carData.mjesta}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-red-500"
          >
            <option value="">Select Number of Seats</option>
            <option value="2">2</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="8">8</option>
            <option value="9">9</option>
          </select>
        </div>
        {/*Category*/}

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Category:</label>
          <select
            name="kategorija_id"
            value={carData.kategorija_id}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-red-500"
          >
            <option value="">Select Category</option>
            {categories && categories.map(cat => (
              <option value={cat.id} key={cat.id}>{cat.naziv}</option>
            ))}
          </select>
        </div>

        {/* Transmission */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Transmission:</label>
          <select
            name="transmisija"
            value={carData.transmisija}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-red-500"
          >
            <option value="">Select Transmission</option>
            <option value="Manuelni">Manuelni</option>
            <option value="Automatik">Automatik</option>
            <option value="Poluautomatik">Poluautomatik</option>
          </select>
        </div>
        {/* Wheel Drive */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Wheel Drive:</label>
          <select
            name="pogon"
            value={carData.pogon}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-red-500"
          >
            <option value="">Select Wheel Drive</option>
            <option value="Prednji">Prednji</option>
            <option value="Zadnji">Zadnji</option>
            <option value="4x4">4x4</option>
          </select>
        </div>
        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Description:</label>
          <textarea
            name="opis"
            value={carData.opis}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-red-500"
          ></textarea>
        </div>
        {/* Image */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Image:</label>
          <input
            type="file"
            name="slika"
            accept="image/*"
            onChange={handleImg}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-red-500"
          />
          {img_prev && <img src={img_prev} alt="slika" className=" max-w-[150px] p-2 object-cover border-dotted border-2 rounded-lg overflow-hidden my-4"/>}
        </div>

        {/* Price Per Day */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Price Per Day:</label>
          <input
            type="number"
            name="cijena_po_danu"
            value={carData.cijena_po_danu}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-red-500"
          />
        </div>
        <button type="submit" className="bg-red-500 text-white px-5 py-2 rounded-md hover:bg-red-600">Add Car</button>
      </form>
    </div>
  );
};

export default AddCarForm;
