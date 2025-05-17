import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type LogInProps = {
  setNavKey: React.Dispatch<React.SetStateAction<number>>;
};
function LogIn({ setNavKey }: LogInProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const login = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/login", {
        email,
        password,
      });
      const token = res.data.access_token;

      const userRes = await axios.get("http://localhost:8000/api/user", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const role = userRes.data.role;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      setNavKey((prev) => prev + 1);
      navigate("/");
    } catch (err) {}
  };

  return (
    <div className="h-[500px] flex items-center justify-center bg-white">
      <form
        onSubmit={login}
        className="w-[500px] border-2 border-gray-500 rounded-xl bg-gray-200 p-5 my-20"
      >
        <div className="mt-4">
          <label className="text-xl text-gray-900 font-bold mr-20">
            Email:
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 rounded-2xl text-xl"
            required
          />
        </div>
        <div className="mt-7">
          <label className="text-xl text-gray-900 font-bold mr-11">
            Password:
          </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 rounded-2xl text-xl"
            required
          />
        </div>
        <div className=" flex justify-center">
          <button
            type="submit"
            className="p-5 mt-6 font-bold text-xl hover:bg-slate-900 hover:text-gray-200 hover:rounded-xl"
          >
            Log In
          </button>
        </div>
      </form>
    </div>
  );
}

export default LogIn;
