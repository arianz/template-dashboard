import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ChartOne from '../components/Charts/ChartOne';
import ActiveServices from '../components/Tables/ActiveServices';
import Aosodomoro from '../components/Tables/Aosodomoro';
import CollNonPOTS from '../components/Tables/CollectionNonPOTS';
import { Package } from '../types/package'; // Import the Package type

const DetailNipnas = () => {
  const { name, nipnas } = useParams();
  const [customerData, setCustomerData] = useState<Package | null>(null); // Use Package type for customerData

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/mapping_am/${name}/${nipnas}`);
        setCustomerData(response.data);
      } catch (error) {
        console.error('Error fetching customer details:', error);
      }
    };

    fetchCustomerDetails();
  }, [name, nipnas]);

  if (!customerData) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
        <div className="text-md rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
          <p>Nipnas: {customerData.NIPNAS}</p>
          <p>Nama Pelanggan: {customerData.NAMA_PELANGGAN}</p>
          {/*<p>Assigned to: {customerData.NAMA_AM}</p>*/}
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        
        <div className="col-span-12 xl:col-span-8">
          <ActiveServices />
        </div>
        <div className="col-span-12 xl:col-span-8">
          <Aosodomoro />
        </div>
        <div className="col-span-12 xl:col-span-8">
          <CollNonPOTS />
        </div>
        <div className="text-md rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 col-span-6">
          <p>PMS Update Date: DD/MM/YY 00:00</p>
          <p>Aosodomoro Update Date: DD/MM/YY 00:00</p>
          <p>Collection Profile Update Date: DD/MM/YY 00:00</p>
        </div>
      </div>
    </>
  );
};

export default DetailNipnas;
