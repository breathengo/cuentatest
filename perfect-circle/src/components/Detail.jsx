import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//import PaymentLink from "./PaymentLink";
import Button from 'react-bootstrap/Button';
import {Verification } from "./Verification";

export const Detail = () => {
 
const handleDirecToDetails = () => {
    window.location.href = "/"  

};
    return (
        <div>
             <h1> CONTINUE WITH PAYMENT </h1>
              <Verification />
              <React.Fragment>
                <div> 
                  
                
                <Button variant="primary" type="submit" onClick={handleDirecToDetails}> BACK TO HOME</Button>
        
              
                </div>
                </React.Fragment>
             </div>

       
    )
};