import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App';
import SignUpPage from './Components/SignUpPage/SignUpPage';
import LogInPage from './Components/LogInPage/LogInPage';
import HotelPage from './Components/HotelPage/HotelPage';
import MyAccountPage from './Components/MyAccount/MyAccount';
import MyBookingsPage from './Components/MyBookings/MyBookings';
import PaymentPage from './Components/PaymentPage/Payment';
import EditReservation from './Components/EditReservation/EditReservation';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="login" element={<LogInPage />} />
        <Route path="hotel" element={<HotelPage />} />
        <Route path="myAccount" element={<MyAccountPage />} />
        <Route path="myBookings" element={<MyBookingsPage />} />
        <Route path="payment" element={<PaymentPage />} />
        <Route path="editReservation" element={<EditReservation />} />
      </Routes>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();