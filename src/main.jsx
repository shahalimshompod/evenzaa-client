import "./index.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App.jsx";
import Root from "./Layouts/Root.jsx";
import HomeLayout from "./Layouts/HomeLayout.jsx";
import Events from "./Routes/Events.jsx";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Root />}>
        <Route path="/" element={<HomeLayout />} />
        <Route path="/app" element={<App />} />
        <Route path="/events" element={<Events />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
