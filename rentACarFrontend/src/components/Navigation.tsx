import axios from "axios";
import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

function Navigation() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const navigate = useNavigate();

  const logOut = async () => {
    // console.log("Logging out with token:", token);

    try {
      await axios.post("http://127.0.0.1:8000/api/logout", null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      localStorage.removeItem("token");
      localStorage.removeItem("role");

      setToken(null);
      setRole(null);

      navigate("/");
    } catch (error: unknown) {
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("role");

      setToken(null);
      setRole(null);

      navigate("/");
    }
  };

  return (
    <>
      <nav className="bg-gray-200 h-20 w-full z-50 border-b-2">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          <h1 className="text-black ml-5 text-3xl font-bold">CarRental</h1>
          <ul className="flex mr-56 text-xl">
            <li>
              <Link
                className="text-black hover:border-b-2 hover:border-b-black px-4 py-2"
                to="/"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className="text-black hover:border-b-2 hover:border-b-black px-4 py-2"
                to="/cars"
              >
                Cars
              </Link>
            </li>

            {token && (
              <>
                {role === "user" && (
                  <li>
                    <Link
                      to="/myReservations"
                      className="px-4 py-2 text-black hover:border-b-2 hover:border-b-black"
                    >
                      My Reservations
                    </Link>
                  </li>
                )}
                {role === "admin" && (
                  <>
                    <li>
                      <Link
                        to="/myReservations"
                        className="px-4 py-2 text-black hover:border-b-2 hover:border-b-black"
                      >
                        My Reservations
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/manageCars"
                        className="px-4 py-2 text-black hover:border-b-2 hover:border-b-black"
                      >
                        Manage Cars
                      </Link>
                    </li>
                  </>
                )}

                <button
                  onClick={logOut}
                  className="ml-6 text-black hover:font-bold"
                >
                  Logout
                </button>
              </>
            )}

            {!token && (
              <>
                <li>
                  <Link
                    to="/login"
                    className="text-black hover:border-b-2 hover:border-b-black px-4 py-2"
                  >
                    Log in
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    className="text-black hover:border-b-2 hover:border-b-black px-4 py-2"
                  >
                    Sign up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default Navigation;
