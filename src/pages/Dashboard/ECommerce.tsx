import React from 'react';
import CardDataStats from '../../components/CardDataStats';
import ChartOne from '../../components/Charts/ChartOne';
import ChartThree from '../../components/Charts/ChartThree';
import ChartTwo from '../../components/Charts/ChartTwo';
import ChatCard from '../../components/Chat/ChatCard';
import MapOne from '../../components/Maps/MapOne';
import ActiveServices from '../../components/Tables/ActiveServices';
import Aosodomoro from '../../components/Tables/Aosodomoro';
import CollNonPOTS from '../../components/Tables/CollectionNonPOTS';

const ECommerce: React.FC = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
          <div className="text-md rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
            <p>Nipnas: 129382</p>
            <p>Nama Pelanggan: PT Blabla</p>
            <p>Assigned to: Nama AM</p>
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

export default ECommerce;
