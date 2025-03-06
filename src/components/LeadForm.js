import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addLead } from "../services/api"; 

export default function LeadForm({ onLeadAdded, onBack }) {
  const [form, setForm] = useState({ name: "", email: "", status: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validateField = (name, value) => {
    let error = "";

    if (name === "name" && !value.trim()) {
      error = "Name is required";
    }

    if (name === "email") {
      if (!value.trim()) {
        error = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        error = "Invalid email format";
      }
    }

    if (name === "status" && !value) {
      error = "Please select a status";
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };
  const validateForm = () => {
    const newErrors = {};
  
    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }
  
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }
  
    if (!form.status) {
      newErrors.status = "Please select a status";
    }
  
    setErrors(newErrors);
  
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    validateField(name, value);
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
  
    setSubmitting(true);
    try {
      await addLead(form);
      toast.success("Lead added successfully! 🎉");
  
      setForm({ name: "", email: "", status: "" });
      setErrors({});
      onLeadAdded();
      onBack();
    } catch (error) {
      toast.error("Failed to add lead. Please try again.");
      console.error("Error submitting lead", error);
    } finally {
      setSubmitting(false);
    }
  };
  const handleClear = () => {
    setForm({ name: "", email: "", status: "" });
    setErrors({});
  };

  return (
    <div>
      <div className="bg-green-600 text-white py-2 px-4 rounded-lg mb-2">
        <h1 className="text-xl font-bold">Leads Management</h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg shadow-md mx-auto bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          <div>
            <label className="block font-semibold mb-1">E-mail</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div className="md:col-span-1">
            <label className="block font-semibold mb-1">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Status</option>
              {["New", "Engaged", "Proposal Sent", "Closed-Won", "Closed-Lost"].map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
            {errors.status && <p className="text-red-500 text-sm">{errors.status}</p>}
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between mt-4 gap-2">
            <div className="grid grid-cols-2 gap-4">
          <button 
            type="button" 
            onClick={onBack} 
            className="bg-gray-500 text-white py-2 rounded w-full md:w-24 hover:bg-gray-600 transition"
          >
            Back
          </button>
          <button 
            type="button" 
            onClick={handleClear} 
            className="bg-gray-500 text-white py-2 rounded w-full md:w-24 hover:bg-gray-600 transition"
          >
            Clear
          </button>
          </div>
          <button 
            type="submit" 
            className="bg-blue-500 text-white py-2 rounded w-full md:w-24 hover:bg-blue-600 transition"
            disabled={submitting}
          >
            {submitting ? "Saving..." : "Add Lead"}
          </button>
        </div>
      </form>
    </div>
  );
}
