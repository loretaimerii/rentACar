import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Cars from "./parts/Cars";
import Navigation from "./components/Navigation";
import Home from "./parts/Home";
import SignUp from "./parts/SignUp";
import LogIn from "./parts/LogIn";
import Car from "./parts/Car";
import MyReservations from "./parts/MyReservations";
import Footer from "./components/Footer";
import ManageCars from "./parts/ManageCars";
import AddCar from "./parts/AddCar";
import EditCar from "./parts/EditCar";

function App() {
  const [navKey, setNavKey] = useState(0);

  return (
    <div>
      <Router>
        <Navigation key={navKey} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/cars/:id" element={<Car />} />
          <Route path="/myReservations" element={<MyReservations />} />
          <Route path="/manageCars" element={<ManageCars />} />
          <Route path="/addCar" element={<AddCar />} />
          <Route path="/editCar/:id" element={<EditCar />} />
          <Route path="/login" element={<LogIn setNavKey={setNavKey} />} />
          <Route path="/signup" element={<SignUp setNavKey={setNavKey} />} />
        </Routes>
      </Router>
      <div className="bg-gray-200 p-10">
        <Footer />
      </div>
    </div>
  );
}

export default App;
