// src/pages/HomePage.js
import { useState, useEffect } from 'react';
import api from '../api/api'; // Import our configured axios instance

const HomePage = () => {
  // State to hold our data
  const [gujaratSummary, setGujaratSummary] = useState(null);
  const [districtData, setDistrictData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect runs when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch both endpoints at the same time for efficiency
        const [gujaratRes, districtRes] = await Promise.all([
          api.get('/institutions/gujarat-summary'),
          api.get('/institutions/summary')
        ]);

        setGujaratSummary(gujaratRes.data);
        setDistrictData(districtRes.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch data. Please make sure the server is running.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // The empty array [] means this effect runs only once

  // Display a loading message
  if (loading) {
    return <p className="text-center text-xl">Loading data...</p>;
  }

  // Display an error message
  if (error) {
    return <p className="text-center text-xl text-red-500">{error}</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Membership Dashboard
      </h1>

      {/* Summary Cards - Now using live data */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
         <div className="bg-white p-4 rounded-lg shadow text-center">
          <h3 className="text-lg font-semibold text-gray-600">Total Members</h3>
          <p className="text-3xl font-bold text-orange-600">{(gujaratSummary?.totalMembers || 0).toLocaleString()}</p>
        </div>
         <div className="bg-white p-4 rounded-lg shadow text-center">
          <h3 className="text-lg font-semibold text-gray-600">College Members</h3>
          <p className="text-3xl font-bold text-orange-600">{(gujaratSummary?.collegeMembers || 0).toLocaleString()}</p>
        </div>
         <div className="bg-white p-4 rounded-lg shadow text-center">
          <h3 className="text-lg font-semibold text-gray-600">School Members</h3>
          <p className="text-3xl font-bold text-orange-600">{(gujaratSummary?.schoolMembers || 0).toLocaleString()}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <h3 className="text-lg font-semibold text-gray-600">Total Colleges</h3>
          <p className="text-3xl font-bold text-orange-600">{(gujaratSummary?.colleges || 0).toLocaleString()}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <h3 className="text-lg font-semibold text-gray-600">Total Schools</h3>
          <p className="text-3xl font-bold text-orange-600">{(gujaratSummary?.schools || 0).toLocaleString()}</p>
        </div>
      </div>

      {/* District Table - Now using live data */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">District-wise Summary</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-3 px-4 text-left font-semibold text-gray-600">District</th>
                <th className="py-3 px-4 text-left font-semibold text-gray-600">Total Members</th>
                <th className="py-3 px-4 text-left font-semibold text-gray-600">Colleges</th>
                <th className="py-3 px-4 text-left font-semibold text-gray-600">Schools</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {districtData.map((item) => (
                <tr key={item.district} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-800">{item.district}</td>
                  <td className="py-3 px-4 text-gray-600">{(item.totalMembers || 0).toLocaleString()}</td>
                  <td className="py-3 px-4 text-gray-600">{item.colleges || 0}</td>
                  <td className="py-3 px-4 text-gray-600">{item.schools || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HomePage;