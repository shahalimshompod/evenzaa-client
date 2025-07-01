import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router";

const AboutUs = () => {
  const [ref1, inView1] = useInView({ threshold: 0.1, triggerOnce: true });
  const [ref2, inView2] = useInView({ threshold: 0.1, triggerOnce: true });
  const [ref3, inView3] = useInView({ threshold: 0.1, triggerOnce: true });
  const [ref4, inView4] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-36 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6 marcel text-[#FE3E01]">
          Our Story
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto sand text-gray-600">
          Connecting people through unforgettable experiences
        </p>
      </motion.div>

      {/* Mission Section */}
      <motion.section
        ref={ref1}
        initial={{ opacity: 0, x: -50 }}
        animate={inView1 ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-20 container mx-auto"
      >
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 marcel text-gray-800">
              Our Mission
            </h2>
            <p className="text-lg sand text-gray-600 mb-6">
              At EventHub, we believe in the power of shared experiences to
              bring people together, create memories, and foster meaningful
              connections. Our mission is to make event discovery and
              participation seamless, accessible, and enjoyable for everyone.
            </p>
            <p className="text-lg sand text-gray-600">
              Whether you're looking to attend a local concert, a tech
              conference, or organize your own community gathering, we provide
              the platform to make it happen.
            </p>
          </div>
          <div className="lg:w-1/2">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="rounded-xl overflow-hidden shadow-2xl"
            >
              <img
                src="https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="People at an event"
                className="w-full h-auto object-cover"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* What We Do Section */}
      <motion.section
        ref={ref2}
        initial={{ opacity: 0, y: 50 }}
        animate={inView2 ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-20 bg-white rounded-2xl shadow-lg p-8 max-w-6xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center marcel text-gray-800">
          What We Do
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Event Discovery",
              description:
                "We curate a diverse range of events from music festivals to business conferences, making it easy to find experiences that match your interests.",
              icon: "🔍",
            },
            {
              title: "Seamless Booking",
              description:
                "Our intuitive platform allows you to register for events in just a few clicks, with secure payment options and instant confirmation.",
              icon: "🎟️",
            },
            {
              title: "Community Building",
              description:
                "We help organizers build engaged communities around their events through our integrated tools and social features.",
              icon: "👥",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="bg-gray-50 p-6 rounded-xl"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold mb-3 marcel text-[#FE3E01]">
                {item.title}
              </h3>
              <p className="sand text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section
        ref={ref3}
        initial={{ opacity: 0 }}
        animate={inView3 ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-20 max-w-6xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center marcel text-gray-800">
          Meet The Team
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              name: "Alex Johnson",
              role: "Founder & CEO",
              image: "https://randomuser.me/api/portraits/men/32.jpg",
            },
            {
              name: "Sarah Williams",
              role: "CTO",
              image: "https://randomuser.me/api/portraits/women/44.jpg",
            },
            {
              name: "Michael Chen",
              role: "Lead Developer",
              image: "https://randomuser.me/api/portraits/men/22.jpg",
            },
            {
              name: "Emma Rodriguez",
              role: "UX Designer",
              image: "https://randomuser.me/api/portraits/women/63.jpg",
            },
          ].map((member, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-[#FE3E01]">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold marcel">{member.name}</h3>
              <p className="sand text-gray-600">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Values Section */}
      <motion.section
        ref={ref4}
        initial={{ opacity: 0, y: 50 }}
        animate={inView4 ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <div className="bg-[#FE3E01] rounded-2xl p-8 md:p-12 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center marcel">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Community First",
                description:
                  "We prioritize building genuine connections and fostering inclusive spaces for all event participants.",
              },
              {
                title: "Innovation",
                description:
                  "We continuously improve our platform to deliver cutting-edge features that enhance the event experience.",
              },
              {
                title: "Transparency",
                description:
                  "We maintain open communication with our users and partners about how our platform operates.",
              },
              {
                title: "Accessibility",
                description:
                  "We design our platform to be usable by everyone, regardless of ability or technical expertise.",
              },
              {
                title: "Passion",
                description:
                  "We're driven by our love for events and the joy they bring to people's lives.",
              },
              {
                title: "Integrity",
                description:
                  "We operate with honesty and ethical practices in all our business dealings.",
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03 }}
                className="bg-white bg-opacity-20 p-6 rounded-xl backdrop-blur-sm"
              >
                <h3 className="text-xl font-bold mb-3 marcel text-black">
                  {value.title}
                </h3>
                <p className="sand text-black">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-center mt-20"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6 marcel text-gray-800">
          Ready to Explore Amazing Events?
        </h2>
        <Link to={"/events"}>
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#E03501" }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#FE3E01] text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg"
          >
            Browse Events
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
};

export default AboutUs;
