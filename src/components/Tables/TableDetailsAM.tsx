import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Package } from '../../types/package';
import { FaEye, FaTrash } from "react-icons/fa";

const DetailsAM = () => {
  const { name = "" } = useParams();
  const navigate = useNavigate();
  const [packageData, setPackageData] = useState<Package[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Package | null>(null);
  const itemsPerPage = 4;

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

  const truncateName = (name: string, maxLength: number) => {
    return name.length > maxLength ? `${name.substring(0, maxLength)}...` : name;
  };

  const totalPages = Math.ceil(packageData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = packageData.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  const handleDelete = async () => {
    if (selectedCustomer) {
      try {
        await axios.delete(`http://localhost:5000/mapping_am/${name}/${selectedCustomer.NIPNAS}`);
        setPackageData((prevData) => prevData.filter((customer) => customer.NIPNAS !== selectedCustomer.NIPNAS));
        setShowModal(false);
        setShowSuccessModal(true); // Tampilkan modal sukses setelah menghapus data
      } catch (error) {
        console.error('Error deleting customer:', error);
      }
    }
  };

  const openModal = (customer: Package) => {
    setSelectedCustomer(customer);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedCustomer(null);
    setShowModal(false);
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      {/* Nama AM */}
      <h2 className="text-xl font-semibold text-center text-black dark:text-white mb-4">
        {truncateName(name ?? "", 30)}
      </h2>
      
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[140px] py-4 px-4 font-medium text-center text-black dark:text-white xl:pl-11">
                NIPNAS
              </th>
              <th className="min-w-[200px] py-4 px-4 font-medium text-center text-black dark:text-white">
                Nama Pelanggan
              </th>
              <th className="min-w-[140px] py-4 px-4 font-medium text-center text-black dark:text-white">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((customer, key) => (
              <tr
                key={key}
                className="cursor-text hover:bg-gray-200 dark:hover:bg-gray-800"
              >
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-center text-black dark:text-white">
                    {customer.NIPNAS}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-center text-black dark:text-white">
                    {customer.NAMA_PELANGGAN}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-center">
                  <button
                    onClick={() => navigate(`/detail-am/${name}/${customer.NIPNAS}`)}
                    className="mr-5 text-blue-500 cursor-pointer"
                  >
                    <FaEye />
                  </button>
                  <button
                    onClick={() => openModal(customer)}
                    className="text-red-500 cursor-pointer"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination Controls */}
        <div className="flex justify-center items-center py-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-3 py-1 mx-1 text-black dark:text-white bg-gray-200 dark:bg-gray-800 rounded"
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          <span className="px-3 py-1 text-black dark:text-white">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-3 py-1 mx-1 text-black dark:text-white bg-gray-200 dark:bg-gray-800 rounded"
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
        </div>
      </div>

      {/* Modal Konfirmasi Hapus */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-boxdark p-6 rounded shadow-md">
            <h3 className="text-lg font-semibold mb-4 text-black dark:text-white">Konfirmasi Hapus</h3>
            <p className="text-black dark:text-white mb-6">
              Apakah Anda yakin ingin menghapus data {selectedCustomer?.NAMA_PELANGGAN}?
            </p>
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-500 text-black dark:text-white rounded"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded mr-2"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Berhasil Dihapus */}
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-boxdark p-6 rounded shadow-md">
            <h3 className="text-lg font-semibold mb-4 text-black dark:text-white">Berhasil</h3>
            <p className="text-black dark:text-white mb-6">
              Data {selectedCustomer?.NAMA_PELANGGAN} telah berhasil dihapus.
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowSuccessModal(false)}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsAM;