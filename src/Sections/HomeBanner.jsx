import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import concert from "../../public/assets/images/concert.jpg";
import tech from "../../public/assets/images/tech.jpg";
import business from "../../public/assets/images/business.jpg";
import sports from "../../public/assets/images/sports.jpg";
import { Link } from "react-router";

const HomeBanner = () => {
  return (
    <section className="overflow-x-hidden">
      <Carousel
        showThumbs={false}
        autoPlay={true}
        infiniteLoop={true}
        showStatus={false}
      >
        {/* Slide 1 - Concert */}
        <div className="relative">
          <img
            src={concert}
            alt="Concert"
            className="h-screen w-full object-cover"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black/30 flex flex-col items-center justify-center text-center">
            <div className="max-w-2xl mx-auto">
              <h1
                data-aos="fade-up"
                data-aos-delay="0"
                className="text-[#f5f5dc] text-4xl md:text-8xl font-bold mb-4 marcel"
              >
                Feel the Pulse of{" "}
                <span className="text-[#FE3E01]">Live Music</span>
              </h1>
              <p
                data-aos="fade-up"
                data-aos-delay="300"
                className="text-xl text-[#f5f5dc] sand font-bold mb-4"
              >
                Dive into the electrifying world of live concerts. Let the
                rhythm, lights, and crowd energy sweep you off your feet.
              </p>
              <Link
                data-aos="fade-up"
                data-aos-delay="600"
                to={"/events/music"}
              >
                <button className="cursor-pointer px-6 py-3 bg-[#FE3E01] text-white rounded-lg hover:bg-[#FE3E01]/80 transition sand">
                  Join the Beat
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Slide 2 - Tech */}
        <div className="relative">
          <img src={tech} alt="Tech" className="h-screen w-full object-cover" />
          <div className="absolute top-0 left-0 w-full h-full bg-black/30 flex flex-col items-center justify-center text-center">
            <div className="max-w-2xl mx-auto">
              <h1 className="text-[#f5f5dc] text-4xl md:text-8xl font-bold mb-4 marcel">
                Innovate with <span className="text-[#FE3E01]">Technology</span>
              </h1>
              <p className="text-xl text-[#f5f5dc] sand font-bold mb-4">
                Explore cutting-edge technology in action. From AI marvels to
                futuristic gadgets, see innovation come alive!
              </p>
              <Link to={"/events/tech"}>
                <button className="cursor-pointer px-6 py-3 bg-[#FE3E01] text-white rounded-lg hover:bg-[#FE3E01]/80 transition sand">
                  Explore Tech
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Slide 3 - Business */}
        <div className="relative">
          <img
            src={business}
            alt="Business"
            className="h-screen w-full object-cover"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black/30 flex flex-col items-center justify-center text-center">
            <div className="max-w-2xl mx-auto">
              <h1 className="text-[#f5f5dc] text-4xl md:text-8xl font-bold mb-4 marcel">
                Empowering{" "}
                <span className="text-[#FE3E01]">Future Leaders</span>
              </h1>
              <p className="text-xl text-[#f5f5dc] sand font-bold mb-4">
                Step into a world of ideas, strategy, and entrepreneurship.
                Unlock your potential to lead in a global economy.
              </p>
              <Link to={"/events/business"}>
                <button className="cursor-pointer px-6 py-3 bg-[#FE3E01] text-white rounded-lg hover:bg-[#FE3E01]/80 transition sand">
                  Learn Business
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Slide 4 - Sports */}
        <div className="relative">
          <img
            src={sports}
            alt="Sports"
            className="h-screen w-full object-cover"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex flex-col items-center justify-center text-center">
            <div className="max-w-2xl mx-auto">
              <h1 className="text-[#f5f5dc] text-4xl md:text-8xl font-bold mb-4 marcel">
                Unleash the{" "}
                <span className="text-[#FE3E01]">Athlete Within</span>
              </h1>
              <p className="text-xl text-[#f5f5dc] sand font-bold mb-4">
                From thrilling matches to intense training, embrace the
                competitive spirit and push your limits.
              </p>
              <Link to={"/events/sports"}>
                <button className="cursor-pointer px-6 py-3 bg-[#FE3E01] text-white rounded-lg hover:bg-[#FE3E01]/80 transition sand">
                  Get Active
                </button>
              </Link>
            </div>
          </div>
        </div>
      </Carousel>
    </section>
  );
};

export default HomeBanner;
