import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import LogoDark from '../../images/logo/logo-telkom.png';
import Logo from '../../images/logo/logo-reverse-telkom.png';
import { FaRegUser } from 'react-icons/fa';
import { GoShieldLock } from "react-icons/go";
import DarkModeSwitcher from '../../components/Header/DarkModeSwitcher';

const SignIn: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/login', { username, password });

      if (response.data.success) {
        const { role } = response.data.user;
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/');
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen dark:bg-boxdark">
      <div className="md:w-1/2 flex flex-col justify-center items-center bg-white dark:bg-boxdark">
        <div className="text-center p-8 mb-8">
          <img className="hidden dark:block w-3/5 mx-auto" src={Logo} alt="Logo" />
          <img className="dark:hidden w-3/5 mx-auto" src={LogoDark} alt="Logo" />
          <p className="mt-4 text-lg">Website Dashboard Witel Suramadu.</p>
        </div>
      </div>

      <div className="md:w-1/2 flex flex-col justify-center items-center bg-white border-t border-stroke dark:bg-boxdark dark:border-strokedark md:border-l">
        <div className="w-full p-6 sm:p-10 lg:p-15">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-black dark:text-white">Sign In to Dashboard</h2>
            <DarkModeSwitcher />
          </div>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block font-medium text-black dark:text-white mb-2">Username</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-50">
                  <FaRegUser />
                </span>
              </div>
            </div>

            <div className="mb-6">
              <label className="block font-medium text-black dark:text-white mb-2">Password</label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-50">
                  <GoShieldLock />
                </span>
              </div>
            </div>

            {error && (
              <div className="mb-4 text-red-600">{error}</div>
            )}

            <div>
              <button
                type="submit"
                className="w-full bg-primary text-white py-4 rounded-lg font-medium hover:bg-primary-dark"
              >
                Sign In
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p>
              Don't have an account?{' '}
              <Link to="/auth/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
