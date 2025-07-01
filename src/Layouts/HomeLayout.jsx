import React from "react";
import HomeBanner from "../Sections/HomeBanner";
import WelcomeSection from "../Sections/WelcomeSection";
import FeaturedEvents from "../Sections/FeaturedEvents";
import CategorySection from "../Sections/CategorySection";

const HomeLayout = () => {
  return (
    <div>
      <HomeBanner />
      <WelcomeSection />
      <FeaturedEvents />
      <CategorySection />
    </div>
  );
};

export default HomeLayout;
