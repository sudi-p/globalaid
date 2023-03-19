
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

import DashboardContainer from  './dashboard/DashboardContainer';
import Jobs from './jobs/Jobs';
import Job from './jobs/job/Job';
import NavBar from './navBar/NavBar';
import LoginContainer from './login/LoginContainer';
import RegisterContainer from './register/Register';
import Rentals from './rentals/RentalsContainer';

import './App.css';
import NavbarLayout from './layout/NavbarLayout';
import AuthLayout from './layout/AuthLayout';

const theme = createTheme({
  palette: {
    primary: {
      main: "#84A0C5",
      contrastText: "#fff"
    },
    secondary: {
      main: '#11cb5f',
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
