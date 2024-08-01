import React from 'react';

interface ActiveServicesProps {
  pmsData: any[];
}

const ActiveServices: React.FC<ActiveServicesProps> = ({ pmsData }) => {
  // Assuming each item in pmsData has GROUP1, GROUP2, GROUP3, GROUP4, GROUP5, and REVENUE fields
  const services = pmsData.map((item) => [
    { layanan: item.GROUP1, revenue: item.REVENUE },
    { layanan: item.GROUP2, revenue: item.REVENUE },
    { layanan: item.GROUP3, revenue: item.REVENUE },
    { layanan: item.GROUP4, revenue: item.REVENUE },
    { layanan: item.GROUP5, revenue: item.REVENUE },
  ]).flat();

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
                Revenue bulan terakhir
              </th>
            </tr>
          </thead>
          <tbody>
            {services.map((service, index) => (
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
    </div>
  );
};

export default ActiveServices;
