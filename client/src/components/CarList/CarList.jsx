import { Link } from "react-router-dom";
import FilterCars from "../Filter/Filter";

const CarList = ({showBtn,carList,setCarList}) => {

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
        {!showBtn && <FilterCars carList={carList} setCarList={setCarList}/>}
        {/* Car listing */}
        <div>
          {carList.length == 0 && <h1 className=" text-4xl font-bold text-center text-gray-300">No cars found!</h1>}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16">
            {carList.map((data) => (
              <div
                key={data.id}
                data-aos="fade-up"
                data-aos-delay={200}
                className="space-y-3 border-2 border-gray-300 hover:border-primary p-3 rounded-xl relative group"
              >
                <div className="w-full h-[120px]">
                  <img
                    src={`/uploads/${data.slika}`}
                    alt=""
                    className="w-full h-[120px] object-contain sm:translate-x-8 group-hover:sm:translate-x-16 duration-700"
                  />
                </div>
                <div className="space-y-2">
                  <h1 className="text-primary font-semibold">{data.naziv}</h1>
                  <div className="flex justify-between items-center text-xl font-semibold">
                    <p>${data.cijena_po_danu}/Day</p>
                    <Link to={`/car/${data.id}`}>Details</Link>
                  </div>
                </div>
                <p className="text-xl font-semibold absolute top-0 left-3">
                  {data.proizvodjac}
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
