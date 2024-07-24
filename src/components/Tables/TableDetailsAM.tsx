import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Package } from '../../types/package';

const DetailsAM = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [packageData, setPackageData] = useState<Package[]>([]);

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/mapping_am/${name}`);
        setPackageData(response.data);
      } catch (error) {
        console.error('Error fetching customer details:', error);
      }
    };

    fetchCustomerDetails();
  }, [name]);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-center text-black dark:text-white xl:pl-11">
                NIPNAS
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-center text-black dark:text-white">
                Nama Pelanggan
              </th>
            </tr>
          </thead>
          <tbody>
            {packageData.map((customer, key) => (
              <tr key={key} className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800" onClick={() => navigate(`/detail-am/${name}/${customer.NIPNAS}`)}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-center text-black dark:text-white">
                    {customer.NIPNAS}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-center text-black dark:text-white">
                    {customer.NAMA_PELANGGAN}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DetailsAM;
