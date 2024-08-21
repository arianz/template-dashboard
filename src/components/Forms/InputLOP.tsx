import React, { useState } from 'react';
import BreadcrumbLOP from '../Breadcrumbs/Breadcrumb-lop';

const InputLOP = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5; // Sesuaikan jumlah halaman yang diperlukan

  const [formData, setFormData] = useState({
    orderType: '',
    namaAM: '',
    pelanggan: '',
    nipnas: '',
    judulProject: '',
    namaProduk: '',
    estOTC: '',
    estBulanan: '',
    estTotalQ1: '',
    estTotalProject2024: '',
    estTotalProject: '',
    bulanBillcomp: '',
    periodeKontrak2024: '',
    nilaiBillcomp: '',
    statusProject: '',
    poin: '',
    statusFunnel: '',
    kategoriKontrak: '',
    kategoriLOP: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSubmit = async () => {
    setIsModalOpen(false);
    try {
        const response = await fetch('http://localhost:5000/lop', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            setIsSubmitSuccess(true);
        } else {
            alert('Failed to submit form');
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('An error occurred');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const isFormValid = () => {
    return Object.values(formData).some(value => value !== '');
  };

  return (
    <>
      <BreadcrumbLOP pageName="Input LOP" />

        <div className="flex justify-center items-center">
          <div className="w-full max-w-xl p-6 rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <div className="w-full bg-gray-300 rounded-full h-2.5 relative">
                <div
                  className="bg-blue-500 h-2.5 rounded-full flex items-center justify-center text-black dark:text-white text-xs"
                  style={{ width: `${(currentPage / totalPages) * 100}%` }}
                >
                  <span className="absolute right-0 pr-1">
                    {Math.round((currentPage / totalPages) * 100)}%
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 p-6.5">
              {currentPage === 1 && (
                <>
                  <div>
                    <label className="mb-3 block text-black dark:text-white">
                      Order Type
                    </label>
                    <input
                      type="text"
                      placeholder="Masukkan data Order Type"
                      name="orderType"
                      value={formData.orderType}
                      onChange={handleChange}
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="mb-3 block text-black dark:text-white">
                      Nama AM
                    </label>
                    <input
                      type="text"
                      placeholder="Masukkan data Nama AM"
                      name="namaAM"
                      value={formData.namaAM}
                      onChange={handleChange}
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="mb-3 block text-black dark:text-white">
                      Pelanggan
                    </label>
                    <input
                      type="text"
                      placeholder="Masukkan data Pelanggan"
                      name="pelanggan"
                      value={formData.pelanggan}
                      onChange={handleChange}
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="mb-3 block text-black dark:text-white">
                      NIPNAS
                    </label>
                    <input
                      type="text"
                      placeholder="Masukkan data NIPNAS"
                      name="nipnas"
                      value={formData.nipnas}
                      onChange={handleChange}
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  {/* Tambahkan input lainnya sesuai kebutuhan */}
                </>
              )}
              {currentPage === 2 && (
                <>
                  <div>
                    <label className="mb-3 block text-black dark:text-white">
                      Judul Project
                    </label>
                    <input
                      type="text"
                      placeholder="Masukkan data Judul Project"
                      name="judulProject"
                      value={formData.judulProject}
                      onChange={handleChange}
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="mb-3 block text-black dark:text-white">
                      Nama Produk
                    </label>
                    <input
                      type="text"
                      placeholder="Masukkan data Nama Produk"
                      name="namaProduk"
                      value={formData.namaProduk}
                      onChange={handleChange}
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="mb-3 block text-black dark:text-white">
                      Est OTC
                    </label>
                    <input
                      type="text"
                      placeholder="Masukkan data Est OTC"
                      name="estOTC"
                      value={formData.estOTC}
                      onChange={handleChange}
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="mb-3 block text-black dark:text-white">
                      Est Bulanan
                    </label>
                    <input
                      type="text"
                      placeholder="Masukkan data Est Bulanan"
                      name="estBulanan"
                      value={formData.estBulanan}
                      onChange={handleChange}
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  {/* Tambahkan input lainnya sesuai kebutuhan */}
                </>
              )}
              {currentPage === 3 && (
                <>
                  <div>
                    <label className="mb-3 block text-black dark:text-white">
                      Est Total Q1
                    </label>
                    <input
                      type="text"
                      placeholder="Masukkan data Est Total Q1"
                      name="estTotalQ1"
                      value={formData.estTotalQ1}
                      onChange={handleChange}
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="mb-3 block text-black dark:text-white">
                      Est Total Project 2024
                    </label>
                    <input
                      type="text"
                      placeholder="Masukkan data Est Total Project 2024"
                      name="estTotalProject2024"
                      value={formData.estTotalProject2024}
                      onChange={handleChange}
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="mb-3 block text-black dark:text-white">
                      Est Total Project
                    </label>
                    <input
                      type="text"
                      placeholder="Masukkan data Est Total Project"
                      name="estTotalProject"
                      value={formData.estTotalProject}
                      onChange={handleChange}
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="mb-3 block text-black dark:text-white">
                      Bulan Billcomp
                    </label>
                    <input
                      type="text"
                      placeholder="Masukkan data Bulan Billcomp"
                      name="bulanBillcomp"
                      value={formData.bulanBillcomp}
                      onChange={handleChange}
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  {/* Tambahkan input lainnya sesuai kebutuhan */}
                </>
              )}
              {currentPage === 4 && (
                <>
                  <div>
                    <label className="mb-3 block text-black dark:text-white">
                      Periode Kontrak 2024
                    </label>
                    <input
                      type="text"
                      placeholder="Masukkan data Periode Kontrak 2024"
                      name="periodeKontrak2024"
                      value={formData.periodeKontrak2024}
                      onChange={handleChange}
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="mb-3 block text-black dark:text-white">
                      Nilai Billcomp
                    </label>
                    <input
                      type="text"
                      placeholder="Masukkan data Nilai Billcomp"
                      name="nilaiBillcomp"
                      value={formData.nilaiBillcomp}
                      onChange={handleChange}
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="mb-3 block text-black dark:text-white">
                      Status Project
                    </label>
                    <input
                      type="text"
                      placeholder="Masukkan data Status Project"
                      name="statusProject"
                      value={formData.statusProject}
                      onChange={handleChange}
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="mb-3 block text-black dark:text-white">
                      Poin
                    </label>
                    <input
                      type="text"
                      placeholder="Masukkan data Poin"
                      name="poin"
                      value={formData.poin}
                      onChange={handleChange}
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  {/* Tambahkan input lainnya sesuai kebutuhan */}
                </>
              )}
              {currentPage === 5 && (
                <>
                  <div>
                    <label className="mb-3 block text-black dark:text-white">
                        Status Funnel
                    </label>
                    <input
                      type="text"
                      placeholder="Masukkan data Status Funnel"
                      name="statusFunnel"
                      value={formData.statusFunnel}
                      onChange={handleChange}
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="mb-3 block text-black dark:text-white">
                      Kategori Kontrak
                    </label>
                    <input
                      type="text"
                      placeholder="Masukkan data Kategori Kontrak"
                      name="kategoriKontrak"
                      value={formData.kategoriKontrak}
                      onChange={handleChange}
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="mb-3 block text-black dark:text-white">
                      Kategori LOP
                    </label>
                    <input
                      type="text"
                      placeholder="Masukkan data Kategori LOP"
                      name="kategoriLOP"
                      value={formData.kategoriLOP}
                      onChange={handleChange}
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  {/* Tambahkan input lainnya sesuai kebutuhan */}
                </>
              )}
              {/* Tambahkan lebih banyak halaman sesuai kebutuhan */}
                <div className="flex justify-center mt-4">
                    <button
                    onClick={handlePrevious}
                    className={`px-4 py-2 rounded bg-gray-300 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={currentPage === 1}
                    >
                    Kembali
                    </button>
                    {currentPage < totalPages ? (
                    <button
                        onClick={handleNext}
                        className="px-4 py-2 rounded bg-blue-500 text-white"
                    >
                        Next
                    </button>
                    ) : (
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className={`px-4 py-2 rounded bg-green-500 text-white ${!isFormValid() ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={!isFormValid()}
                    >
                        Submit
                    </button>
                    )}
                </div>
            </div>
          </div>
        </div>
        {/* Modal Konfirmasi */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg dark:bg-strokedark">
              <h3 className="text-lg font-medium mb-2">Konfirmasi</h3>
              <p>Apakah Anda yakin ingin mengirim data ini?</p>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 mr-2 rounded bg-gray-300"
                >
                  Batal
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 rounded bg-green-500 text-white"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal Keberhasilan */}
        {isSubmitSuccess && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg dark:bg-strokedark">
              <h3 className="text-lg font-medium mb-2">Berhasil!</h3>
              <p>Data berhasil ditambahkan.</p>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setIsSubmitSuccess(false)}
                  className="px-4 py-2 rounded bg-blue-500 text-white"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )}
    </>
  );
};

export default InputLOP;
