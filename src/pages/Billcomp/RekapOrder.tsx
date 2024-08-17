import React from 'react';
import BreadcrumbBillcomp from '../../components/Breadcrumbs/Breadcrumb-billcomp';
import ChartThree from '../../components/Charts/ChartThree';
import TableOne from '../../components/Tables/TableRekapOrder';

const RekapOrder: React.FC = () => {
  return (
    <>
      <BreadcrumbBillcomp pageName="Rekap Order" />
      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartThree />
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
      </div>
    </>
  );
};

export default RekapOrder;