import React, { useState, ChangeEvent } from 'react';
import * as XLSX from 'xlsx';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';

const UploadPelanggan: React.FC = () => {
    const [fileData, setFileData] = useState<any[][] | null>(null);
    const [fileName, setFileName] = useState<string>("");

    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event: ProgressEvent<FileReader>) => {
                const binaryStr = event.target?.result;
                if (typeof binaryStr === "string") {
                    const workbook = XLSX.read(binaryStr, { type: 'binary' });
                    const firstSheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[firstSheetName];
                    const data: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
                    setFileData(data);
                    setFileName(file.name);
                }
            };
            reader.readAsBinaryString(file);
        }
    };

    const templates = [
        { name: "TEMPLATE MAPPING AM.csv", path: "../templates/TEMPLATE MAPPING AM.csv" },
        { name: "TEMPLATE AOSODOMORO.csv", path: "../templates/TEMPLATE AOSODOMORO.csv" },
        { name: "TEMPLATE PMS.csv", path: "../templates/TEMPLATE PMS.csv" },
        { name: "TEMPLATE MASTER CBASE.csv", path: "../templates/TEMPLATE MASTER CBASE.csv" },
    ];

    return (
        <>
            <Breadcrumb pageName="Upload Pelanggan" />
            <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
                <div className="flex flex-col gap-9">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="flex flex-row gap-5.5 p-6.5">
                            <div className='w-1/2'>
                                <label className="mb-3 block text-black dark:text-white">
                                    Attach file
                                </label>
                                <input
                                    type="file"
                                    accept=".xlsx, .csv"
                                    onChange={handleFileUpload}
                                    className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                                />
                            </div>
                            <div className="w-1/2">
                                <h4 className="text-black dark:text-white mb-3">Download Templates:</h4>
                                <div className="relative inline-block w-full text-black dark:text-white">
                                    <select
                                        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-3 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
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
                        <div className='flex flex-col gap-5.5 p-6.5'>
                            {fileData && (
                                <div className="mt-5 overflow-x-auto">
                                    <h4 className="text-black dark:text-white mb-3">Preview of {fileName}:</h4>
                                    <table className="table-auto w-full">
                                        <thead>
                                            <tr>
                                                {fileData[0].map((col, index) => (
                                                    <th key={index} className="border px-4 py-2">{col}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {fileData.slice(1).map((row, rowIndex) => (
                                                <tr key={rowIndex}>
                                                    {row.map((cell, cellIndex) => (
                                                        <td key={cellIndex} className="border px-4 py-2">{cell}</td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UploadPelanggan;
