import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

type SignUpProps = {
  setNavKey: React.Dispatch<React.SetStateAction<number>>;
};
function SignUp({ setNavKey }: SignUpProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const signUp = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/register", {
        name,
        email,
        password,
        role,
      });

      const token = res.data.access_token;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      setNavKey((prev) => prev + 1);
      navigate("/");
    } catch (error) {}
  };

  return (
    <div className="h-[500px] flex items-center justify-center bg-white">
      <form
        onSubmit={signUp}
        className="w-[500px] border-2 border-gray-500 rounded-xl bg-gray-200 p-5 my-20"
      >
        <div className="mt-4">
          <label className="text-xl text-gray-900 font-bold mr-20">Name:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 rounded-2xl text-xl"
            required
          />
        </div>
        <div className="mt-7">
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
        <div className="mt-7">
          <label className="text-xl text-gray-900 font-bold mr-24">Role:</label>
          <select
            className="p-2 rounded-2xl text-lg"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className=" flex justify-center">
          <button
            type="submit"
            className="p-5 mt-6 font-bold text-xl hover:bg-slate-900 hover:text-gray-200 hover:rounded-xl"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
export default SignUp;
