import { useParams } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import TableDetailsAM from '../components/Tables/TableDetailsAM';

const TableDetails = () => {
    const { id } = useParams();
  // Here you can fetch the details based on the ID or use the ID to display specific details

  return (
    <>
      <Breadcrumb pageName="Daftar Pelanggan AM" />

      <div className="flex flex-col gap-10">
        <h1>Detail for AM ID: {id}</h1>
        <TableDetailsAM />
      </div>
    </>
  );
};

export default TableDetails;
