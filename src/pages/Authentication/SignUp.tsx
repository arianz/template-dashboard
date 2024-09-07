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
    <div className="flex flex-col md:flex-row h-screen dark:bg-boxdark">
      <div className="md:w-1/2 flex flex-col justify-center items-center bg-white dark:bg-boxdark">
        <div className="text-center p-8 mb-8">
          <img className="hidden dark:block w-3/5 mx-auto" src={Logo} alt="Logo" />
          <img className="dark:hidden w-3/5 mx-auto" src={LogoDark} alt="Logo" />
          <p className="mt-4 text-lg">Welcome to Website Dashboard Witel Suramadu.</p>
        </div>
      </div>

      <div className="md:w-1/2 flex flex-col justify-center items-center bg-white border-t border-stroke dark:bg-boxdark dark:border-strokedark md:border-l">
        <div className="w-5/6 sm:p-10 lg:p-9">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-black dark:text-white">Sign Up to Dashboard</h2>
            <DarkModeSwitcher />
          </div>
          <form onSubmit={handleSignUp}>
            <div className="mb-4">
              <label className="block font-medium text-black dark:text-white mb-2">Username</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter your username"
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-50">
                  <FaRegUser />
                </span>
              </div>
            </div>

            <div className="mb-4">
              <label className="block font-medium text-black dark:text-white mb-2">Password</label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-50">
                  <GoShieldLock />
                </span>
              </div>
            </div>

            <div className="mb-4">
              <label className="block font-medium text-black dark:text-white mb-2">Akses sebagai:</label>
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

            <div>
              <input
                type="submit"
                value="Create account"
                className="w-full cursor-pointer rounded-lg bg-primary text-white py-4 font-medium hover:bg-opacity-90"
              />
            </div>

            <div className="mt-6 text-center">
              <p>
                Already have an account?{' '}
                <Link to="/auth/signin" className="text-primary hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </form>

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
      <ToastContainer />
    </div>
  );
};

export default SignUp;
