import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function EditCar() {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const { id } = useParams();
  const navigate = useNavigate();
  console.log("ID nga useParams:", id);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/cars/${id}`).then((response) => {
      const car = response.data;
      setMake(car.make);
      //   console.log(car.make);
      setModel(car.model);
      setYear(car.year);
      setPrice(car.price);
      setDescription(car.description);
    });
  }, [id]);

  const editCar = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("make", make);
    formData.append("model", model);
    formData.append("year", year);
    formData.append("price", price);
    formData.append("description", description);
    if (image) {
      formData.append("image", image);
    }
    formData.append("_method", "PUT");

    try {
      await axios.post(`http://127.0.0.1:8000/api/cars/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      navigate("/manageCars");
    } catch (error) {}
  };

  return (
    <div className="h-[700px] flex items-center justify-center bg-white">
      <form
        onSubmit={editCar}
        className="w-[500px] border-2 border-gray-500 rounded-xl bg-gray-200 p-5 my-20"
      >
        <div className="mt-4">
          <label className="text-xl text-gray-900 font-bold mr-36">Make:</label>
          <input
            type="text"
            name="make"
            value={make}
            onChange={(e) => setMake(e.target.value)}
            className="p-2 rounded-2xl text-xl"
            required
          />
        </div>
        <div className="mt-7">
          <label className="text-xl text-gray-900 font-bold mr-36">
            Model:
          </label>
          <input
            type="text"
            name="model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="p-2 rounded-2xl text-xl"
            required
          />
        </div>
        <div className="mt-7">
          <label className="text-xl text-gray-900 font-bold mr-40">Year:</label>
          <input
            type="text"
            name="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="p-2 rounded-2xl text-xl"
            required
          />
        </div>
        <div className="mt-7">
          <label className="text-xl text-gray-900 font-bold mr-40">
            Price:
          </label>
          <input
            type="text"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="p-2 rounded-2xl text-xl"
            required
          />
        </div>
        <div className="mt-7">
          <label className="text-xl text-gray-900 font-bold mr-24">
            Description:
          </label>
          <input
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-2 rounded-2xl text-xl"
            required
          />
        </div>
        <div className="mt-7">
          <label className="text-xl text-gray-900 font-bold mr-2">Image:</label>
          <input
            type="file"
            name="image"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="p-2 rounded-2xl text-xl"
          />
        </div>
        <div className=" flex justify-center">
          <button
            type="submit"
            className="p-5 mt-6 font-bold text-xl hover:bg-slate-900 hover:text-gray-200 hover:rounded-xl"
          >
            Edit Car
          </button>
        </div>
      </form>
    </div>
  );
}
export default EditCar;
