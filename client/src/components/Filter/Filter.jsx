import { useState } from "react";
import MobileFilter from "./MobileFilter";

const FilterCars = () => {

    const [priceRange,setPriceRange] = useState(0);
    const [category, setCategory] = useState('');
    const [transmission, setTransmission] = useState('');
    const [seats, setSeats] = useState('');
    const [wheelDrive, setWheelDrive] = useState('');
    const [sort, setSort] = useState('');
    const [hasFilter,setHasFilter] = useState(false);

    return ( 
        <div>
            <div className="mb-10 hidden xl:block">
                <div data-aos="fade-up" className="bg-black text-white p-4 rounded-lg flex items-center justify-between mb-4">
                    {/* Price range*/}
                    <label htmlFor="range">Max price range ($/day) - {priceRange}$</label>
                    <input 
                        type="range" 
                        name="range" 
                        id="range"
                        value={priceRange}
                        onChange={(e) => setPriceRange(e.target.value)}
                        min={0}
                        max={1000}
                        className="accent-red-500"
                    />
                    {/* Vehicle Category */}
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="bg-black border-b border-gray-500 p-2 mb-2"
                    >
                        <option value="">Select Vehicle Category</option>
                        <option value="sedan">Sedan</option>
                        <option value="suv">SUV</option>
                        <option value="truck">Truck</option>
                        {/* Add more options as needed */}
                    </select>

                    {/* Transmission */}
                    <select
                        value={transmission}
                        onChange={(e) => setTransmission(e.target.value)}
                        className="bg-black border-b border-gray-500 p-2 mb-2"
                    >
                        <option value="">Select Transmission</option>
                        <option value="automatic">Automatic</option>
                        <option value="manual">Manual</option>
                        {/* Add more options as needed */}
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
                        {/* Add more options as needed */}
                    </select>

                    {/* Wheel Drive */}
                    <select
                        value={wheelDrive}
                        onChange={(e) => setWheelDrive(e.target.value)}
                        className="bg-black border-b border-gray-500 p-2 mb-2"
                    >
                        <option value="">Select Wheel Drive</option>
                        <option value="2wd">2WD</option>
                        <option value="4wd">4WD</option>
                        {/* Add more options as needed */}
                    </select>

                    {/* Clear Filter Button */}
                    <button
                        onClick={() => handleClearFilters}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                    >
                        {hasFilter ? "Clear Filters" : "Add Filters"}
                    </button>
                </div>
                <div className=" text-right">
                    <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            data-aos="fade-up"
                            className=" rounded border-[1px]  border-gray-300 py-2 px-3 mb-2"
                        >
                            <option value="" className=" text-gray-300">Sort cars</option>
                            <option value="2wd">Najskuplji</option>
                            <option value="4wd">Najjefiniji</option>
                            {/* Add more options as needed */}
                        </select>
                    </div>
            </div>
            <MobileFilter/>
        </div>
     );
}
 
export default FilterCars;