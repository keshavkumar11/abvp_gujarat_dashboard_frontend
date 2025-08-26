import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/api';

const DistrictDetailPage = () => {
  const { districtName } = useParams();
  const [institutions, setInstitutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDistrictData = async () => {
      try {
        const { data } = await api.get('/institutions');
        const districtData = data.filter(inst => inst.district === districtName);
        setInstitutions(districtData);
      } catch (err) {
        setError('Failed to fetch district details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDistrictData();
  }, [districtName]);

  if (loading) return <p className="text-center">Loading district details...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  
  const colleges = institutions.filter(inst => inst.type === 'college');
  const schools = institutions.filter(inst => inst.type === 'school');

  // --- NEW: Calculate financial totals for the entire district ---
  const totalReceived = institutions.reduce((sum, inst) => sum + (inst.receivedAmount || 0), 0);
  const totalLeft = institutions.reduce((sum, inst) => sum + (inst.leftAmount || 0), 0);
  const totalAmount = totalReceived + totalLeft;

  return (
    <div>
      <Link to="/" className="text-orange-600 hover:underline mb-4 inline-block">&larr; Back to Main Dashboard</Link>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        District: <span className="text-orange-600">{districtName}</span>
      </h1>

      {/* --- NEW: Financial Summary Section --- */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Financial Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <h3 className="text-lg font-semibold text-green-800">Received Amount</h3>
            <p className="text-3xl font-bold text-green-700">{totalReceived.toLocaleString()}</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg text-center">
            <h3 className="text-lg font-semibold text-red-800">Left Amount</h3>
            <p className="text-3xl font-bold text-red-700">{totalLeft.toLocaleString()}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <h3 className="text-lg font-semibold text-gray-800">Total Amount</h3>
            <p className="text-3xl font-bold text-gray-900">{totalAmount.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Colleges Table */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Colleges</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-3 px-4 text-left">Nagar Count</th>
                <th className="py-3 px-4 text-left">Male</th>
                <th className="py-3 px-4 text-left">Female</th>
                <th className="py-3 px-4 text-left">Professors</th>
                <th className="py-3 px-4 text-left">Total Members</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {colleges.length > 0 ? colleges.map(inst => (
                <tr key={inst._id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">{inst.nagar}</td>
                  <td className="py-3 px-4">{inst.male.toLocaleString()}</td>
                  <td className="py-3 px-4">{inst.female.toLocaleString()}</td>
                  <td className="py-3 px-4">{inst.professor.toLocaleString()}</td>
                  <td className="py-3 px-4 font-semibold">{inst.totalMembership.toLocaleString()}</td>
                </tr>
              )) : <tr><td colSpan="5" className="text-center py-4">No college data found for this district.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {/* Schools Table */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Schools</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-3 px-4 text-left">Nagar Count</th>
                <th className="py-3 px-4 text-left">Male</th>
                <th className="py-3 px-4 text-left">Female</th>
                <th className="py-3 px-4 text-left">Teachers</th>
                <th className="py-3 px-4 text-left">Total Members</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {schools.length > 0 ? schools.map(inst => (
                <tr key={inst._id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">{inst.nagar}</td>
                  <td className="py-3 px-4">{inst.male.toLocaleString()}</td>
                  <td className="py-3 px-4">{inst.female.toLocaleString()}</td>
                  <td className="py-3 px-4">{inst.professor.toLocaleString()}</td>
                  <td className="py-3 px-4 font-semibold">{inst.totalMembership.toLocaleString()}</td>
                </tr>
              )) : <tr><td colSpan="5" className="text-center py-4">No school data found for this district.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DistrictDetailPage;
