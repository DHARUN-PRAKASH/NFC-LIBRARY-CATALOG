import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './SignIn';
import AttendanceDisplay from './components/AttendanceDisplay';
import Home from './pages/Home';
import BorrowReturnDisplay from './components/BorrowReturnDisplay';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  (sessionStorage.getItem('logged'))
    ? (
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/attendance" element={<AttendanceDisplay />} />
        <Route path="/borrow-book" element={<BorrowReturnDisplay />} />
        <Route path="/return-book" element={<BorrowReturnDisplay />} />
        </Routes>
      </BrowserRouter>
    )
    : (
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    )
);