import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import * as Action from "../redux/actions.js";
import {  useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


function  Home() {
    const initialState = { name : "", email : "", }
    const [user, setUser] = useState(initialState);
    const dispatch = useDispatch();
    const userCreate = useSelector(state => state.user);
    console.log(userCreate, "HOLA SOY EL USER")
    console.log(userCreate.account, "HOLA SOY EL USER CREATE")
   

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(Action.userCreate(user))
        alert("User Created")
        setUser({name :"", email: ""})
    }
  return (
    <div> 
      <h2> WELCOME</h2>
      <h4> Please Register </h4>
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Name</Form.Label>
        <Form.Control name="name" value={user.name} onChange={handleChange}type="text" rows={3} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Email address</Form.Label>
        <Form.Control name="email" value={user.email} onChange={handleChange} type="email" placeholder="name@example.com" />
      </Form.Group>
      <Button variant="primary" type="submit"> Submit </Button> 
       <h1>-----------------------------------------------</h1>
       { userCreate.account && 
      <Button variant="primary" type="submit" href="/detail"  > Continue with payment </Button>
       }
    </Form>
    </div>
  );
}


export default Home;