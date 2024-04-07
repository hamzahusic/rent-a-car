import { useEffect, useState } from "react";
import { BiMenuAltRight } from "react-icons/bi";
import axios from 'axios'

const MobileFilter = ({carList,setCarList}) => {

    const [priceRange,setPriceRange] = useState(0);
    const [category, setCategory] = useState('');
    const [transmission, setTransmission] = useState('');
    const [seats, setSeats] = useState('');
    const [wheelDrive, setWheelDrive] = useState('');
    const [sort, setSort] = useState('');
    const [hasFilter,setHasFilter] = useState(false);
    const [showMenu,setShowMenu] = useState(false);
    const [categories,setCategories] = useState([]);
    const [dataCopy,setDataCopy] = useState(carList);
    
    const getCategories = async () => {
        const request = await axios.get('http://localhost:8000/category/');
        setCategories(request.data.categories)
    }

    const handleSort = (name) => {
        if(name == "Najskuplji"){
            const sorted = [...carList].sort((a, b) => b.cijena_po_danu - a.cijena_po_danu);
            setCarList(sorted);
        }
        if(name == "Najjeftiniji"){
            const sorted = [...carList].sort((a, b) => a.cijena_po_danu - b.cijena_po_danu);
            setCarList(sorted);
        }
    }

    const handleFilters = () => {
        if(hasFilter){
            setCarList(dataCopy);
            setHasFilter(false);
            return;
        }

        setDataCopy(carList);

        const filteredData = [...carList].filter(
            car => (priceRange != 0 ? car.cijena_po_danu <= priceRange : true) 
            && (category != '' ? car.kategorija == category : true)
            && (transmission != '' ? car.transmisija == transmission : true)
            && (seats != '' ? car.mjesta == seats : true) 
            && (wheelDrive != '' ? car.pogon == wheelDrive : true)
        )

        setCarList(filteredData);
        setHasFilter(true);
    }

    useEffect(() => {
        getCategories();
    },[])

    return ( 
        <div>
            <BiMenuAltRight   className=" text-5xl cursor-pointer ml-auto mb-2 p-2 xl:hidden" onClick={() => setShowMenu(!showMenu)}/>
            <div className="mb-10 xl:hidden">
                {showMenu && 
                <div
                data-aos="fade-up"  
                className="bg-black text-white p-4 rounded-lg flex items-center justify-between mb-4
                flex-col gap-4
                ">
                    {/* Price range*/}
                    <label htmlFor="range">Max price range ($/day) - {priceRange}$</label>
                    <input 
                        type="range" 
                        name="range" 
                        id="range"
                        value={priceRange}
                        onChange={(e) => setPriceRange(e.target.value)}
                        min={0}
                        max={999}
                        className="accent-red-500"
                    />
                    {/* Vehicle Category */}
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="bg-black border-b border-gray-500 p-2 mb-2"
                    >
                        <option value="">Select Vehicle Category</option>
                        {categories && categories.map(cat => (
                            <option value={cat.naziv} key={cat.id}>{cat.naziv}</option>
                        ))}
                    </select>

                    {/* Transmission */}
                    <select
                        value={transmission}
                        onChange={(e) => setTransmission(e.target.value)}
                        className="bg-black border-b border-gray-500 p-2 mb-2"
                    >
                        <option value="">Select Transmission</option>
                        <option value="Manuelni">Manuelni</option>
                        <option value="Automatik">Automatik</option>
                        <option value="Poluautomatik">Poluautomatik</option>
                    </select>

                    {/* Seats */}
                    <select
                        value={seats}
                        onChange={(e) => setSeats(e.target.value)}
                        className="bg-black border-b border-gray-500 p-2 mb-2"
                    >
                        <option value="">Select Number of Seats</option>
                        <option value="2">2</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                    </select>

                    {/* Wheel Drive */}
                    <select
                        value={wheelDrive}
                        onChange={(e) => setWheelDrive(e.target.value)}
                        className="bg-black border-b border-gray-500 p-2 mb-2"
                    >
                        <option value="">Select Wheel Drive</option>
                        <option value="Prednji">Prednji</option>
                        <option value="Zadnji">Zadnji</option>
                        <option value="4x4">4x4</option>
                    </select>

                    {/* Clear Filter Button */}
                    <button
                        onClick={handleFilters}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                    >
                        {hasFilter ? "Clear Filters" : "Add Filters"}
                    </button>
                </div>}
                <div className=" text-right xl:hidden">
                    <select
                            value={sort}
                            onChange={(e) => handleSort(e.target.value)}
                            data-aos="fade-up"
                            className=" rounded border-[1px]  border-gray-300 py-2 px-3 mb-2"
                        >
                            <option value="" className=" text-gray-300">Sort cars</option>
                            <option value="Najskuplji">Najskuplji</option>
                            <option value="Najjeftiniji">Najjefiniji</option>
                        </select>
                    </div>
            </div>
        </div>
     );
}
 
export default MobileFilter;