import axios from "axios";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface Car {
  id: number;
  make: string;
  model: string;
  year: string;
  price: number;
  description: string;
  image: string;
}
function ManageCars() {
  const [cars, setCars] = useState<Car[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/cars").then((response) => {
      setCars(response.data);
    });
  }, []);

  const deleteCar = (id: number) => {
    axios
      .delete(`http://127.0.0.1:8000/api/cars/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        setCars(cars.filter((r: any) => r.id !== id));
      });
  };

  return (
    <div className="m-20 flex items-center justify-center">
      <table className=" bg-gray-200 rounded-3xl">
        <thead className="text-2xl text-slate-700">
          <tr>
            <th className="p-5">Make</th>
            <th className="p-5">Model</th>
            <th className="p-5">Year</th>
            <th className="p-5">Price</th>
            <th className="p-5">Description</th>
            <th className="p-5">Image</th>
            <th className="p-5">Edit</th>
            <th className="p-5">Delete</th>
          </tr>
        </thead>
        <tbody className="text-lg">
          {cars.map((car) => (
            <tr key={car.id}>
              <td className="p-5">{car.make}</td>
              <td className="p-5">{car.model}</td>
              <td className="p-5">{car.year}</td>
              <td className="p-5">{car.price}</td>
              <td className="p-5">{car.description}</td>
              <td className="p-5">
                <img
                  src={`http://127.0.0.1:8000/storage/cars/${car.image}`}
                  alt="Car"
                  className="w-32 h-20 object-cover rounded"
                />
              </td>
              <td className="p-5 pl-8">
                <FaEdit
                  onClick={() => navigate(`/editCar/${car.id}`)}
                  className="hover:text-slate-400"
                />
              </td>
              <td className="p-5 pl-10">
                <MdDelete
                  onClick={() => deleteCar(car.id)}
                  className="hover:text-slate-400"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button
          className="m-5 text-lg hover:border-b-2 hover:border-slate-900"
          onClick={() => navigate("/addCar")}
        >
          Add a Car
        </button>
      </div>
    </div>
  );
}
export default ManageCars;
