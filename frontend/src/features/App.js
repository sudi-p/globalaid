
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import DashboardContainer from  './dashboard/DashboardContainer';
import Jobs from './jobs/Jobs';
import Job from './jobs/job/Job';
import LoginContainer from './login/LoginContainer';
import RegisterContainer from './register/Register';
import Rentals from './rentals/RentalsContainer';
import CompleteAd from './myAds/createAd/CreateAd';
import MyAds from "./myAds/MyAds";
import MyAd from "./myAds/myAd/MyAd";
import './App.css';
import NavbarLayout from './layout/navBarLayout/NavbarLayout';
import AuthLayout from './layout/authLayout/AuthLayout';
import Chat from './chat/Chat';
import PageNotFound from './pagenotfound/PageNotFound';

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
          <Route path="*" element={<PageNotFound/>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
