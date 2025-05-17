import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function AddCar() {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const navigate = useNavigate();

  const addACar = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!image) return;

    const formData = new FormData();
    formData.append("make", make);
    formData.append("model", model);
    formData.append("year", year);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("image", image);
    try {
      await axios.post("http://127.0.0.1:8000/api/cars", formData, {
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
        onSubmit={addACar}
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
            required
          />
        </div>
        <div className=" flex justify-center">
          <button
            type="submit"
            className="p-5 mt-6 font-bold text-xl hover:bg-slate-900 hover:text-gray-200 hover:rounded-xl"
          >
            Add A New Car
          </button>
        </div>
      </form>
    </div>
  );
}
export default AddCar;
