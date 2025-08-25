// src/components/InstitutionModal.js
import { useState } from 'react';
import api from '../api/api';

const InstitutionModal = ({ isOpen, onClose, onSuccess }) => {
  // Form state for a new institution
  const [formData, setFormData] = useState({
    type: 'college',
    district: '',
    nagar: 0,
    male: 0,
    female: 0,
    professor: 0,
    colleges: 0,
    uniHostelPg: 0,
    karyakarta: 0,
    schools: 0,
    tution: 0,
    karyakartaSchool: 0,
    receivedAmount: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    // Handle number inputs
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.post('/institutions', formData);
      onSuccess(); // Tell the dashboard to refresh its data
      onClose(); // Close the modal
    } catch (err) {
      setError('Failed to add institution. Please check the fields.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">Add New Institution</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500 bg-red-100 p-2 rounded mb-4">{error}</p>}

          {/* Main Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium">Type</label>
              <select name="type" value={formData.type} onChange={handleChange} className="mt-1 block w-full p-2 border rounded-md">
                <option value="college">College</option>
                <option value="school">School</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">District</label>
              <input type="text" name="district" value={formData.district} onChange={handleChange} className="mt-1 block w-full p-2 border rounded-md" required />
            </div>
            <div>
              <label className="block text-sm font-medium">Nagar (Count)</label>
              <input type="number" name="nagar" value={formData.nagar} onChange={handleChange} className="mt-1 block w-full p-2 border rounded-md" />
            </div>
          </div>

          {/* Common Membership Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium">Male Students</label>
              <input type="number" name="male" value={formData.male} onChange={handleChange} className="mt-1 block w-full p-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium">Female Students</label>
              <input type="number" name="female" value={formData.female} onChange={handleChange} className="mt-1 block w-full p-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium">Professors</label>
              <input type="number" name="professor" value={formData.professor} onChange={handleChange} className="mt-1 block w-full p-2 border rounded-md" />
            </div>
          </div>
          
          {/* Conditional Fields based on Type */}
          {formData.type === 'college' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 p-4 bg-orange-50 rounded-md">
              <div>
                <label className="block text-sm font-medium">Colleges (Count)</label>
                <input type="number" name="colleges" value={formData.colleges} onChange={handleChange} className="mt-1 block w-full p-2 border rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium">Uni/Hostel/PG</label>
                <input type="number" name="uniHostelPg" value={formData.uniHostelPg} onChange={handleChange} className="mt-1 block w-full p-2 border rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium">Karyakarta</label>
                <input type="number" name="karyakarta" value={formData.karyakarta} onChange={handleChange} className="mt-1 block w-full p-2 border rounded-md" />
              </div>
            </div>
          )}
          
          {formData.type === 'school' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 p-4 bg-blue-50 rounded-md">
              <div>
                <label className="block text-sm font-medium">Schools (Count)</label>
                <input type="number" name="schools" value={formData.schools} onChange={handleChange} className="mt-1 block w-full p-2 border rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium">Tuition</label>
                <input type="number" name="tution" value={formData.tution} onChange={handleChange} className="mt-1 block w-full p-2 border rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium">Karyakarta (School)</label>
                <input type="number" name="karyakartaSchool" value={formData.karyakartaSchool} onChange={handleChange} className="mt-1 block w-full p-2 border rounded-md" />
              </div>
            </div>
          )}

          {/* Amount */}
           <div>
              <label className="block text-sm font-medium">Received Amount</label>
              <input type="number" name="receivedAmount" value={formData.receivedAmount} onChange={handleChange} className="mt-1 block w-full p-2 border rounded-md" />
            </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-6">
            <button type="button" onClick={onClose} className="py-2 px-4 bg-gray-200 rounded-md">Cancel</button>
            <button type="submit" disabled={loading} className="py-2 px-4 bg-orange-600 text-white rounded-md disabled:bg-orange-300">
              {loading ? 'Saving...' : 'Save Institution'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InstitutionModal;