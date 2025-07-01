import React from "react";
import { motion } from "framer-motion";

const CategorySection = () => {
  const routes = [
    {
      category: "Music",
      categoryForQuery: "music",
      path: "/events/music",
      image: "https://i.ibb.co/spJd2znv/category-music.jpg",
      icon: "🎵",
    },
    {
      category: "Tech",
      categoryForQuery: "tech",
      path: "/events/tech",
      image: "https://i.ibb.co/nsYqWPWM/category-tech.jpg",
      icon: "💻",
    },
    {
      category: "Business",
      categoryForQuery: "business",
      path: "/events/business",
      image: "https://i.ibb.co/j9BMxzB5/category-business.jpg",
      icon: "📈",
    },
    {
      category: "Sports",
      categoryForQuery: "sports",
      path: "/events/sports",
      image: "https://i.ibb.co/1f7R3kKf/category-sports.jpg",
      icon: "⚽",
    },
  ];

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="py-12 md:py-16 lg:py-20 xl:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Heading */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-100px" }}
        className="flex flex-col items-center mb-12 md:mb-16 lg:mb-20 text-center"
      >
        <h1 className="marcel text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 md:mb-6">
          Find Your Perfect <span className="text-[#FE3E01]">Event</span> by Category
        </h1>
        <p className="sand text-base sm:text-lg md:text-xl max-w-3xl mx-auto text-gray-600">
          From music festivals to tech conferences, explore events that align
          with your passions. Whether you're here to connect, learn, or have
          fun, discover the perfect category for you.
        </p>
      </motion.div>

      {/* Card Content */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
      >
        {routes.map((route, idx) => (
          <motion.a
            key={idx}
            href={route.path}
            variants={item}
            className="group block w-full"
          >
            <div className="relative aspect-square w-full overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              {/* Image */}
              <img
                className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                src={route.image}
                alt={`${route.category} events`}
                loading="lazy"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>

              {/* Category Info */}
              <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 text-white">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl sm:text-3xl">{route.icon}</span>
                  <h2 className="marcel text-xl sm:text-2xl md:text-3xl font-bold">
                    {route.category}
                  </h2>
                </div>
                <p className="sand text-sm sm:text-base opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  Explore upcoming {route.category.toLowerCase()} events
                </p>
                
                {/* Mobile-only label */}
                <p className="sand text-sm sm:hidden mt-2">
                  Tap to explore
                </p>
              </div>
            </div>
          </motion.a>
        ))}
      </motion.div>

      {/* Responsive Note - Only shows on mobile */}
      <p className="sand text-sm text-center text-gray-500 mt-6 sm:hidden">
        Swipe horizontally to see all categories
      </p>
    </div>
  );
};

export default CategorySection;