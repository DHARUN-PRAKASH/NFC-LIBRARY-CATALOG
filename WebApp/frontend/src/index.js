import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './SignIn';
import AttendanceDisplay from './components/AttendanceDisplay';
import Home from './pages/Home';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  (sessionStorage.getItem('logged'))
    ? (
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/attendance" element={<AttendanceDisplay />} />
        {/* <Route path="/borrow-book" element={<BorrowBook />} />
        <Route path="/return-book" element={<ReturnBook />} /> */}
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