import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ChartOne from '../components/Charts/ChartOne';
import ActiveServices from '../components/Tables/ActiveServices';
import Aosodomoro from '../components/Tables/Aosodomoro';
import CollNonPOTS from '../components/Tables/CollectionNonPOTS';
import { Package } from '../types/package'; // Import the Package type

const DetailNipnas: React.FC = () => {
  const { name, nipnas } = useParams<{ name: string; nipnas: string }>(); // Define the expected type of params
  const [customerData, setCustomerData] = useState<Package | null>(null); // Use Package type for customerData
  const [pmsData, setPmsData] = useState<any[]>([]); // State to store PMS data
  const [ordersData, setOrdersData] = useState<any[]>([]); // State to store orders data
  const [collectionsData, setCollectionsData] = useState<any[]>([]); // State to store collections data

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/mapping_am/${name}/${nipnas}`);
        setCustomerData(response.data);
      } catch (error) {
        console.error('Error fetching customer details:', error);
      }
    };

    const fetchPmsData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/pms/${nipnas}`);
        setPmsData(response.data);
      } catch (error) {
        console.error('Error fetching PMS data:', error);
      }
    };

    const fetchOrdersData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/aosodomoro/${nipnas}`);
        setOrdersData(response.data);
      } catch (error) {
        console.error('Error fetching orders data:', error);
      }
    };

    const fetchCollectionsData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/collection/${nipnas}`);
        setCollectionsData(response.data);
      } catch (error) {
        console.error('Error fetching collections data:', error);
      }
    };

    fetchCustomerDetails();
    fetchPmsData();
    fetchOrdersData();
    fetchCollectionsData();
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
        <ChartOne pmsData={pmsData} />
        
        <div className="col-span-12 xl:col-span-8">
          <ActiveServices pmsData={pmsData} /> {/* Pass pmsData as a prop */}
        </div>
        <div className="col-span-12 xl:col-span-8 overflow-x-auto">
          <Aosodomoro ordersData={ordersData} /> {/* Pass ordersData as a prop */}
        </div>
        <div className="col-span-12 xl:col-span-8">
          <CollNonPOTS collectionsData={collectionsData} /> {/* Pass collectionsData as a prop */}
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
