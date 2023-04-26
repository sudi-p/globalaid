
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

import DashboardContainer from  './dashboard/DashboardContainer';
import Jobs from './jobs/Jobs';
import Job from './jobs/job/Job';
import LoginContainer from './login/LoginContainer';
import RegisterContainer from './register/Register';
import Rentals from './rentals/RentalsContainer';
import PostAd from './postAd/PostAd';

import './App.css';
import NavbarLayout from './layout/navBarLayout/NavbarLayout';
import AuthLayout from './layout/authLayout/AuthLayout';
import Chat from './chat/Chat';

const theme = createTheme({
  palette: {
    primary: {
      main: "#84A0C5",
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
            <Route path='/jobs' element={<Jobs />} />
            <Route path='/rentals' element={<Rentals />} />
            <Route path='/postad' element={<PostAd />} />
            <Route path='/chat' element={<Chat />} />
          </Route>
          <Route path='/' element={<AuthLayout />}>
            <Route path='/login' element={<LoginContainer />} />
            <Route path='/signup' element={<RegisterContainer />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
