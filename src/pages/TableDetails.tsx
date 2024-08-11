import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DetailsAM from '../components/Tables/TableDetailsAM';

const TableDetails = () => {
  // Here you can fetch the details based on the ID or use the ID to display specific details

  return (
    <>
      <Breadcrumb pageName="Daftar Pelanggan" />

      <div className="flex flex-col gap-10">
        <DetailsAM />
      </div>
    </>
  );
};

export default TableDetails;
