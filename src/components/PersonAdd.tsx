import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Person } from "../types";

const statesAndCities: Record<string, string[]> = {
  Gujarat: ["Ahmedabad", "Surat", "Rajkot"],
  Maharashtra: ["Mumbai", "Pune", "Nagpur"],
  Rajasthan: ["Jaipur", "Udaipur"],
};

const PersonAdd = () => {
  const [formData, setFormData] = useState<Partial<Person>>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    state: "",
    city: "",
  });
  const navigate = useNavigate();

  const handleChange = (field: string, value: string) => {
    if (field === "phone") {
      value = value.replace(/\D/g, "").slice(0, 10);
    }
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /\S+@\S+\.\S+/;
    const nameRegex = /^[a-zA-Z]+$/;

    if (!formData.firstName || !nameRegex.test(formData.firstName))
      return alert("Invalid First Name");
    if (!formData.lastName || !nameRegex.test(formData.lastName))
      return alert("Invalid Last Name");
    if (!formData.email || !emailRegex.test(formData.email))
      return alert("Invalid Email");
    if (!formData.phone || formData.phone.length !== 10)
      return alert("Invalid Phone");

    const newPerson: Person = {
      ...formData,
      id: Date.now().toString(),
    } as Person;

    const prev = JSON.parse(localStorage.getItem("persons") || "[]");
    localStorage.setItem("persons", JSON.stringify([...prev, newPerson]));
    navigate("/list");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Add New Person
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Please fill in the details below
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-2xl p-8 space-y-4 sm:space-y-6 transform transition-all hover:scale-[1.01] w-full px-2 sm:px-4"
        >
          <div className="grid grid-cols-1 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 hover:border-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg py-3 px-4 transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 hover:border-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg py-3 px-4 transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 hover:border-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg py-3 px-4 transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder="Enter 10 digit number"
                className="mt-1 block w-full rounded-md border border-gray-300 hover:border-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg py-3 px-4 transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                State
              </label>
              <select
                value={formData.state}
                onChange={(e) => handleChange("state", e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 hover:border-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg py-3 px-4 transition-colors"
                required
              >
                <option value="">Select State</option>
                {Object.keys(statesAndCities).map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                City
              </label>
              <select
                value={formData.city}
                onChange={(e) => handleChange("city", e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 hover:border-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg py-3 px-4 transition-colors"
                required
                disabled={!formData.state}
              >
                <option value="">Select City</option>
                {formData.state &&
                  statesAndCities[formData.state].map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PersonAdd;
