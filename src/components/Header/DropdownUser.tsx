import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ClickOutside from '../ClickOutside';
import { FaRegUser } from 'react-icons/fa';
import { IoIosArrowDown } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { BsBoxArrowLeft } from "react-icons/bs";

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState<{ username: string; role: string } | null>(null);

  useEffect(() => {
    // Ambil data user dari localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <Link
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        to="#"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black dark:text-white">
            {user ? user.username : 'Nama user'}
          </span>
          <span className="block text-xs">
            {user ? user.role : 'Pekerjaan'}
          </span>
        </span>
        <span className="h-12 w-12 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 space-x-1">
          <FaRegUser className="text-2xl text-gray-500 dark:text-white" />
          <IoIosArrowDown />
        </span>
        
      </Link>

      {/* <!-- Dropdown Start --> */}
      {dropdownOpen && (
        <div
          className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark`}
        >
          {/*<ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark">
            <li>
              <Link
                to="/profile"
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
              >
                <FaRegUser />
                My Profile
              </Link>
            </li>
            <li>
              <Link
                to="/settings"
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
              >
                <IoSettingsOutline />
                Account Settings
              </Link>
            </li>
          </ul>*/}
          <button className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base">
            <Link to="/auth/signin" className="flex items-center gap-3.5">
              <BsBoxArrowLeft />
              Log Out
            </Link>
          </button>
        </div>
      )}
      {/* <!-- Dropdown End --> */}
    </ClickOutside>
  );
};

export default DropdownUser;
