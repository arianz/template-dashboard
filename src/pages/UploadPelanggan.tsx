import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import * as XLSX from 'xlsx';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import axios from 'axios';
import PmsTable from '../components/Tables/PmsTable.js';

const UploadPelanggan: React.FC = () => {
    const [fileData, setFileData] = useState<any[][] | null>(null);
    const [fileName, setFileName] = useState<string>("");
    const [tableName, setTableName] = useState<string>("");
    const [warningMessage, setWarningMessage] = useState<string>("");
    const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isFileValid, setIsFileValid] = useState<boolean>(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);
    const [showResultModal, setShowResultModal] = useState<boolean>(false);
    const [resultMessage, setResultMessage] = useState<string>("");
    const [pmsData, setPmsData] = useState<{ YEAR_ID: number, MONTH_ID: number, count: number }[]>([]);
    const [fetchMessage, setFetchMessage] = useState<string>("");

    const rowsPerPage = 3;

    useEffect(() => {
        if (tableName === "pms") {
            fetchPmsData();
        }
    }, [tableName]);

    const fetchPmsData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/fetch-pms-data');
            if (response.data.data.length === 0) {
                setFetchMessage(response.data.message);
            } else {
                setPmsData(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching PMS data:', error);
            setFetchMessage('Error fetching PMS data');
        }
    };

    const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = async (event: ProgressEvent<FileReader>) => {
                const binaryStr = event.target?.result;
                if (typeof binaryStr === "string") {
                    const workbook = XLSX.read(binaryStr, { type: 'binary' });
                    const firstSheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[firstSheetName];
                    let data: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: ""});

                    data = data.filter(row => row.some(cell => cell !== ""));
                    const headers = data[0];

                    // Convert date numbers only in specific columns (e.g., TANGGAL_UPDATE)
                    data = data.map((row) =>
                        row.map((cell, colIndex) => {
                            const header = headers[colIndex];

                            // Only format cells in the "TANGGAL_UPDATE" column
                            if (header === 'TANGGAL_UPDATE' || header === 'ORDER_CREATED_DATE' && typeof cell === 'number') {
                                {/*const possibleDate = XLSX.SSF.format('DD/MM/YYYY', cell);
                                const isDate = possibleDate.includes('/') && new Date(possibleDate).getFullYear() > 1900;
                                return isDate ? possibleDate : cell;*/}
                                try {
                                    const formattedDate = XLSX.SSF.format('yyyy-mm-dd', cell);
                                    return formattedDate.includes('undefined') ? cell : formattedDate;
                                } catch (error) {
                                    console.error(`Error formatting date for header: ${header}`, error);
                                    return cell; // Kembalikan cell jika format gagal
                                }
                            }

                            return cell; // Leave all other cells as they are
                        })
                    );
                    
                    setFileData(data);
                    setFileName(file.name);

                    if (data.length <= 1 || data.slice(1).every(row => row.length === 0)) {
                        setWarningMessage("File yang diupload tidak memiliki data/kosong");
                        setIsSuccess(false);
                        setIsFileValid(false);
                    } else {
                        try {
                            const response = await axios.post('http://localhost:5000/validate-upload', {
                                table: tableName,
                                data: data[0]
                            });

                            if (response.data.valid) {
                                setWarningMessage("File yang diupload sudah sesuai!!");
                                setIsSuccess(true);
                                setIsFileValid(true);
                            } else {
                                setWarningMessage("File yang diupload tidak sesuai dengan tabel yang dipilih");
                                setIsSuccess(false);
                                setIsFileValid(false);
                            }
                        } catch (error) {
                            console.error("Error validating file:", error);
                            setWarningMessage("Error validating file");
                            setIsSuccess(false);
                            setIsFileValid(false);
                        }
                    }
                }
            };
            reader.readAsBinaryString(file);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (fileData && tableName && isFileValid) {
            try {
                const response = await axios.post('http://localhost:5000/upload-data', {
                    table: tableName,
                    data: fileData
                });

                if (response.data.success) {
                    setResultMessage('Data successfully uploaded to the database');
                } else {
                    setResultMessage('Failed to upload data');
                }
            } catch (error) {
                console.error("Error uploading data:", error);
                setResultMessage('Error uploading data');
            }
            setShowResultModal(true);
        } else {
            alert('Please upload a file with valid data and select a table before submitting');
        }
        setShowConfirmationModal(false);
    };

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleDelete = async (year: number, month: number) => {
        try {
            const response = await axios.post('http://localhost:5000/delete-pms-data', { year, month });
            if (response.data.success) {
                fetchPmsData();
            } else {
                console.error('Error deleting PMS data');
            }
        } catch (error) {
            console.error('Error deleting PMS data:', error);
        }

        try {
            setPmsData(prevData => prevData.filter(item => !(item.YEAR_ID === year && item.MONTH_ID === month)));
          } catch (error) {
            console.error('Error deleting data:', error);
          }
    };
    
    const templates = [
        { name: "TEMPLATE MAPPING AM", path: "../templates/TEMPLATE MAPPING AM.xlsx" },
        { name: "TEMPLATE AOSODOMORO", path: "../templates/TEMPLATE AOSODOMORO.xlsx" },
        { name: "TEMPLATE PMS", path: "../templates/TEMPLATE PMS.xlsx" },
        { name: "TEMPLATE COLLECTION", path: "../templates/TEMPLATE COLLECTION.xlsx" },
    ];

    const totalPages = fileData ? Math.ceil((fileData.length - 1) / rowsPerPage) : 0;
    const currentPageData = fileData ? fileData.slice((currentPage - 1) * rowsPerPage + 1, currentPage * rowsPerPage + 1) : [];

    return (
        <>
            <Breadcrumb pageName="Upload Pelanggan" />
            <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
                <div className="flex flex-col gap-9">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            setShowConfirmationModal(true);
                        }}>
                            <div className="flex flex-row gap-5.5 p-6.5">
                                <div className="w-1/2">
                                    <select
                                        className="block appearance-none w-full dark:bg-form-input border border-gray-400 dark:border-form-strokedark hover:border-gray-500 px-4 py-3.5 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline dark:text-white"
                                        value={tableName}
                                        onChange={(e) => setTableName(e.target.value)}
                                    >
                                        <option value="">Select a table...</option>
                                        <option value="mapping_am">Mapping AM</option>
                                        <option value="pms">PMS</option>
                                        <option value="aosodomoro">Aosodomoro</option>
                                        <option value="collection">Collection</option>
                                    </select>
                                </div>
                                <div className='w-1/2'>
                                    <input
                                        type="file"
                                        accept=".xlsx, .csv"
                                        onChange={handleFileUpload}
                                        disabled={!tableName}
                                        className={`w-full cursor-pointer rounded-md border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-not-allowed disabled:bg-gray-200 dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary ${!isFileValid ? 'pointer-not-allowed' : ''}`}
                                    />
                                </div>
                                <div className="w-1/2">
                                    <div className="relative inline-block w-full text-black dark:text-white">
                                        <select
                                            className="block appearance-none w-full dark:bg-form-input border border-gray-400 dark:border-form-strokedark hover:border-gray-500 px-4 py-3.5 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline dark:text-white"
                                            onChange={(e) => {
                                                const selectedTemplate = e.target.value;
                                                if (selectedTemplate) {
                                                    window.location.href = selectedTemplate;
                                                }
                                            }}
                                        >
                                            <option value="">Select a template to download</option>
                                            {templates.map((template, index) => (
                                                <option key={index} value={template.path}>
                                                    {template.name}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {fileData && (
                                <div>
                                    <h2 className='mb-4 ml-6'>Data Preview:</h2>
                                    {warningMessage && (
                                    <div className={`mt-4 p-3 m-6 rounded ${isSuccess ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                                        {warningMessage}
                                    </div>
                                    )}
                                    <div className="max-h-[400px] overflow-auto p-6">
                                        <table className="w-full border-collapse border border-gray-500">
                                            <thead>
                                                <tr>
                                                    {fileData[0].map((header, index) => (
                                                        <th key={index} className="border border-gray-500 px-4 py-2">{header}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentPageData.map((row, rowIndex) => (
                                                    <tr key={rowIndex}>
                                                        {row.map((cell, cellIndex) => (
                                                            <td key={cellIndex} className="border border-gray-500 px-4 py-2 text-center">{cell}</td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    {totalPages > 1 && (
                                        <div className="flex justify-center mt-4">
                                            <button
                                                type="button"
                                                onClick={() => handlePageChange(currentPage - 1)}
                                                disabled={currentPage === 1}
                                                className="mx-1 px-4 py-2 border text-black dark:bg-gray-800 dark:text-white"
                                            >
                                                &larr;
                                            </button>
                                            <span className="mx-1 px-4 py-2 border text-black dark:bg-gray-800 dark:text-white">
                                                {currentPage}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => handlePageChange(currentPage + 1)}
                                                disabled={currentPage === totalPages}
                                                className="mx-1 px-4 py-2 border text-black dark:bg-gray-800 dark:text-white"
                                            >
                                                &rarr;
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                            <div className='w-1/2 mx-auto p-6'>
                                
                                <button
                                    type="submit"
                                    className={`mt-2 w-full cursor-pointer rounded-lg border border-primary bg-primary p-3 text-white transition hover:bg-opacity-90 disabled:cursor-not-allowed ${!isFileValid ? 'pointer-not-allowed opacity-50' : ''}`}
                                    disabled={!fileData || !isFileValid}
                                >
                                    Upload
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {showConfirmationModal && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                            <div>
                                <h3 className="text-lg leading-6 font-medium text-black">
                                    Confirmation
                                </h3>
                                <div className="mt-2">
                                    <p className="text-sm text-black">
                                        Are you sure you want to upload this data to the {tableName} table?
                                    </p>
                                </div>
                            </div>
                            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={handleSubmit}
                                >
                                    Confirm
                                </button>
                                <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                                    onClick={() => setShowConfirmationModal(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {tableName === 'pms' && (
                <PmsTable 
                    pmsData={pmsData} 
                    fetchMessage={fetchMessage} 
                    handleDelete={handleDelete} 
                />
            )}

            {showResultModal && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                            <div>
                                <h3 className="text-lg leading-6 font-medium text-black">
                                    Result
                                </h3>
                                <div className="mt-2">
                                    <p className="text-sm text-black">
                                        {resultMessage}
                                    </p>
                                </div>
                            </div>
                            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={() => setShowResultModal(false)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default UploadPelanggan;