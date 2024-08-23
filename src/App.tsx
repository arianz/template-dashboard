import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import DetailNipnas from './pages/DetailNipnas';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';
import TableDetails from './pages/TableDetails';
import UploadPelanggan from './pages/UploadPelanggan';
import RekapOrder from './pages/Billcomp/RekapOrder';
import InputOrder from './pages/Billcomp/InputOrder';
import DetailOrder from './pages/Billcomp/DetailOrder';
import InputLOP from './components/Forms/InputLOP';
import DetailLOP from './components/Tables/DetailLOP'
import EditLOP from './components/Forms/EditLOP';
import PrivateRoute from './components/PrivateRoute';
import WarningAccess from './components/WarningAccess';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const isAuthRoute = pathname.startsWith('/auth');

  return loading ? (
    <Loader />
  ) : isAuthRoute ? (
    <Routes>
      <Route path="/auth/signin" element={<SignIn />} />
      <Route path="/auth/signup" element={<SignUp />} />
    </Routes>
  ) : (
    <DefaultLayout>
      <Routes>
        <Route path="/warning-access" element={<WarningAccess />} />
        <Route path="/detail-lop" element={<DetailLOP />} />
        <Route path="/input-lop" element={<InputLOP />} />
        <Route path="/edit-lop/:judulProject/:namaProduk" element={<EditLOP />} />
        <Route path="/detail-order" element={<DetailOrder />} />
        <Route path="/input-order" element={<InputOrder />} />
        <Route path="/rekap-order" element={<RekapOrder />} />
        <Route path="/detail-am/:name/:nipnas" element={<DetailNipnas />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/forms/form-elements" element={<FormElements />} />
        <Route path="/forms/form-layout" element={<FormLayout />} />
        <Route index element={
          <PrivateRoute allowedRoles={['Manajemen', 'AM', 'Unit PRQ']}>
            <Tables />
          </PrivateRoute>
        } />
        <Route path="/settings" element={<Settings />} />
        <Route path="/ui/alerts" element={<Alerts />} />
        <Route path="/ui/buttons" element={<Buttons />} />
        <Route path="/detail-am/:name" element={<TableDetails />} />
        <Route path="/upload-pelanggan" element={
          <PrivateRoute allowedRoles={['Unit PRQ']}>
            <UploadPelanggan />
          </PrivateRoute>
        } />
      </Routes>
    </DefaultLayout>
  );
}

export default App;
