import React, { useState } from 'react';

interface ActiveServicesProps {
  pmsData: any[];
}

// Fungsi untuk mengonversi MONTH_ID menjadi nama bulan
const getMonthName = (monthId: number) => {
  const monthNames = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni", 
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];
  return monthNames[monthId - 1] || "Bulan tidak diketahui";
};

const ActiveServices: React.FC<ActiveServicesProps> = ({ pmsData }) => {
  // Mengonversi pmsData menjadi array layanan dengan revenue, monthId, dan yearId
  const services = pmsData.map((item) => [
    { layanan: item.GROUP1, revenue: item.REVENUE, monthId: item.MONTH_ID, yearId: item.YEAR_ID },
    { layanan: item.GROUP2, revenue: item.REVENUE, monthId: item.MONTH_ID, yearId: item.YEAR_ID },
    { layanan: item.GROUP3, revenue: item.REVENUE, monthId: item.MONTH_ID, yearId: item.YEAR_ID },
    { layanan: item.GROUP4, revenue: item.REVENUE, monthId: item.MONTH_ID, yearId: item.YEAR_ID },
    { layanan: item.GROUP5, revenue: item.REVENUE, monthId: item.MONTH_ID, yearId: item.YEAR_ID },
  ]).flat();

  // State untuk pagination
  const [currentPage, setCurrentPage] = useState(1);
  const servicesPerPage = 5; // Jumlah layanan per halaman

  // Menghitung jumlah halaman
  const totalPages = Math.ceil(services.length / servicesPerPage);

  // Menghitung index layanan yang akan ditampilkan pada halaman saat ini
  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = services.slice(indexOfFirstService, indexOfLastService);

  // Handler untuk navigasi halaman
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h1 className="mb-4 font-semibold text-lg">Layanan Aktif</h1>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="py-3 px-3 font-medium text-center text-black dark:text-white">
                Layanan
              </th>
              <th className="py-3 px-3 font-medium text-center text-black dark:text-white">
                Revenue bulan {getMonthName(currentServices[0]?.monthId)} {currentServices[0]?.yearId}
              </th>
            </tr>
          </thead>
          <tbody>
            {currentServices.map((service, index) => (
              <tr
                key={index}
                className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800"
              >
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <h5 className="font-medium text-center text-black dark:text-white">
                    {service.layanan}
                  </h5>
                </td>
                {index % 5 === 0 ? (
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark" rowSpan={5}>
                    <p className="text-center text-black dark:text-white">
                      {service.revenue}
                    </p>
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center items-center mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`py-2 px-4 ${
            currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'text-blue-500'
          }`}
        >
          &larr; Oldest
        </button>
        <span className="font-small text-black dark:text-white">
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`py-2 px-4 ${
            currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'text-blue-500'
          }`}
        >
          Latest &rarr;
        </button>
      </div>
    </div>
  );
};

export default ActiveServices;