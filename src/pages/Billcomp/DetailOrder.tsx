import React from 'react';
import BreadcrumbBillcomp from '../../components/Breadcrumbs/Breadcrumb-billcomp';
import TableDetailOrder from '../../components/Tables/TableDetailOrder';

const DetailOrder: React.FC = () => {
  return (
    <>
      <BreadcrumbBillcomp pageName="Detail Order" />
      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-8">
          <TableDetailOrder />
        </div>
      </div>
    </>
  );
};

export default DetailOrder;