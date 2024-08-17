import React, { useState } from 'react';
import { FaTrash } from "react-icons/fa";

interface PmsTableProps {
    pmsData: { YEAR_ID: number; MONTH_ID: number; count: number }[];
    fetchMessage: string;
    handleDelete: (year: number, month: number) => Promise<void>;
}

const PmsTable: React.FC<PmsTableProps> = ({ pmsData, fetchMessage, handleDelete }) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedYear, setSelectedYear] = useState<number | null>(null);
    const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

    const rowsPerPage = 2;
    const totalPages = Math.ceil(pmsData.length / rowsPerPage);
    const currentData = pmsData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    const handlePageChange = (newPage: number) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const openModal = (year: number, month: number) => {
        setSelectedYear(year);
        setSelectedMonth(month);
        setShowModal(true);
    };

    const closeModal = () => {
        setSelectedYear(null);
        setSelectedMonth(null);
        setShowModal(false);
    };

    return (
        <div className="shadow-sm bg-white rounded-sm dark:bg-boxdark dark:border-strokedark overflow-hidden">
            <div className="p-4">
                <h4 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">PMS Preview in Database</h4>
                {fetchMessage && (
                    <p className="text-red-600 dark:text-red-400 mb-4">{fetchMessage}</p>
                )}
                {!fetchMessage && pmsData.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-center">
                            <thead className="bg-gray-100 dark:bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-md font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">YEAR_ID</th>
                                    <th className="px-6 py-3 text-md font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">MONTH_ID</th>
                                    <th className="px-6 py-3 text-md font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Jumlah Data</th>
                                    <th className="px-6 py-3 text-md font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                {currentData.map((row, index) => (
                                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-900 dark:text-gray-100">{row.YEAR_ID}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-md text-gray-500 dark:text-gray-300">{row.MONTH_ID}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-md text-gray-500 dark:text-gray-300">{row.count}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-md font-medium">
                                            <button
                                                onClick={() => openModal(row.YEAR_ID, row.MONTH_ID)}
                                                className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                                            >
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="flex justify-center items-center mt-4">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-4 py-2 bg-gray-200 text-gray-500 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 transition-colors"
                            >
                                &larr;
                            </button>
                            <span className="text-gray-500 dark:text-gray-300">
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 bg-gray-200 text-gray-500 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 transition-colors"
                            >
                                &rarr;
                            </button>
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-4">-</p>
                )}
            </div>

            {/* Modal Konfirmasi Hapus */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white dark:bg-boxdark p-6 rounded shadow-md">
                        <h3 className="text-lg font-semibold mb-4 text-black dark:text-white">Konfirmasi Hapus</h3>
                        <p className="text-black dark:text-white mb-6">
                            Apakah Anda yakin ingin menghapus data untuk YEAR_ID: {selectedYear} dan MONTH_ID: {selectedMonth}?
                        </p>
                        <div className="flex justify-end">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 bg-gray-500 text-black dark:text-white rounded"
                            >
                                Batal
                            </button>
                            <button
                                onClick={async () => {
                                    if (selectedYear && selectedMonth) {
                                        await handleDelete(selectedYear, selectedMonth);
                                        closeModal();
                                    }
                                }}
                                className="px-4 py-2 bg-red-500 text-white rounded mr-2"
                            >
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PmsTable;