// src/components/InstitutionModal.js
import { useState, useEffect } from 'react';
import api from '../api/api';

// The modal now accepts a prop `institutionToEdit`
const InstitutionModal = ({ isOpen, onClose, onSuccess, institutionToEdit }) => {
  const initialState = {
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
  };

  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // --- NEW: useEffect to populate form for editing ---
  useEffect(() => {
    if (institutionToEdit) {
      // If we are editing, fill the form with the existing data
      setFormData({
        type: institutionToEdit.type || 'college',
        district: institutionToEdit.district || '',
        nagar: institutionToEdit.nagar || 0,
        male: institutionToEdit.male || 0,
        female: institutionToEdit.female || 0,
        professor: institutionToEdit.professor || 0,
        colleges: institutionToEdit.colleges || 0,
        uniHostelPg: institutionToEdit.uniHostelPg || 0,
        karyakarta: institutionToEdit.karyakarta || 0,
        schools: institutionToEdit.schools || 0,
        tution: institutionToEdit.tution || 0,
        karyakartaSchool: institutionToEdit.karyakartaSchool || 0,
        receivedAmount: institutionToEdit.receivedAmount || 0,
      });
    } else {
      // If we are adding, reset to the initial empty state
      setFormData(initialState);
    }
  }, [institutionToEdit, isOpen]); // Rerun when the institution to edit changes or modal opens

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? (value === '' ? '' : Number(value)) : value,
    }));
  };

  // --- UPDATED: handleSubmit now handles both create and update ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const dataToSend = { ...formData };
    Object.keys(dataToSend).forEach(key => {
        if (typeof dataToSend[key] === 'string' && dataToSend[key] === '' && key !== 'district' && key !== 'type') {
            dataToSend[key] = 0;
        }
    });

    try {
      if (institutionToEdit) {
        // If editing, send a PUT request
        await api.put(`/institutions/${institutionToEdit._id}`, dataToSend);
      } else {
        // If adding, send a POST request
        await api.post('/institutions', dataToSend);
      }
      onSuccess();
      onClose();
    } catch (err) {
      setError('Failed to save institution. Please check the fields.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* --- NEW: Dynamic Title --- */}
        <h2 className="text-2xl font-bold mb-4">
          {institutionToEdit ? 'Edit Institution' : 'Add New Institution'}
        </h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500 bg-red-100 p-2 rounded mb-4">{error}</p>}
          
          {/* Form fields are the same as before */}
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

           <div className="mb-4">
              <label className="block text-sm font-medium">Received Amount</label>
              <input type="number" name="receivedAmount" value={formData.receivedAmount} onChange={handleChange} className="mt-1 block w-full p-2 border rounded-md" />
            </div>

          <div className="flex justify-end gap-4 mt-6">
            <button type="button" onClick={onClose} className="py-2 px-4 bg-gray-200 rounded-md hover:bg-gray-300">Cancel</button>
            <button type="submit" disabled={loading} className="py-2 px-4 bg-orange-600 text-white rounded-md disabled:bg-orange-300 hover:bg-orange-700">
              {loading ? 'Saving...' : 'Save Institution'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InstitutionModal;