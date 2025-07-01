import React from "react";
import HomeBanner from "../Sections/HomeBanner";
import WelcomeSection from "../Sections/WelcomeSection";
import FeaturedEvents from "../Sections/FeaturedEvents";

const HomeLayout = () => {
  return (
    <div>
      <HomeBanner />
      <WelcomeSection />
      <FeaturedEvents />
    </div>
  );
};

export default HomeLayout;
