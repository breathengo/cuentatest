import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//import PaymentLink from "./PaymentLink";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as Action from "../redux/actions.js";

export const Verification = () => {
    const dispatch = useDispatch();
    const getUser = useSelector(state => state.getUser);
    const [user, setUser] = useState({ email : "", });
    
    useEffect(() => {
        dispatch(Action.getUser());
    } , [])

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(Action.getUser())
    }
    // const handleChange = (e) => {
    //     setUser({
    //         ...user,
    //         [e.target.name]: e.target.value
    //     })

    // }


    return (
        <div>
            <h4> verification account </h4>
            <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label> Enter your Email</Form.Label>
        <Form.Control type="email" placeholder="lalalala@gmail.com" />
      </Form.Group>
     
     <Button onSubmit={handleSubmit}> Send name and show my Stripe Account </Button>
      
     <h1>---------------------------------------</h1>
    </Form>

        </div>
    )
};
export default Verification;
