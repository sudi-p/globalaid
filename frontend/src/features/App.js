
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

const theme = createTheme({
  palette: {
    primary: {
      main: "#41b3A3",
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
        <NavBar />
        <Routes>
          <Route path='/' element={<DashboardContainer />} />
          <Route path='/login' element={<LoginContainer />} />
          <Route path='/signup' element={<RegisterContainer />} />
          <Route path='/jobs/job/:id' element={<Job />} />
          <Route path='/jobs' element={<Jobs />} />
          <Route path='/rentals' element={<Rentals />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
