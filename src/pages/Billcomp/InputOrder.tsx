import React from 'react';
import BreadcrumbBillcomp from '../../components/Breadcrumbs/Breadcrumb-billcomp';
import TableInputOrder from '../../components/Tables/TableInputOrder';

const InputOrder: React.FC = () => {
  return (
    <>
      <BreadcrumbBillcomp pageName="Detail LOP F5" />
      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-8">
          <TableInputOrder />
        </div>
      </div>
    </>
  );
};

export default InputOrder;