import './App.css';
import UserForm from './components/userForm';
//import ProductForm from './components/productForm'
//import PaymentLink from "./components/paymentLink"
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Detail }from './components/Detail';

function App() {
  return (
    <div className="App">
      <BrowserRouter >
      <Routes>
      <Route path="/" element={<UserForm />} /> 
      <Route exact path="/detail" element={<Detail />} />

      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
