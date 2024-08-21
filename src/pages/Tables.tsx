import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TableThree from '../components/Tables/TableThree';
import { FaSearch } from "react-icons/fa";

const Tables = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = async () => {
    // Assuming the user inputs "name:nipnas" or "nipnas,name"
    const [name, nipnas] = searchQuery.split(/[:,]/); // Split by either ':' or ','

    if (!nipnas || !name) return;

    try {
      const response = await fetch(`http://localhost:5000/mapping_am/${name.trim()}/${nipnas.trim()}`);
      const data = await response.json();

      if (data && data.NIPNAS && data.NAMA_AM_MAPPING) {
        navigate(`/detail-am/${data.NAMA_AM_MAPPING}/${data.NIPNAS}`);
      } else {
        alert('An error occurred while searching. Please try again.');
      }
    } catch (error) {
      console.error('Error fetching NIPNAS:', error);
      alert('Nama AM atau Nipnas yang dimasukkan salah');
    }
  };

  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="flex justify-end gap-2 mt-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Nama AM, Nipnas"
            className="border border-gray-300 p-2 rounded dark:bg-boxdark dark:text-gray-100 dark:border-strokedark"
          />
          <button onClick={handleSearch} className="bg-blue-500 text-white p-2.5 rounded">
            <FaSearch className='w-5 h-5' />
          </button>
        </div>

        <TableThree />
      </div>
    </>
  );
};

export default Tables;
