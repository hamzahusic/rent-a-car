import { useEffect } from "react";
import mainCar from "../../assets/banner-car.jpg";
import AOS from "aos";

const Hero = () => {
  useEffect(() => {
    AOS.refresh();
  },[]);
  return (
    <div className="dark:bg-black dark:text-white duration-300 ">
      <div className="container flex py-10">
        <div className="flex justify-center flex-col-reverse md:flex-row items-center w-full">
          <div
            data-aos="zoom-in"
            data-aos-duration="1500"
            data-aos-once="true"
            className="order-1 md:order-2"
          >
            <img
              src={mainCar}
              alt=""
              className="hidden md:block object-cover max-w-[300px] lg:max-w-[550px] p-2"
            />
          </div>
          <div className="space-y-5 order-2 md:order-1 sm:pr-32 lg:max-w-xl">
            <p data-aos="fade-up" className="text-primary text-2xl font-serif">
              Lako i brzo.
            </p>
            <h1
              data-aos="fade-up"
              data-aos-delay="600"
              className="text-4xl lg:text-6xl font-semibold font-serif"
            >
              Iznajmite vaš automobil iz snova
            </h1>
            <p data-aos="fade-up" data-aos-delay="1000">
              Brzo i jednostavno iznajmite automobil. Bezbjedno putujte uz integrisano osiguranje i fleksibilnost u promjeni ili otkazivanju rezervacije
            </p>
            <button
              data-aos="fade-up"
              data-aos-delay="1500"

              className="rounded-md bg-primary hover:bg-primary/80 transition duration-500 py-3 px-6 text-white text-base tracking-wide"
            >
              Iznajmite automobil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
