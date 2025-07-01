import React, { useEffect, useState } from "react";
import useAxiosPublic from "../Hooks/useAxiosPublic"
import EventCard from "../Components/Cards/EventCard";

const FeaturedEvents = () => {
  const axiosPublic = useAxiosPublic()
  const [featuredData, setFeaturedData] = useState([]);
  const [featuredLoading, setFeaturedLoading] = useState(false);

  // fetch function
  const fetchingData = async () => {
    setFeaturedLoading(true);
    const res = await axiosPublic.get("/featured-events");
    if (res?.data) {
      setFeaturedData(res?.data);
      setFeaturedLoading(false);
    }
  };

  //   fetching data
  useEffect(() => {
    fetchingData();
  }, [axiosPublic]);

  return (
    <div className="bg-[#F7F7F7] py-16 xl:py-36 px-3 xl:px-0">
      <div className=" container mx-auto flex flex-col items-center">
        <div className="flex flex-col items-center gap-6 mb-20">
          <h1
            data-aos="fade-up"
            data-aos-delay="0"
            className="marcel text-4xl md:text-6xl"
          >
            Featured <span className="text-[#FE3E01]">Events</span>
          </h1>
          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className="text-center max-w-3xl text-lg md:text-xl sand "
          >
            Discover the latest and most exciting events handpicked for you!
            Whether you’re into music, sports, technology, or business, our
            featured selection showcases the best of what’s happening around
            you. Explore now and reserve your spot before it’s too late!
          </p>
        </div>
        <div>
          {featuredLoading ? (
            <span className="loading loading-spinner text-error"></span>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {featuredData.map((data, idx) => (
                <div
                  key={idx}
                  data-aos="fade-up"
                  data-aos-delay={400 + idx * 200}
                  data-aos-duration="700"
                >
                  <EventCard data={data} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedEvents;
