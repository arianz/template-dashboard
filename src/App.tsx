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
import DetailLOP from './components/Tables/DetailLOP';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <Routes>
      <Route
          path="/detail-lop"
          element={
            <>
              <PageTitle title="Detail LOP" />
              <DetailLOP />
            </>
          }
        />
        <Route
          path="/input-lop"
          element={
            <>
              <PageTitle title="Input LOP" />
              <InputLOP />
            </>
          }
        />
        <Route
          path="/detail-order"
          element={
            <>
              <PageTitle title="Detail Order" />
              <DetailOrder />
            </>
          }
        />
        <Route
          path="/input-order"
          element={
            <>
              <PageTitle title="Input Order" />
              <InputOrder />
            </>
          }
        />
        <Route
          path="/rekap-order"
          element={
            <>
              <PageTitle title="Rekap Order" />
              <RekapOrder />
            </>
          }
        />
        <Route
          path="/detail-am/:name/:nipnas"
          element={
            <>
              <PageTitle title="Detail NIPNAS" />
              <DetailNipnas />
            </>
          }
        />
        <Route
          path="/calendar"
          element={
            <>
              <PageTitle title="Calendar" />
              <Calendar />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile" />
              <Profile />
            </>
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            <>
              <PageTitle title="Form Elements" />
              <FormElements />
            </>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <>
              <PageTitle title="Form Layout" />
              <FormLayout />
            </>
          }
        />
        <Route
          index
          element={
            <>
              <PageTitle title="Profile Pelanggan" />
              <Tables />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings" />
              <Settings />
            </>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <>
              <PageTitle title="Alerts" />
              <Alerts />
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <PageTitle title="Buttons" />
              <Buttons />
            </>
          }
        />
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup" />
              <SignUp />
            </>
          }
        />
        <Route
          path="/detail-am/:name"
          element={
            <>
              <PageTitle title="Detail AM" />
              <TableDetails />
            </>
          }
        />
        <Route
          path="/upload-pelanggan"
          element={
            <>
              <PageTitle title="Upload Pelanggan" />
              <UploadPelanggan />
            </>
          }
        />
      </Routes>
    </DefaultLayout>
  );
}

export default App;
