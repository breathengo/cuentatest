import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import * as Action from "../redux/actions.js";
import {  useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


function ProductForm() {
    const initialState = { name : "",  }
    const [product, setProduct] = useState(initialState);
    const dispatch = useDispatch();
    //const userCreate = useSelector(state => state.userCreate);
   
    // useEffect(() => {
    //   dispatch(Action.userCreate());
    // } , [])

    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(Action.productCreate(product))
        alert("Product Created")
        setProduct({name :""})
    }
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Product Name</Form.Label>
        <Form.Control name="name" value={product.name} onChange={handleChange}type="text" rows={3} />
      </Form.Group>
      <Button variant="primary" type="submit"> Submit </Button> 
    </Form>
  );
}


export default ProductForm;