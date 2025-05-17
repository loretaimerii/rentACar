import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ford1 from "./ford1.jpg";

interface Car {
  id: number;
  make: string;
  model: string;
  year: string;
  price: number;
  description: string;
  image: string;
}

function Cars() {
  const [cars, setCars] = useState<Car[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/cars").then((response) => {
      setCars(response.data);
    });
  }, []);

  //to go to the specific car
  const handleReservation = (carId: number) => {
    const isLoggedIn = !!localStorage.getItem("token");
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      navigate(`/cars/${carId}`);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-24 m-20">
        {cars.map((car) => (
          <div className="bg-[#858688] w-full h-56 flex" key={car.id}>
            <div>
              <img src={ford1} className="h-full"></img>
            </div>
            <div className="flex flex-col justify-between">
              <div className="ml-6">
                <h1 className="mt-4 text-3xl font-bold text-gray-300">
                  {car.make}
                </h1>
                <p className="font-bold text-gray-200 mt-2">
                  {car.model}, {car.year}
                </p>
                <p className="font-bold text-gray-200 mt-2">{car.price}$/day</p>
              </div>

              <div className="ml-40 mb-1">
                <button
                  onClick={() => handleReservation(car.id)}
                  className="w-32 font-bold text-gray-300 bg-slate-700 p-4 border-slate-700 rounded-lg"
                >
                  Book now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cars;
