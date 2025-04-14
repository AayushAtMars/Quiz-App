import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";
import { toast } from "react-toastify";
import { FaUserGraduate } from "react-icons/fa";

const Home = () => {
  const [form, setForm] = useState({ name: "", email: "", admissionNo: "" });
  const navigate = useNavigate();
  const { setUser } = useQuiz();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, admissionNo } = form;
    if (!name || !email || !admissionNo) {
      toast.error("All fields are required!");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email!");
      return;
    }

    setUser(form);
    toast.success("User info saved! Choose your quiz topic...");
    navigate("/topic");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-[90%] max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
          <FaUserGraduate />Quiz by Aayush
        </h1>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Name</label>
          <input
            type="text"
            name="name"
            className="w-full px-4 py-2 border rounded"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Email</label>
          <input
            type="email"
            name="email"
            className="w-full px-4 py-2 border rounded"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-semibold">Admission No</label>
          <input
            type="text"
            name="admissionNo"
            className="w-full px-4 py-2 border rounded"
            value={form.admissionNo}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-slate-600 hover:bg-slate-700 text-white py-2 rounded transition-all"
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default Home;
