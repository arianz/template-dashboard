import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { format, parseISO } from 'date-fns';

interface Order {
  ORDER_ID: string;
  ORDER_SUBTYPE: string;
  ORDER_TYPE: string;
  LI_PRODUCT_NAME: string;
  KATEGORI_PRODUCT: string;
  WITEL: string;
  ORDER_CREATED_DATE: string; // Change type to string
  MILESTONE: string;
  ORDER_STATUS: string;
  NIPNAS: string;
  PRIODE: string;
}

interface AosodomoroProps {
  ordersData: Order[];
}

const Aosodomoro: React.FC<AosodomoroProps> = ({ ordersData }) => {
  const { nipnas } = useParams<{ nipnas: string }>(); // Dapatkan NIPNAS dan nama pelanggan dari URL params
  const [orders, setOrders] = useState<Order[]>(ordersData);

  useEffect(() => {
    axios.get(`http://localhost:5000/aosodomoro/${nipnas}`)
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the data!", error);
      });
  }, [nipnas]);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h1 className="mb-4 font-semibold text-lg">Order Aosodomoro</h1>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="py-4 px-4 font-medium text-center text-black dark:text-white">
                Order ID
              </th>
              <th className="py-4 px-4 font-medium text-center text-black dark:text-white">
                Subtype
              </th>
              <th className="py-4 px-4 font-medium text-center text-black dark:text-white">
                Type
              </th>
              <th className="py-4 px-4 font-medium text-center text-black dark:text-white">
                Product
              </th>
              <th className="py-4 px-4 font-medium text-center text-black dark:text-white">
                Category
              </th>
              <th className="py-4 px-4 font-medium text-center text-black dark:text-white">
                Witel
              </th>
              <th className="py-4 px-4 font-medium text-center text-black dark:text-white">
                Created Date
              </th>
              <th className="py-4 px-4 font-medium text-center text-black dark:text-white">
                Milestone
              </th>
              <th className="py-4 px-4 font-medium text-center text-black dark:text-white">
                Status
              </th>
              <th className="py-4 px-4 font-medium text-center text-black dark:text-white">
                Nipnas
              </th>
              <th className="py-4 px-4 font-medium text-center text-black dark:text-white">
                Periode
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr
                key={index}
                className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800"
              >
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <h5 className="font-small text-center text-black dark:text-white">
                    {order.ORDER_ID}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <h5 className="font-small text-center text-black dark:text-white">
                    {order.ORDER_SUBTYPE}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <h5 className="font-small text-center text-black dark:text-white">
                    {order.ORDER_TYPE}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <h5 className="font-small text-center text-black dark:text-white">
                    {order.LI_PRODUCT_NAME}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <h5 className="font-small text-center text-black dark:text-white">
                    {order.KATEGORI_PRODUCT}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <h5 className="font-small text-center text-black dark:text-white">
                    {order.WITEL}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <h5 className="font-small text-center text-black dark:text-white">
                    {format(parseISO(order.ORDER_CREATED_DATE), 'dd/MM/yyyy')}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <h5 className="font-small text-center text-black dark:text-white">
                    {order.MILESTONE}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <h5 className="font-small text-center text-black dark:text-white">
                    {order.ORDER_STATUS}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <h5 className="font-small text-center text-black dark:text-white">
                    {order.NIPNAS}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <h5 className="font-small text-center text-black dark:text-white">
                    {order.PRIODE}
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
