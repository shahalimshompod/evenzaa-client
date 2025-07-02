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
import SecureRoute from "./Routes/SecureRoute.jsx";
import DynamicTitle from "./Components/DynamicTitle/DynamicTitle.jsx";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <DynamicTitle />
    <Routes>
      <Route path="/" element={<Root />}>
        <Route path="/" element={<HomeLayout />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/search" element={<ResultsPage />} />
        {/* secure routes */}
        <Route
          path="/events"
          element={
            <SecureRoute>
              <Events />
            </SecureRoute>
          }
        />
        <Route
          path="/events/:category"
          element={
            <SecureRoute>
              <EventsByCategory />
            </SecureRoute>
          }
        />
        <Route
          path="/add-event"
          element={
            <SecureRoute>
              <AddEvent />
            </SecureRoute>
          }
        />
        <Route
          path="/event-details/:id"
          element={
            <SecureRoute>
              <EventDetails />
            </SecureRoute>
          }
        />
        <Route
          path="/my-events"
          element={
            <SecureRoute>
              <MyEvents />
            </SecureRoute>
          }
        />
      </Route>
    </Routes>
  </BrowserRouter>
);
