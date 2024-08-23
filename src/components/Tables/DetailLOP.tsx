import React, { useState, useEffect } from 'react';
import { FaSearch, FaEdit, FaTrashAlt, FaDownload, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import logo from '../../images/logo/logo-telkom.png';
import autoTable from 'jspdf-autotable';

type LOP = {
  orderType: string;
  namaAM: string;
  pelanggan: string;
  nipnas: string;
  judulProject: string;
  namaProduk: string;
  estOTC: string;
  estBulanan: string;
  estTotalQ1: string;
  estTotalProject2024: string;
  estTotalProject: string;
  bulanBillcomp: string;
  periodeKontrak2024: string;
  nilaiBillcomp: string;
  statusProject: string;
  poin: string;
  statusFunnel: string;
  kategoriKontrak: string;
  kategoriLOP: string;
};

const DetailLOP = () => {
  const [lopData, setLopData] = useState<LOP[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/lop');
        const data = await response.json();
        setLopData(data);
      } catch (error) {
        console.error('Error fetching LOP data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const filteredData = lopData.filter((lop) =>
    Object.values(lop).some((value) =>
      value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const columnWidth = 'min-w-[150px]';

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleEdit = (judulProject: string, namaProduk: string) => {
    navigate(`/edit-lop/${judulProject}/${namaProduk}`);
  };

  const handleDelete = async (judulProject: string, namaProduk: string) => {
    try {
      const response = await fetch(`http://localhost:5000/lop/${judulProject}/${namaProduk}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setLopData((prevData) =>
          prevData.filter((lop) => !(lop.judulProject === judulProject && lop.namaProduk === namaProduk)
        ));
        console.log('LOP data deleted successfully');
      } else {
        console.error('Failed to delete LOP');
      }
    } catch (error) {
      console.error('Error deleting LOP:', error);
    }
  };

  const handleDownload = (judulProject: string, namaProduk: string) => {
    const lop = lopData.find((data) => data.judulProject === judulProject && data.namaProduk === namaProduk);

    if (lop) {
      const doc = new jsPDF();

      // Mengambil tanggal dan waktu download
      const currentDate = new Date();
      const downloadTime = currentDate.toLocaleString();

      // Menambahkan logo
      const imgWidth = 40;
      const imgHeight = 30;
      doc.addImage(logo, 'PNG', 10, 5, imgWidth, imgHeight);

      // Menambahkan judul di tengah atas
      doc.setFontSize(16);
      doc.text("Detail LOP", 105, 50, { align: 'center' });

      // Menambahkan waktu download di pojok kanan atas
      doc.setFontSize(10);
      doc.text(`Downloaded: ${downloadTime}`, 200, 10, { align: 'right' });

      // Menambahkan detail LOP
      autoTable(doc, {
        startY: 60, // Tempat dimulainya tabel
        head: [['Field', 'Value']],
        body: [
            ['Order Type', lop.orderType],
            ['Nama AM', lop.namaAM],
            ['Pelanggan', lop.pelanggan],
            ['NIPNAS', lop.nipnas],
            ['Judul Project', lop.judulProject],
            ['Nama Produk', lop.namaProduk],
            ['Est. OTC', lop.estOTC],
            ['Est. Bulanan', lop.estBulanan],
            ['Est. Total Q1', lop.estTotalQ1],
            ['Est. Total Project 2024', lop.estTotalProject2024],
            ['Est. Total Project', lop.estTotalProject],
            ['Bulan Billcomp', lop.bulanBillcomp],
            ['Periode Kontrak 2024', lop.periodeKontrak2024],
            ['Nilai Billcomp', lop.nilaiBillcomp],
            ['Status Project', lop.statusProject],
            ['Poin', lop.poin],
            ['Status Funnel', lop.statusFunnel],
            ['Kategori Kontrak', lop.kategoriKontrak],
            ['Kategori LOP', lop.kategoriLOP],
        ],
        styles: {
            fontSize: 10,
            cellPadding: 3,
        },
        headStyles: {
            fillColor: [221, 221, 221],
            textColor: [0, 0, 0],
        },
        alternateRowStyles: {
            fillColor: [245, 245, 245],
        },
    });

      doc.save(`Detail LOP ${lop.judulProject}-${lop.namaProduk}.pdf`);
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex gap-2 my-3">
        <h1 className="font-bold text-xl">Tabel Detail LOP</h1>
        <input
          type="text"
          placeholder="Masukkan data"
          className="border border-gray-300 ml-auto p-2 rounded dark:bg-form-input dark:text-white dark:border-slate-600"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="bg-blue-500 text-white p-2.5 rounded">
          <FaSearch className="w-5 h-5" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-full mt-4"> 
          <div className="flex grid-rows-1 bg-gray-100">
            {[
              'Order Type', 'Nama AM', 'Pelanggan', 'NIPNAS', 'Judul Project',
              'Nama Produk', 'Est. OTC', 'Est. Bulanan', 'Est. Total Q1', 
              'Est. Total Project 2024', 'Est. Total Project', 'Bulan Billcomp',
              'Periode Kontrak 2024', 'Nilai Billcomp', 'Status Project',
              'Poin', 'Status Funnel', 'Kategori Kontrak', 'Kategori LOP', 'Aksi'
            ].map((header, index) => (
              <div
                key={index}
                className={`px-4 py-4 border-b-2 border-gray-300 text-center bg-gray-200 dark:bg-gray-700 dark:border-gray-600 ${columnWidth}`}
              >
                <h5 className="text-xs font-medium uppercase xsm:text-xs">{header}</h5>
              </div>
            ))}
          </div>

          {currentItems.length > 0 ? (
            currentItems.map((lop, index) => (
              <div
                className={`flex grid-rows-1 hover:bg-gray-100 dark:hover:bg-gray-800 ${
                  index === currentItems.length - 1 ? '' : 'border-b border-stroke dark:border-strokedark'
                }`}
                key={lop.nipnas ? `${lop.nipnas}-${index}` : `item-${index}`}
              >
                {[
                  lop.orderType, lop.namaAM, lop.pelanggan, lop.nipnas, lop.judulProject,
                  lop.namaProduk, lop.estOTC, lop.estBulanan, lop.estTotalQ1,
                  lop.estTotalProject2024, lop.estTotalProject, lop.bulanBillcomp,
                  lop.periodeKontrak2024, lop.nilaiBillcomp, lop.statusProject,
                  lop.poin, lop.statusFunnel, lop.kategoriKontrak, lop.kategoriLOP
                ].map((value, index) => (
                  <div
                    key={index}
                    className={`px-4 py-4 border-b border-gray-200 text-center dark:border-gray-700 ${columnWidth}`}
                  >
                    {value}
                  </div>
                ))}
                <div
                  className={`px-4 py-4 border-b border-gray-200 text-center dark:border-gray-700 ${columnWidth} flex items-center justify-center space-x-2`}
                >
                  <button
                    className="text-yellow-500 hover:text-yellow-700"
                    onClick={() => handleEdit(lop.judulProject, lop.namaProduk)}
                  >
                    <FaEdit className="w-5 h-5" />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(lop.judulProject, lop.namaProduk)}
                  >
                    <FaTrashAlt className="w-5 h-5" />
                  </button>
                  <button
                    className="text-green-500 hover:text-green-700"
                    onClick={() => handleDownload(lop.judulProject, lop.namaProduk)}
                  >
                    <FaDownload className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="px-4 py-4 text-center text-gray-500 dark:text-gray-400">
              Tidak ada data yang cocok dengan pencarian Anda.
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center items-center">
        <button
          className={`p-2 ${currentPage === 1 ? 'text-gray-400' : 'text-black dark:text-white'}`}
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          <FaChevronLeft />
        </button>
        <span className="my-3 text-black dark:text-white">
          {currentPage} / {totalPages}
        </span>
        <button
          className={`p-2 ${currentPage === totalPages ? 'text-gray-400' : 'text-black dark:text-white'}`}
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default DetailLOP;