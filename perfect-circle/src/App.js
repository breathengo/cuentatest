import './App.css';
import Home from './components/Home';
//import ProductForm from './components/ProductForm'
//import PaymentLink from "./components/paymentLink"
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import {Detail }from './components/Detail';
//import  ProductForm  from './components/ProductForm';
import Verification from './components/Verification';
import PlanCreate from './components/PlanCreate';

function App() {
  return (
    <div className="App">
      <BrowserRouter >
      <Routes>
      <Route path="/" element={<Home />} /> 
      <Route exact path="/detail" element={<Verification />} />
     <Route path="/planCreate" element={<PlanCreate />} />

      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
