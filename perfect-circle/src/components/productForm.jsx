import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import * as Action from "../redux/actions.js";
import {  useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


function ProductForm({name, id}) {
  //console.log(product, "HOLA SOY EL PRODUCTO")
 
    return (
        <div>
       <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>name of the product</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
         add product
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Price</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        create product
      </Button>
    </Form>
        
          </div>
  );
}


export default ProductForm;