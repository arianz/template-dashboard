import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ChartOne from '../components/Charts/ChartOne';
import ActiveServices from '../components/Tables/ActiveServices';
import Aosodomoro from '../components/Tables/Aosodomoro';
import CollNonPOTS from '../components/Tables/CollectionNonPOTS';
import { Package } from '../types/package'; // Import the Package type

const DetailNipnas: React.FC = () => {
  const { name, nipnas } = useParams<{ name: string; nipnas: string }>();
  const [customerData, setCustomerData] = useState<Package | null>(null);
  const [pmsData, setPmsData] = useState<any[]>([]);
  const [ordersData, setOrdersData] = useState<any[]>([]);
  const [collectionsData, setCollectionsData] = useState<any[]>([]);
  const [pmsUpdatedAt, setPmsUpdatedAt] = useState<string | null>(null);
  const [ordersUpdatedAt, setOrdersUpdatedAt] = useState<string | null>(null);
  const [collectionsUpdatedAt, setCollectionsUpdatedAt] = useState<string | null>(null);

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

    const fetchPmsUpdatedAt = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/pms-updated-at/${nipnas}`);
        setPmsUpdatedAt(response.data.updated_at);
      } catch (error) {
        console.error('Error fetching PMS updated_at:', error);
      }
    };

    const fetchOrdersUpdatedAt = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/aosodomoro-updated-at/${nipnas}`);
        setOrdersUpdatedAt(response.data.updated_at);
      } catch (error) {
        console.error('Error fetching Aosodomoro updated_at:', error);
      }
    };

    const fetchCollectionsUpdatedAt = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/collection-updated-at/${nipnas}`);
        setCollectionsUpdatedAt(response.data.updated_at);
      } catch (error) {
        console.error('Error fetching Collection updated_at:', error);
      }
    };

    fetchCustomerDetails();
    fetchPmsData();
    fetchOrdersData();
    fetchCollectionsData();
    fetchPmsUpdatedAt();
    fetchOrdersUpdatedAt();
    fetchCollectionsUpdatedAt();
  }, [name, nipnas]);

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  if (!customerData) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
        <div className="text-md rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
          <p>Nipnas: {customerData.NIPNAS}</p>
          <p>Nama Pelanggan: {truncateText(customerData.NAMA_PELANGGAN, 30)}</p>
          <p>Nama AM: {truncateText(name || '', 30)}</p>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne pmsData={pmsData} />
        
        <div className="col-span-12 xl:col-span-8">
          <ActiveServices pmsData={pmsData} />
        </div>
        <div className="col-span-12 xl:col-span-8 overflow-x-auto">
          <Aosodomoro ordersData={ordersData} />
        </div>
        <div className="col-span-12 xl:col-span-8">
          <CollNonPOTS collectionsData={collectionsData} />
        </div>
        <div className="text-md rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 col-span-6">
          <p>PMS Update Date: {pmsUpdatedAt ? new Date(pmsUpdatedAt).toLocaleString() : 'N/A'}</p>
          <p>Aosodomoro Update Date: {ordersUpdatedAt ? new Date(ordersUpdatedAt).toLocaleString() : 'N/A'}</p>
          <p>Collection Profile Update Date: {collectionsUpdatedAt ? new Date(collectionsUpdatedAt).toLocaleString() : 'N/A'}</p>
        </div>
      </div>
    </>
  );
};

export default DetailNipnas;
