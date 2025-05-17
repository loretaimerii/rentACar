import { useEffect, useState } from "react";
import axios from "axios";

interface Reservation {
  id: number;
  car: {
    make: string;
    model: string;
    year: string;
    price: number;
  };
  start_date: string;
  end_date: string;
}

function MyReservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/myReservations", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setReservations(response.data);
      });
  }, []);

  const deleteReservation = (id: number) => {
    axios
      .delete(`http://127.0.0.1:8000/api/reservations/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        setReservations(reservations.filter((r: any) => r.id !== id));
      });
  };

  const calculateDays = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const timeDiff = endDate.getTime() - startDate.getTime();
    const days = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return days;
  };

  return (
    <div>
      {reservations.length == 0 ? (
        <p className="m-20 font-bold text-gray-700 text-4xl flex justify-center">
          No reservations have been made
        </p>
      ) : (
        <div className="grid grid-cols-4 gap-10 m-20">
          {reservations.map((reservation) => {
            const days = calculateDays(
              reservation.start_date,
              reservation.end_date
            );
            const totalPrice = days * reservation.car.price;

            return (
              <div
                key={reservation.id}
                className="bg-gray-200 w-full h-auto rounded-xl border-2 border-slate-500 p-5 text-lg"
              >
                <h1>
                  {reservation.car.make}, {reservation.car.model}
                </h1>
                <p>From: {reservation.start_date.slice(0, 10)}</p>
                <p>To: {reservation.end_date.slice(0, 10)}</p>
                <p>Total price: {totalPrice}$</p>
                <button
                  name="deleteReservation"
                  type="submit"
                  onClick={() => deleteReservation(reservation.id)}
                  className="mt-5 hover:border-2 hover:border-slate-500 p-2 hover:rounded-xl"
                >
                  Delete Reservation
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MyReservations;
