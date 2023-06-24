import { lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './App.css';
import NavbarLayout from './layout/navBarLayout/NavbarLayout';
import AuthLayout from './layout/authLayout/AuthLayout';

const Jobs = lazy(() => import('./pages/jobs/Jobs'));
const Job = lazy(() => import('./pages/jobs/job/Job'));
const LoginContainer = lazy(() => import('./pages/login/LoginContainer'));
const RegisterContainer = lazy(() => import('./pages/register/Register'));
const Rentals = lazy(() => import('./pages/rentals/RentalsContainer'));
const CompleteAd = lazy(() => import('./pages/myAds/createAd/CreateAd'));
const Chat = lazy(() => import('./pages/chat/Chat'));
const MyAd = lazy(() => import("./pages/myAds/myAd/MyAd"));
const PageNotFound = lazy(() => import('./pages/pagenotfound/PageNotFound'));
const DashboardContainer = lazy(() => import('./pages/dashboard/DashboardContainer'));
// const MyAds = lazy(() => import("./pages/myAds/MyAdsContainer"))
const MyAds = lazy(() =>
  import("./pages/myAds/MyAdsContainer").then(module => {
    return { default: module.MyAdsContainer }
  }));

const theme = createTheme({
  palette: {
    primary: {
      main: "#41b3A3",
      contrastText: "#fff"
    },
    secondary: {
      main: '#41b3A3',
      contrastText: "#fff"
    },
    text: {
      primary: '#173A5E',
      secondary: '#46505A',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<NavbarLayout />}>
            <Route index element={<DashboardContainer />} />
            <Route path='/jobs/job/:id' element={<Job />} />
            <Route path='/jobs/'>
              <Route index element={<Jobs />} />
            </Route>
            <Route path='/rentals/'>
              <Route index element={<Rentals />} />
            </Route>
            <Route path='/myads/'>
              <Route index element={<MyAds />} />
              <Route path='/myads/:id' element={<MyAd />} />
              <Route path='/myads/create-ad/:adId' element={<CompleteAd />} />
            </Route>
            <Route path='/chat' element={<Chat />} />
          </Route>
          <Route path='/' element={<AuthLayout />}>
            <Route path='/login' element={<LoginContainer />} />
            <Route path='/signup' element={<RegisterContainer />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
