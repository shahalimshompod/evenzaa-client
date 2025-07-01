import React, { useEffect } from "react";
import { useLocation } from "react-router";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router";
import EventCard from "../Components/Cards/EventCard";
import useSecureData from "../Hooks/useSecureData";

const ResultsPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("q");
  console.log(query);

  //   get fetch data
  const { data: results, loading } = useSecureData(
    `/get-search-result-data?query=${query}`
  );

  // Set dynamic document title
  useEffect(() => {
    document.title = query
      ? `Search: ${query} | Eventora`
      : "Search | Eventora";
  }, [query]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-32 xl:py-36 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="marcel text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Search Results for:{" "}
            <span className="text-[#FE3E01]">"{query}"</span>
          </h1>
          <p className="sand text-lg text-gray-600">
            {results?.length} events found matching your search
          </p>
        </motion.div>

        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FE3E01]"></div>
          </div>
        )}

        {!loading && results?.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <h2 className="marcel text-2xl text-gray-700 mb-4">
              No events found
            </h2>
            <p className="sand text-gray-500 mb-6">
              Try searching for something else or browse our events
            </p>
            <Link
              to="/events"
              className="inline-block marcel bg-[#FE3E01] text-white px-6 py-3 rounded-lg hover:bg-[#E03501] transition-colors"
            >
              Browse All Events
            </Link>
          </motion.div>
        )}

        {!loading && results?.length > 0 && (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {results?.map((event, idx) => (
              <EventCard data={event} key={idx} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ResultsPage;
