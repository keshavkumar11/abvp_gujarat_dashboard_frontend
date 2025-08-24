// src/pages/HomePage.js
const HomePage = () => {
  // Dummy data for now
  const gujaratSummary = {
    totalMembers: 150000,
    collegeMembers: 95000,
    schoolMembers: 55000,
    colleges: 450,
    schools: 1200,
  };

  const districtData = [
    { district: 'Ahmedabad', totalMembers: 25000, colleges: 80, schools: 200 },
    { district: 'Surat', totalMembers: 18000, colleges: 65, schools: 150 },
    { district: 'Vadodara', totalMembers: 15000, colleges: 50, schools: 120 },
    { district: 'Rajkot', totalMembers: 12000, colleges: 45, schools: 100 },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Membership Dashboard
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <h3 className="text-lg font-semibold text-gray-600">Total Members</h3>
          <p className="text-3xl font-bold text-orange-600">{gujaratSummary.totalMembers.toLocaleString()}</p>
        </div>
         <div className="bg-white p-4 rounded-lg shadow text-center">
          <h3 className="text-lg font-semibold text-gray-600">College Members</h3>
          <p className="text-3xl font-bold text-orange-600">{gujaratSummary.collegeMembers.toLocaleString()}</p>
        </div>
         <div className="bg-white p-4 rounded-lg shadow text-center">
          <h3 className="text-lg font-semibold text-gray-600">School Members</h3>
          <p className="text-3xl font-bold text-orange-600">{gujaratSummary.schoolMembers.toLocaleString()}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <h3 className="text-lg font-semibold text-gray-600">Total Colleges</h3>
          <p className="text-3xl font-bold text-orange-600">{gujaratSummary.colleges.toLocaleString()}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <h3 className="text-lg font-semibold text-gray-600">Total Schools</h3>
          <p className="text-3xl font-bold text-orange-600">{gujaratSummary.schools.toLocaleString()}</p>
        </div>
      </div>

      {/* District Table */}
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
                  <td className="py-3 px-4 text-gray-600">{item.totalMembers.toLocaleString()}</td>
                  <td className="py-3 px-4 text-gray-600">{item.colleges}</td>
                  <td className="py-3 px-4 text-gray-600">{item.schools}</td>
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