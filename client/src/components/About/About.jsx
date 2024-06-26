import React from "react";
import AboutPng from "../../assets/about-us.jpg";
import { useNavigate } from "react-router-dom";

const About = () => {

  const navigate = useNavigate();

  return (
    <div className="bg-black sm:grid sm:place-items-center duration-300 pb-20 pt-10 md:pt-20">
      <div className="container" id="about">
        <div className="grid grid-cols-1 md:grid-cols-2 place-items-center">
          <div data-aos="slide-right" data-aos-duration="1000">
            <img
              src={AboutPng}
              alt=""
              className="md:-translate-x-11 w-[450px] h-[220px] md:w-auto md:h-auto object-cover md:max-w-[450px] p-5"
            />
          </div>
          <div>
            <div className="space-y-5 sm:p-16 pb-6">
              <h1
                data-aos="fade-up"
                className="text-3xl sm:text-4xl font-bold font-serif"
              >
                O Nama
              </h1>
              <p data-aos="fade-up" className="leading-8 tracking-wide">
              Car Rental je specijalizirana kompanija koja se bavi iznajmljivanjem putničkih automobila u cijeloj Bosni i Hercegovini. Na Vaš zahtjev dostavićemo Vam vozilo na bilo koju adresu u Tuzli, a na kraju najma ćemo preuzeti iznajmljeno vozila sa lokacije koja Vama najviše odgovara. I sve to naravno besplatno! Uslugu dostave i preuzimanja pružamo i izvan Tuzle, uz doplatu. Neophodna je rezervacija i dogovor.
              </p>
              <button data-aos="fade-up" className="button-outline text-white"
                onClick={() => navigate('/cars')}
              >
                Iznajmite automobil
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
