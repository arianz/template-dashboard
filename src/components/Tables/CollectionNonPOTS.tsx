import { Package } from '../../types/package';
import { useNavigate } from 'react-router-dom';

const packageData: Package[] = [
  {
    name: '-',
    price: 0.0,
    invoiceDate: `-`,
    status: 'Paid',
  },
  {
    name: '-',
    price: 59.0,
    invoiceDate: `-`,
    status: 'Paid',
  },
  {
    name: '-',
    price: 99.0,
    invoiceDate: `-`,
    status: 'Unpaid',
  },
  {
    name: '-',
    price: 59.0,
    invoiceDate: `-`,
    status: 'Pending',
  },
];

const CollNonPOTS = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <h1 className="mb-4 font-semibold text-lg">Profile Collection Non POTS</h1>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-center text-black dark:text-white xl:pl-11">
                Payment Category
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-center text-black dark:text-white">
                Saldo (Rp)
              </th>
            </tr>
          </thead>
          <tbody>
            {packageData.map((packageItem, key) => (
              <tr
                key={key}
                className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800"
              >
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-center text-black dark:text-white">
                    {packageItem.name}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-center text-black dark:text-white">
                    {packageItem.invoiceDate}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CollNonPOTS;