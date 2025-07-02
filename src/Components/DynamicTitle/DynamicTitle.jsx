// components/DynamicTitle.jsx
import { useEffect } from "react";
import { useLocation } from "react-router";

const DynamicTitle = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    let title = "Evenzaa"; // default title

    if (path === "/") title = "Home | Evenzaa";
    else if (path === "/about-us") title = "About Us | Evenzaa";
    else if (path === "/events") title = "All Events | Evenzaa";
    else if (path.startsWith("/events/")) title = "Category Events | Evenzaa";
    else if (path === "/add-event") title = "Add Event | Evenzaa";
    else if (path.startsWith("/event-details/"))
      title = "Event Details | Evenzaa";
    else if (path === "/my-events") title = "My Events | Evenzaa";

    document.title = title;
  }, [location]);

  return null;
};

export default DynamicTitle;
