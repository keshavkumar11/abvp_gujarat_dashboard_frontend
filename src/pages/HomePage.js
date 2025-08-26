import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';

const HomePage = () => {
  const [gujaratSummary, setGujaratSummary] = useState(null);
  const [districtData, setDistrictData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
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
  }, []);

  if (loading) {
    return <p className="text-center text-xl">Loading data...</p>;
  }
  if (error) {
    return <p className="text-center text-xl text-red-500">{error}</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Membership Dashboard
      </h1>

      {/* Summary Cards section is updated */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <h3 className="text-lg font-semibold text-gray-600">Total Members</h3>
          <p className="text-3xl font-bold text-orange-600">{(gujaratSummary?.totalMembers || 0).toLocaleString()}</p>
        </div>
        
        {/* --- NEW CARDS START --- */}
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <h3 className="text-lg font-semibold text-gray-600">Total Male Students</h3>
          <p className="text-3xl font-bold text-orange-600">{(gujaratSummary?.totalMale || 0).toLocaleString()}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <h3 className="text-lg font-semibold text-gray-600">Total Female Students</h3>
          <p className="text-3xl font-bold text-orange-600">{(gujaratSummary?.totalFemale || 0).toLocaleString()}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <h3 className="text-lg font-semibold text-gray-600">Total Professors</h3>
          <p className="text-3xl font-bold text-orange-600">{(gujaratSummary?.totalProfessors || 0).toLocaleString()}</p>
        </div>
        {/* --- NEW CARDS END --- */}
        
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

      {/* District Table section is unchanged */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">District-wise Summary</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-3 px-4 text-left font-semibold text-gray-600">District</th>
                <th className="py-3 px-4 text-left font-semibold text-gray-600">Male</th>
                <th className="py-3 px-4 text-left font-semibold text-gray-600">Female</th>
                <th className="py-3 px-4 text-left font-semibold text-gray-600">Professors</th>
                <th className="py-3 px-4 text-left font-semibold text-gray-600">Colleges</th>
                <th className="py-3 px-4 text-left font-semibold text-gray-600">Schools</th>
                <th className="py-3 px-4 text-left font-semibold text-gray-600">Total Members</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {districtData.map((item) => (
                <tr key={item.district} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-800">
                    <Link to={`/district/${item.district}`} className="text-orange-600 hover:underline">
                      {item.district}
                    </Link>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{(item.totalMale || 0).toLocaleString()}</td>
                  <td className="py-3 px-4 text-gray-600">{(item.totalFemale || 0).toLocaleString()}</td>
                  <td className="py-3 px-4 text-gray-600">{(item.totalProfessors || 0).toLocaleString()}</td>
                  <td className="py-3 px-4 text-gray-600">{(item.colleges || 0).toLocaleString()}</td>
                  <td className="py-3 px-4 text-gray-600">{(item.schools || 0).toLocaleString()}</td>
                  <td className="py-3 px-4 font-semibold text-gray-800">{(item.totalMembers || 0).toLocaleString()}</td>
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
