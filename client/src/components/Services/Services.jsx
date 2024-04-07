import React from "react";
import { FaCameraRetro } from "react-icons/fa";
import { GiNotebook } from "react-icons/gi";
import { SlNote } from "react-icons/sl";

const skillsData = [
  {
    name: "Najbolja cijena",
    icon: (
      <FaCameraRetro className="text-5xl text-primary duration-300" />
    ),
    link: "#",
    description: "Cijena koja je opravdana našim kvalitetom.",
    aosDelay: "0",
  },
  {
    name: "Brzo i sigurno",
    icon: (
      <GiNotebook className="text-5xl text-primary duration-300" />
    ),
    link: "#",
    description: "Uz par koraka možete iznajmiti automobil iz snova.",
    aosDelay: "500",
  },
  {
    name: "Iskusni vozači",
    icon: (
      <SlNote className="text-5xl text-primary duration-500" />
    ),
    link: "#",
    description: "Ukoliko želite da Vam dostavimo automobil naši vozači su tu.",
    aosDelay: "1000",
  },
];
const Services = () => {
  return (
    <>
      <span></span>
      <div className="dark:bg-black dark:text-white py-14 sm:grid sm:place-items-center">
        <div className="container">
          <div className="pb-12">
            <h1
              data-aos="fade-up"
              className="text-3xl font-semibold text-center sm:text-4xl font-serif"
            >
              Zašto izabrati nas?
            </h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-32">
            {skillsData.map((skill) => (
              <div
                key={skill.name}
                data-aos="fade-up"
                data-aos-delay={skill.aosDelay}
                className="card text-center group space-y-3 sm:space-y-6 p-4 sm:py-16 bg-dark duration-300 text-white rounded-lg"
              >
                <div className="grid place-items-center">{skill.icon}</div>
                <h1 className="text-2xl font-bold">{skill.name}</h1>
                <p>{skill.description}</p>
                <a
                  href={skill.link}
                  className="inline-block text-lg font-semibold py-3 text-primary  duration-300"
                >
                  Learn more
                </a>
              </div>
            ))}
          </div>
          <span id="cars"></span>
        </div>
      </div>
    </>
  );
};

export default Services;
