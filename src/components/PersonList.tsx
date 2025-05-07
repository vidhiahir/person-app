import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Person } from "../types";

const PersonList = () => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("persons") || "[]");
    setPersons(stored);
  }, []);

  const deletePerson = (id: string) => {
    if (window.confirm("Are you sure you want to delete this person?")) {
      const updated = persons.filter((p) => p.id !== id);
      setPersons(updated);
      localStorage.setItem("persons", JSON.stringify(updated));
    }
  };

  const filteredPersons = persons.filter(
    (person) =>
      person.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.phone.includes(searchTerm) ||
      person.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Person List
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            View and manage all registered persons
          </p>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search persons..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md mx-auto block rounded-md border border-gray-300 hover:border-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg py-3 px-4 transition-colors"
          />
        </div>

        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-2 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                    First Name
                  </th>
                  <th className="px-2 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Last Name
                  </th>
                  <th className="px-2 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-2 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-2 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                    State
                  </th>
                  <th className="px-2 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                    City
                  </th>
                  <th className="px-2 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPersons.map((person, index) => (
                  <tr
                    key={person.id}
                    className="hover:bg-gray-50 transition-colors duration-200 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <td className="px-2 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                      {person.firstName}
                    </td>
                    <td className="px-2 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                      {person.lastName}
                    </td>
                    <td className="px-2 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                      {person.email}
                    </td>
                    <td className="px-2 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                      {person.phone}
                    </td>
                    <td className="px-2 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                      {person.state}
                    </td>
                    <td className="px-2 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                      {person.city}
                    </td>
                    <td className="px-2 py-2 sm:px-4 sm:py-3 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                      <button
                        onClick={() => deletePerson(person.id)}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredPersons.length === 0 && (
          <div className="text-center mt-8 text-gray-500">
            No persons found matching your search criteria.
          </div>
        )}
        <div className="flex justify-center mt-8">
          <Link
            to="/add"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          >
            Add Person
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PersonList;
