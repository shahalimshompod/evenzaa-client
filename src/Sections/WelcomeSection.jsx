import React from "react";
import { SlPuzzle } from "react-icons/sl";
import { Link } from "react-router";

const WelcomeSection = () => {
  const cardData = [
    {
      id: 1,
      title: "Why Choose Us?",
      paragraph:
        "Experience a seamless and dynamic event booking platform tailored for your needs. From exclusive events to hassle-free registrations, we ensure you’re always a step ahead in discovering unforgettable experiences.",
    },
    {
      id: 2,
      title: "What We Offer?",
      paragraph:
        "Browse through diverse categories – music, sports, tech, and business – and find events that match your interests. Whether you’re here to learn, connect, or have fun, we have something for everyone.",
    },
    {
      id: 3,
      title: "Join the Community!",
      paragraph:
        "Be part of a growing community of event enthusiasts. Share reviews, connect with like-minded attendees, and make every event a memorable one. Your next adventure starts here!",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16 xl:py-36">
      {/* Main Welcome Section */}
      <section className="text-center mb-20">
        <h1
          className="marcel text-4xl md:text-6xl mb-6"
          data-aos="fade-up"
          data-aos-delay="0"
          data-aos-duration="700"
        >
          Welcome to <span className="text-[#FE3E01]">evenzaa</span>
        </h1>
        <p
          className="sand text-lg md:text-xl max-w-3xl mx-auto"
          data-aos="fade-up"
          data-aos-delay="200"
          data-aos-duration="700"
        >
          Explore and book your tickets for a wide variety of events including
          sports, music, business, and tech. Enjoy a smooth and hassle-free
          event discovery and booking experience with evenzaa.
        </p>
      </section>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {cardData.map((data, idx) => (
          <div
            key={idx}
            data-aos="fade-up"
            data-aos-delay={100 + idx * 200}
            data-aos-duration="700"
            className="flex flex-col justify-between h-full gap-6"
          >
            <h2 className="marcel text-2xl font-bold flex items-center gap-3">
              <span className="text-[#FE3E01]">
                <SlPuzzle size={35} />
              </span>
              <span>{data.title}</span>
            </h2>
            <p className="sand text-gray-600 flex-1">{data.paragraph}</p>
            <Link to={"/about-us"}>
              <button className="btn rounded-none sand self-start bg-transparent shadow-none border border-[#FE3E01] hover:bg-[#FE3E01] transition ease-in duration-300 hover:text-white">
                Explore Us
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WelcomeSection;
