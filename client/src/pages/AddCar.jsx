import { useState } from 'react';

const AddCarForm = () => {
  const [carData, setCarData] = useState({
    name: '',
    manufacturer: '',
    numberOfSeats: '',
    transmission: '',
    wheelDrive: '',
    description: '',
    image: '',
    pricePerDay: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData({
      ...carData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission here
    console.log(carData);
    // Reset form after submission if needed
    setCarData({
      name: '',
      manufacturer: '',
      numberOfSeats: '',
      transmission: '',
      wheelDrive: '',
      description: '',
      image: '',
      pricePerDay: ''
    });
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-4xl font-semibold my-7">Add Car</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Name of Car:</label>
          <input
            type="text"
            name="name"
            value={carData.name}
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
            name="manufacturer"
            value={carData.manufacturer}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-red-500"
          >
            <option value="">Select Manufacturer</option>
            {/* Add options for manufacturers */}
          </select>
        </div>
        {/* Number of Seats */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Number of Seats:</label>
          <select
            name="numberOfSeats"
            value={carData.numberOfSeats}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-red-500"
          >
            <option value="">Select Number of Seats</option>
            {/* Add options for number of seats */}
          </select>
        </div>
        {/* Transmission */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Transmission:</label>
          <select
            name="transmission"
            value={carData.transmission}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-red-500"
          >
            <option value="">Select Transmission</option>
            {/* Add options for transmission */}
          </select>
        </div>
        {/* Wheel Drive */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Wheel Drive:</label>
          <select
            name="wheelDrive"
            value={carData.wheelDrive}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-red-500"
          >
            <option value="">Select Wheel Drive</option>
            {/* Add options for wheel drive */}
          </select>
        </div>
        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Description:</label>
          <textarea
            name="description"
            value={carData.description}
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
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-red-500"
          />
        </div>
        {/* Price Per Day */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Price Per Day:</label>
          <input
            type="number"
            name="pricePerDay"
            value={carData.pricePerDay}
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
