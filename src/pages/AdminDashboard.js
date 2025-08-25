// src/pages/AdminDashboard.js
import { useState, useEffect, useCallback } from 'react';
import api from '../api/api';
import InstitutionModal from '../components/InstitutionModal'; // Import the modal

const AdminDashboard = () => {
  const [institutions, setInstitutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal

  // Use useCallback to memoize the fetch function
  const fetchInstitutions = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/institutions');
      setInstitutions(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch data. You may not be authorized.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInstitutions();
  }, [fetchInstitutions]);

  const handleSuccess = () => {
    fetchInstitutions(); // Re-fetch data on success
  };

  if (loading && institutions.length === 0) return <p>Loading dashboard...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <button 
          onClick={() => setIsModalOpen(true)} // Open modal on click
          className="bg-orange-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-700"
        >
          Add New Institution
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">All Institutions</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-3 px-4 text-left">District</th>
                <th className="py-3 px-4 text-left">Type</th>
                <th className="py-3 px-4 text-left">Total Members</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {institutions.length > 0 ? institutions.map((inst) => (
                <tr key={inst._id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">{inst.district}</td>
                  <td className="py-3 px-4 capitalize">{inst.type}</td>
                  <td className="py-3 px-4">{inst.totalMembership}</td>
                  <td className="py-3 px-4">
                    <button className="text-blue-600 hover:underline mr-4">Edit</button>
                    <button className="text-red-600 hover:underline">Delete</button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="4" className="text-center py-4">No institutions found. Add one to get started!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Render the modal */}
      <InstitutionModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSuccess}
      />
    </div>
  );
};

export default AdminDashboard;