// src/pages/AdminDashboard.js
import { useState, useEffect, useCallback } from 'react';
import api from '../api/api';
import InstitutionModal from '../components/InstitutionModal';

const AdminDashboard = () => {
  const [institutions, setInstitutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // --- NEW: State to hold the institution being edited ---
  const [editingInstitution, setEditingInstitution] = useState(null);

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

  const handleDelete = async (institutionId) => {
    if (window.confirm('Are you sure you want to delete this institution record?')) {
      try {
        await api.delete(`/institutions/${institutionId}`);
        fetchInstitutions();
      } catch (err) {
        console.error('Failed to delete institution:', err);
        setError('Could not delete the record. Please try again.');
      }
    }
  };

  // --- NEW: Handlers for opening the modal in add or edit mode ---
  const handleOpenAddModal = () => {
    setEditingInstitution(null); // Ensure we are in "add" mode
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (institution) => {
    setEditingInstitution(institution); // Set the institution to edit
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingInstitution(null); // Clear editing state when modal closes
  };
  
  const handleSuccess = () => {
    fetchInstitutions();
  };

  if (loading && institutions.length === 0) return <p>Loading dashboard...</p>;
  if (error && institutions.length === 0) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        {/* --- UPDATED: Button now uses its own handler --- */}
        <button 
          onClick={handleOpenAddModal}
          className="bg-orange-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-700"
        >
          Add New Institution
        </button>
      </div>
      
      {error && <p className="text-red-500 bg-red-100 p-3 rounded-md mb-4">{error}</p>}

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
                    {/* --- UPDATED: Edit button now works --- */}
                    <button 
                      onClick={() => handleOpenEditModal(inst)}
                      className="text-blue-600 hover:underline mr-4"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(inst._id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
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

      {/* --- UPDATED: Modal is now passed the institution to edit --- */}
      <InstitutionModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSuccess={handleSuccess}
        institutionToEdit={editingInstitution}
      />
    </div>
  );
};

export default AdminDashboard;