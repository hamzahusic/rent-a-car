import React from "react";
import { Link } from "react-router-dom";
import FilterCars from "../Filter/Filter";

const CarList = ({showBtn,carList}) => {
  return (
    <div className="pb-24">
      <div className="container">
        {/* Heading */}
        <h1
          data-aos="fade-up"
          className="text-3xl sm:text-4xl font-semibold font-serif mb-3"
        >
          {showBtn ? "Popularni modeli" : "Modeli automobila koje nudimo"}
        </h1>
        <p data-aos="fade-up" aos-delay="400" className="text-sm pb-10">
          Ovo su neki modeli koje naši klijenti najčešće biraju
        </p>
        {!showBtn && <FilterCars/>}
        {/* Car listing */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16">
            {carList.map((data) => (
              <div
                data-aos="fade-up"
                data-aos-delay={data.aosDelay}
                className="space-y-3 border-2 border-gray-300 hover:border-primary p-3 rounded-xl relative group"
              >
                <div className="w-full h-[120px]">
                  <img
                    src={data.image}
                    alt=""
                    className="w-full h-[120px] object-contain sm:translate-x-8 group-hover:sm:translate-x-16 duration-700"
                  />
                </div>
                <div className="space-y-2">
                  <h1 className="text-primary font-semibold">{data.name}</h1>
                  <div className="flex justify-between items-center text-xl font-semibold">
                    <p>${data.price}/Day</p>
                    <a href="#">Details</a>
                  </div>
                </div>
                <p className="text-xl font-semibold absolute top-0 left-3">
                  12Km
                </p>
              </div>
            ))}
          </div>
        </div>
        {/* End of car listing */}
        {showBtn && <div className="grid place-items-center mt-8">
          <Link to={"/cars"}>
            <button data-aos="fade-up" className="button-outline">
              Pogledaj više
            </button>
          </Link>
        </div>}
      </div>
    </div>
  );
};

export default CarList;
