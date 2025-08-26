import { useState, useEffect, useCallback } from 'react';
import api from '../api/api';
import InstitutionModal from '../components/InstitutionModal';

const AdminDashboard = () => {
  const [institutions, setInstitutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleOpenAddModal = () => {
    setEditingInstitution(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (institution) => {
    setEditingInstitution(institution);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingInstitution(null);
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
          <table className="min-w-full bg-white text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-3 px-4 text-left">District</th>
                <th className="py-3 px-4 text-left">Type</th>
                <th className="py-3 px-4 text-left">Nagar</th>
                <th className="py-3 px-4 text-left">Male</th>
                <th className="py-3 px-4 text-left">Female</th>
                <th className="py-3 px-4 text-left">Professors/Teachers</th>
                <th className="py-3 px-4 text-left">Colleges / Schools</th>
                <th className="py-3 px-4 text-left">Uni/Hostel/PG / Tuition</th>
                <th className="py-3 px-4 text-left">Karyakarta</th>
                <th className="py-3 px-4 text-left">Star</th>
                <th className="py-3 px-4 text-left">Total Members</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {institutions.length > 0 ? institutions.map((inst) => (
                <tr key={inst._id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">{inst.district}</td>
                  <td className="py-3 px-4 capitalize">{inst.type}</td>
                  <td className="py-3 px-4">{inst.nagar}</td>
                  <td className="py-3 px-4">{inst.male.toLocaleString()}</td>
                  <td className="py-3 px-4">{inst.female.toLocaleString()}</td>
                  <td className="py-3 px-4">{inst.professor.toLocaleString()}</td>
                  {/* Conditionally render college or school data */}
                  <td className="py-3 px-4">{inst.type === 'college' ? inst.colleges : inst.schools}</td>
                  <td className="py-3 px-4">{inst.type === 'college' ? inst.uniHostelPg : inst.tution}</td>
                  <td className="py-3 px-4">{inst.type === 'college' ? inst.karyakarta : inst.karyakartaSchool}</td>
                  <td className="py-3 px-4">{inst.star || 'N/A'}</td>
                  <td className="py-3 px-4 font-semibold">{inst.totalMembership.toLocaleString()}</td>
                  <td className="py-3 px-4 whitespace-nowrap">
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
                  <td colSpan="12" className="text-center py-4">No institutions found. Add one to get started!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

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
