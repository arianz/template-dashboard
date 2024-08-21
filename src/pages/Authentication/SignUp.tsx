import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import LogoDark from '../../images/logo/logo-telkom.png';
import Logo from '../../images/logo/logo-reverse-telkom.png';
import { FaRegUser } from 'react-icons/fa';
import { GoShieldLock } from 'react-icons/go';
import DarkModeSwitcher from '../../components/Header/DarkModeSwitcher';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('manajemen');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validasi input
    if (!username || !password) {
      toast.error('Username and password are required.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/signup', {
        username,
        password,
        role,
      });

      if (response.data.success) {
        setShowModal(true);
      } else {
        toast.error('Error: ' + response.data.message);
      }
    } catch (error) {
      toast.error('An error occurred during sign up.');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/auth/signin');
  };

  return (
    <div className="rounded-sm h-screen border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex flex-wrap items-center">
        <div className="hidden w-full xl:block xl:w-1/2">
          <div className="py-17.5 px-26 text-center">
            <img className="hidden dark:block" src={Logo} alt="Logo" />
            <img className="dark:hidden" src={LogoDark} alt="Logo" />
            <p className="2xl:px-20">Welcome to Website Dashboard Witel Suramadu.</p>
          </div>
        </div>
        <div className="w-full xl:w-1/2 xl:border-l-2">
          <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
            <div className="flex justify-between items-center mb-9">
              <h2 className="text-2xl font-bold text-black dark:text-white sm:text-title-xl2">Sign Up to Dashboard</h2>
              <DarkModeSwitcher />
            </div>
            <form onSubmit={handleSignUp}>
              <div className="mb-4">
                <label className="mb-2.5 block font-medium text-black dark:text-white">Username</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter your username"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <span className="absolute right-4 top-5 opacity-50">
                    <FaRegUser />
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <label className="mb-2.5 block font-medium text-black dark:text-white">Password</label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span className="absolute right-4 top-5 opacity-50">
                    <GoShieldLock />
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <label className="mb-2.5 block font-medium text-black dark:text-white">Akses sebagai:</label>
                <div className="relative">
                  <select
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="manajemen">Manajemen</option>
                    <option value="unit prq">Unit PRQ</option>
                    <option value="am">AM</option>
                  </select>
                </div>
              </div>

              <div className="mb-5">
                <input
                  type="submit"
                  value="Create account"
                  className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                />
              </div>

              <div className="mt-6 text-center">
                <p>
                  Already have an account?{' '}
                  <Link to="/auth/signin" className="text-primary">
                    Sign in
                  </Link>
                </p>
              </div>
            </form>

            {/* Modal */}
            {showModal && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white dark:bg-boxdark rounded-lg p-8 text-center">
                  <h2 className="text-lg font-bold mb-4 text-black dark:text-white">Berhasil</h2>
                  <p className="text-black dark:text-white">Akun telah ditambahkan ke database.</p>
                  <button
                    onClick={handleCloseModal}
                    className="mt-4 rounded-lg bg-primary px-4 py-2 text-white"
                  >
                    OK
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;