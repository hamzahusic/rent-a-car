import React from "react";

const testimonialData = [
  {
    name: "Asmir",
    image: "https://picsum.photos/200?random=1",
    description: "Cijene su bile konkurentne, a automobil koji sam iznajmio bio je upravo ono što mi je trebalo za putovanje.",
    aosDelay: "0",
  },
  {
    name: "Nikola",
    image: "https://picsum.photos/200?random=2",
    description: "Brza i jednostavna procedura iznajmljivanja, a automobil je bio udoban i pouzdan.",
    aosDelay: "300",
  },
  {
    name: "Amar",
    image: "https://picsum.photos/200?random=3",
    description: "Oduševljen sam fleksibilnošću i ponudom vozila. Svakako ću se vratiti kod njih kada ponovno budem trebao automobil.",
    aosDelay: "1000",
  },
];
const Testimonial = () => {
  return (
    <>
      <span id="about"></span>
      <div className="dark:bg-black dark:text-white py-14 sm:pb-24">
        <div className="container">
          {/* Header */}
          <div className="space-y-4 pb-12">
            <p
              data-aos="fade-up"
              className="text-3xl font-semibold text-center sm:text-4xl font-serif"
            >
              Naši klijenti o nama
            </p>
            <p data-aos="fade-up" className="text-center sm:px-44">
            "Ovdje se nalaze autentične recenzije i utisci ljudi koji su koristili naše usluge." 
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-black dark:text-white">
            {testimonialData.map((skill) => (
              <div
                key={skill.name}
                data-aos="fade-up"
                data-aos-delay={skill.aosDelay}
                className="card text-center group space-y-3 sm:space-y-6 p-4 sm:py-12 dark:bg-white/10 bg-gray-100 duration-300  rounded-lg "
              >
                <div className="grid place-items-center ">
                  <img
                    src={skill.image}
                    alt=""
                    className="rounded-full w-20 h-20 object-cover"
                  />
                </div>
                <div className="text-2xl">⭐⭐⭐⭐⭐</div>
                <p>{skill.description}</p>
                <p className="text-center font-semibold">{skill.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonial;
