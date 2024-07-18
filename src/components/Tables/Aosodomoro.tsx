import { Package } from '../../types/package';
import { useNavigate } from 'react-router-dom';

const packageData: Package[] = [
  {
    name: '-',
    price: 0.0,
    invoiceDate: `10000`,
    status: 'Paid',
  },
  {
    name: '-',
    price: 59.0,
    invoiceDate: `25000`,
    status: 'Paid',
  },
  {
    name: '-',
    price: 99.0,
    invoiceDate: `20000`,
    status: 'Unpaid',
  },
  {
    name: '-',
    price: 59.0,
    invoiceDate: `15000`,
    status: 'Pending',
  },
];

const Aosodomoro = () => {
  const navigate = useNavigate();
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <h1 className="mb-4 font-semibold text-lg">Order Aosodomoro</h1>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[120px] py-4 px-4 font-medium text-center text-black dark:text-white xl:pl-11">
                Order ID
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-center text-black dark:text-white">
                Order Subtype
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-center text-black dark:text-white xl:pl-11">
                Order Type
              </th>
              <th className="min-w-[190px] py-4 px-4 font-medium text-center text-black dark:text-white">
                Product
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-center text-black dark:text-white xl:pl-11">
                Created Date
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-center text-black dark:text-white">
                Status Order
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
                <td className="border-b border-[#eee] py-5 px-4  dark:border-strokedark ">
                  <h5 className="font-medium text-center text-black dark:text-white">
                    {packageItem.name}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark ">
                  <h5 className="font-medium text-center text-black dark:text-white">
                    {packageItem.name}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4  dark:border-strokedark ">
                  <h5 className="font-medium text-center text-black dark:text-white">
                    {packageItem.name}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark ">
                  <h5 className="font-medium text-center text-black dark:text-white">
                    {packageItem.name}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4  dark:border-strokedark ">
                  <h5 className="font-medium text-center text-black dark:text-white">
                    {packageItem.name}
                  </h5>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Aosodomoro;