import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditLOP = () => {
  const { judulProject, namaProduk } = useParams<{ judulProject: string; namaProduk: string }>();
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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/lop/${judulProject}/${namaProduk}`);
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error('Error fetching LOP data:', error);
      }
    };

    fetchData();
  }, [judulProject, namaProduk]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/lop/${judulProject}/${namaProduk}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate('/detail-lop'); // Redirect setelah berhasil update
      } else {
        console.error('Failed to update LOP data');
      }
    } catch (error) {
      console.error('Error updating LOP data:', error);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded shadow-md dark:bg-boxdark">
      <h2 className="text-2xl font-bold mb-6 text-center">Edit LOP</h2>
      <form onSubmit={handleSubmit}>
        {/* Form fields go here */}
        <div className="mb-4">
          <label className="block text-gray-700">Order Type</label>
          <input
            type="text"
            name="orderType"
            placeholder='...'
            value={formData.orderType}
            onChange={handleInputChange}
            className="w-full p-2 border rounded dark:bg-form-input"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Nama AM</label>
          <input
            type="text"
            name="namaAM"
            placeholder='...'
            value={formData.namaAM}
            onChange={handleInputChange}
            className="w-full p-2 border rounded dark:bg-form-input"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Pelanggan</label>
          <input
            type="text"
            name="pelanggan"
            placeholder='...'
            value={formData.pelanggan}
            onChange={handleInputChange}
            className="w-full p-2 border rounded dark:bg-form-input"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Nipnas</label>
          <input
            type="text"
            name="nipnas"
            placeholder='...'
            value={formData.nipnas}
            onChange={handleInputChange}
            className="w-full p-2 border rounded dark:bg-form-input"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Judul Project</label>
          <input
            type="text"
            name="judulProject"
            placeholder='...'
            value={formData.judulProject}
            onChange={handleInputChange}
            className="w-full p-2 border rounded dark:bg-form-input"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Nama Produk</label>
          <input
            type="text"
            name="namaProduk"
            placeholder='...'
            value={formData.namaProduk}
            onChange={handleInputChange}
            className="w-full p-2 border rounded dark:bg-form-input"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Est OTC</label>
          <input
            type="text"
            name="estOTC"
            placeholder='...'
            value={formData.estOTC}
            onChange={handleInputChange}
            className="w-full p-2 border rounded dark:bg-form-input"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Est Bulanan</label>
          <input
            type="text"
            name="estBulanan"
            placeholder='...'
            value={formData.estBulanan}
            onChange={handleInputChange}
            className="w-full p-2 border rounded dark:bg-form-input"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Est Total Q1</label>
          <input
            type="text"
            name="estTotalQ1"
            placeholder='...'
            value={formData.estTotalQ1}
            onChange={handleInputChange}
            className="w-full p-2 border rounded dark:bg-form-input"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Est Total Project 2024</label>
          <input
            type="text"
            name="estTotalProject2024"
            placeholder='...'
            value={formData.estTotalProject2024}
            onChange={handleInputChange}
            className="w-full p-2 border rounded dark:bg-form-input"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Est Total Project</label>
          <input
            type="text"
            name="estTotalProject"
            placeholder='...'
            value={formData.estTotalProject}
            onChange={handleInputChange}
            className="w-full p-2 border rounded dark:bg-form-input"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Bulan Billcomp</label>
          <input
            type="text"
            name="bulanBillcomp"
            placeholder='...'
            value={formData.bulanBillcomp}
            onChange={handleInputChange}
            className="w-full p-2 border rounded dark:bg-form-input"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Periode Kontrak 2024</label>
          <input
            type="text"
            name="periodeKontrak2024"
            placeholder='...'
            value={formData.periodeKontrak2024}
            onChange={handleInputChange}
            className="w-full p-2 border rounded dark:bg-form-input"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Nilai Billcomp</label>
          <input
            type="text"
            name="nilaiBillcomp"
            placeholder='...'
            value={formData.nilaiBillcomp}
            onChange={handleInputChange}
            className="w-full p-2 border rounded dark:bg-form-input"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Status Project</label>
          <input
            type="text"
            name="statusProject"
            placeholder='...'
            value={formData.statusProject}
            onChange={handleInputChange}
            className="w-full p-2 border rounded dark:bg-form-input"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Poin</label>
          <input
            type="text"
            name="poin"
            placeholder='...'
            value={formData.poin}
            onChange={handleInputChange}
            className="w-full p-2 border rounded dark:bg-form-input"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Status Funnel</label>
          <input
            type="text"
            name="statusFunnel"
            placeholder='...'
            value={formData.statusFunnel}
            onChange={handleInputChange}
            className="w-full p-2 border rounded dark:bg-form-input"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Kategori Kontrak</label>
          <input
            type="text"
            name="kategoriKontrak"
            placeholder='...'
            value={formData.kategoriKontrak}
            onChange={handleInputChange}
            className="w-full p-2 border rounded dark:bg-form-input"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Kategori LOP</label>
          <input
            type="text"
            name="kategoriLOP"
            placeholder='...'
            value={formData.kategoriLOP}
            onChange={handleInputChange}
            className="w-full p-2 border rounded dark:bg-form-input"
          />
        </div>
        {/* Tambahkan form fields lainnya sesuai dengan field yang ada */}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
};

export default EditLOP;
