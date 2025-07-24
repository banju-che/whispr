import { useState } from "react";
import client from "../api/client";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    re_password: "",
    name: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await client.post("/auth/users/", form);
      navigate("/login");
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError("Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 rounded-xl bg-white shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-[#7C3AED]">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-lg"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-lg"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-lg"
        />
        <input
          name="re_password"
          type="password"
          placeholder="Repeat Password"
          value={form.re_password}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-lg"
        />

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          className="bg-[#5EEAD4] text-[#111827] px-4 py-2 rounded-lg w-full font-semibold"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
