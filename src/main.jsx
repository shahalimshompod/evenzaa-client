import "./index.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App.jsx";
import Root from "./Layouts/Root.jsx";
import HomeLayout from "./Layouts/HomeLayout.jsx";
import Events from "./Routes/Events.jsx";
import EventsByCategory from "./Routes/EventsByCategory.jsx";
import AboutUs from "./Pages/AboutUs.jsx";
import AddEvent from "./Routes/AddEvents.jsx";
import EventDetails from "./Routes/EventDetails.jsx";
import MyEvents from "./Routes/MyEvents.jsx";
import ResultsPage from "./Routes/ResultsPage.jsx";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Root />}>
        <Route path="/" element={<HomeLayout />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:category" element={<EventsByCategory />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/add-event" element={<AddEvent />} />
        <Route path="/event-details/:id" element={<EventDetails />} />
        <Route path="/my-events" element={<MyEvents />} />
        <Route path="/search" element={<ResultsPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
