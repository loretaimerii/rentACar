import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ford1 from "./ford1.jpg";

interface CarD {
  id: number;
  make: string;
  model: string;
  year: string;
  price: number;
  description: string;
  image: string;
}

function Car() {
  const { id } = useParams();
  const [car, setCar] = useState<CarD[]>([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalDays, setTotalDays] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const today = new Date().toISOString().split("T")[0];
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/cars/${id}`).then((response) => {
      setCar(response.data);
    });
  }, [id]);

  //to get the number of days and the price for it
  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const timeDiff = end.getTime() - start.getTime();
      const days = Math.ceil(timeDiff / (1000 * 3600 * 24));

      if (days > 0) {
        setTotalDays(days);
        setTotalPrice(days * (car as any).price);
      } else {
        setTotalDays(0);
        setTotalPrice(0);
      }
    }
  }, [startDate, endDate, car]);

  //   make the reservation
  const makeReservation = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://127.0.0.1:8000/api/reservations",
        {
          car_id: id,
          start_date: startDate,
          end_date: endDate,
          total_price: totalPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201 || response.status === 200) {
        navigate("/myReservations");
      }
    } catch (error) {
      alert(
        "Reservation failed due to the car being currently reserved during that time, or invalid information!"
      );
    }
  };

  return (
    <div>
      <div className="grid grid-cols-2 m-20">
        {/* car details */}
        <div className="bg-gray-200 w-[400px] h-auto rounded-xl ml-16 border-2 border-slate-500 p-4">
          <h1 className="font-bold text-center text-3xl text-slate-500">
            Car Details
          </h1>
          <div className="flex justify-center mt-10">
            <img src={ford1} className="h-40"></img>
          </div>
          <div className="flex flex-col justify-between">
            <div className="ml-10 text-slate-500 font-bold">
              <h1 className="mt-6 text-2xl ">Make - {(car as any).make}</h1>
              <p className="mt-1 text-xl">
                Model - {(car as any).model}, {(car as any).year}
              </p>
              <p className="mt-2 text-lg">{(car as any).description}</p>
              <p className="mt-2 text-lg">
                Daily price - {(car as any).price}$
              </p>
            </div>
          </div>
        </div>

        {/* reservation form */}
        <div className="bg-gray-200 w-full h-auto mr-44 rounded-xl border-2 border-slate-500 p-4 text-slate-500">
          <h1 className="font-bold text-center text-3xl ">
            Make the Reservation
          </h1>
          <form
            method="POST"
            action=""
            onSubmit={makeReservation}
            className="mt-10"
          >
            <div>
              <label className="text-2xl mr-8 ml-2">Start Date: </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                min={today}
                className="p-2 rounded-full"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              ></input>

              <label className="text-2xl mr-8 ml-10">End Date: </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                className="p-2 rounded-full"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              ></input>
            </div>

            <div className="mt-5">
              {totalDays > 0 && (
                <p className="text-2xl mr-8 ml-2">
                  Price for {totalDays} days is: {totalPrice}$.
                </p>
              )}
            </div>

            {/* credit card information */}
            <div className="mt-5">
              <div>
                <label className="text-2xl mr-24">
                  Card Holder's Full Name
                </label>
                <input
                  type="text"
                  name="cardName"
                  className="p-2 rounded-full"
                  required
                ></input>
              </div>

              <div className="mt-4">
                <label className="text-2xl mr-20">
                  Credit/Debit Card Number
                </label>
                <input
                  type="text"
                  name="cardNr"
                  className="p-2 rounded-full"
                  required
                ></input>
              </div>

              <div className="mt-4">
                <label className="text-2xl mr-60">Expiry Date</label>
                <input
                  type="text"
                  name="expiryDate"
                  className="p-2 rounded-full "
                  placeholder="MM/YY"
                  required
                ></input>
              </div>

              <div className="mt-4">
                <label className="text-2xl mr-60">CVV or CVC</label>
                <input
                  type="text"
                  name="cvvCvc"
                  className="p-2 rounded-full "
                  required
                ></input>
              </div>
            </div>

            <button
              type="submit"
              name="makeReservation"
              className="p-5 bg-white font-bold text-xl mt-10 rounded-full"
            >
              Complete Reservation
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Car;
