import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface CollectionNonPOTSProps {
  collectionsData: any[];
}

const CollNonPOTS: React.FC<CollectionNonPOTSProps> = ({ collectionsData }) => {
  const { nipnas } = useParams();
  const [collections, setCollections] = useState<any[]>(collectionsData);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    if (nipnas) {
      axios.get(`http://localhost:5000/collection/${nipnas}`)
        .then((response) => {
          setCollections(response.data);
        })
        .catch((error) => {
          console.error('Ada kesalahan saat mengambil data:', error);
        });
    }
  }, [nipnas]);

  const totalPages = Math.ceil(collections.length / itemsPerPage);
  const currentItems = collections.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h1 className="mb-4 font-semibold text-lg">Profile Collection Non POTS</h1>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="py-4 px-4 font-medium text-center text-black dark:text-white">
                Account Number
              </th>
              <th className="py-4 px-4 font-medium text-center text-black dark:text-white">
                Nipnas
              </th>
              <th className="py-4 px-4 font-medium text-center text-black dark:text-white">
                Payment Category
              </th>
              <th className="py-4 px-4 font-medium text-center text-black dark:text-white">
                Witel
              </th>
              <th className="py-4 px-4 font-medium text-center text-black dark:text-white">
                Saldo Akhir
              </th>
              <th className="py-4 px-4 font-medium text-center text-black dark:text-white">
                Periode
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, key) => (
              <tr
                key={key}
                className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800"
              >
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark xl:pl-11">
                  <h5 className="text-center text-black dark:text-white">
                    {item.ACCOUNT_NUMBER}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-center text-black dark:text-white">
                    {item.NIPNAS}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <h5 className="text-center text-black dark:text-white">
                    {item.PAYMENT_CAT}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <h5 className="text-center text-black dark:text-white">
                    {item.WITEL}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <h5 className="text-center text-black dark:text-white">
                    {item.SALDO_AKHIR}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <h5 className="text-center text-black dark:text-white">
                    {item.PERIODE}
                  </h5>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center items-center mt-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 mx-1 bg-gray-300 rounded disabled:opacity-50"
          >
            &lt;
          </button>
          <span className="mx-2 text-lg bg-gray-200 rounded">
            {currentPage}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 mx-1 bg-gray-300 rounded disabled:opacity-50"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollNonPOTS;