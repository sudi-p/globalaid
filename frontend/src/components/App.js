import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import DashboardContainer from  './dashboard/DashboardContainer';
import Jobs from './jobs/Jobs';
import Job from './jobs/job/Job';
import NavBar from './navBar/NavBar';
import LoginContainer from './login/LoginContainer';
import RegisterContainer from './register/Register';
import Rentals from './rentals/RentalsContainer';

import './App.css';

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<DashboardContainer />} />
          <Route path='/login' element={<LoginContainer />} />
          <Route path='/register' element={<RegisterContainer />} />
          <Route path='/jobs/job/:id' element={<Job />} />
          <Route path='/jobs' element={<Jobs />} />
          <Route path='/rentals' element={<Rentals />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
