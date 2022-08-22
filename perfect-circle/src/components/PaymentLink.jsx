import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import * as Action from "../redux/actions.js";
import {  useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link} from "react-router-dom";


function PaymentLink({id, email }) {
    console.log( id, "hola soy el id de price")
    console.log( email, "hola soy el email de price")
    const initialState = { quantity: "", }
    const [input, setInput] = useState(initialState);
    const dispatch = useDispatch();
    const paymentLinkCreation = useSelector(state => state.paymentLinkCreate);
    const loading = useSelector(state => state.loading);
   console.log(paymentLinkCreation, "HOLA SOY EL PAYMENT LINK DE REDUX")

    // useEffect(() => {
    //   if(email){
    //   dispatch(Action.paymentLinkCreate(input, email, id));
    //   }
    // } , [loading, ]);

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(Action.paymentLinkCreate(input, email, id));
        alert("URL FOR PAYMENT WAS CREATED")
        // setInput({quantity: ""})
    }
  //   const handleDirecToDetails = () => {
  //     window.location.href = {paymentLinkCreation}
  
  // };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Quantity</Form.Label>
        <Form.Control name="quantity" value={input.quantity} onChange={handleChange} type="quantity" placeholder="quantity" />
      </Form.Group>
      <Button variant="primary" type="submit"> CREAR PAYMENT LINK</Button> 
      <h1>-----------------------------------------------</h1>
         <Link to={paymentLinkCreation}>⭐⭐{paymentLinkCreation}⭐⭐</Link>
    </Form>
    
  );
}


export default PaymentLink;