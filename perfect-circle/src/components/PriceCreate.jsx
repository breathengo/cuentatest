 // componenete para price create 
import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Action from "../redux/actions.js";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


export const PriceCreate = () => {
    const id = "prod_MG1dy3kdh586Vb"
    console.log(id, "HOLA SOY EL ID")
     const initialState = { unit_amount: "", currency: "usd" }
        const [input, setInput] = useState(initialState);
    const dispatch = useDispatch();
    const price = useSelector(state => state.prices);
    console.log(price, "HOLA SOY EL PRECIO DE REDUX")
    
    useEffect(() => {
        dispatch(Action.priceCreate( input.currency,input.unit_amount,id));
    } , [dispatch])

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(Action.priceCreate( input.currency,input.unit_amount,id)); 
        alert("price created")
    }


     
    return (
        <div>
         <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" size="sm">
                    <Form.Label> Enter Currency</Form.Label>
                    <Form.Control name="currency" value={price.currency} onChange={handleChange} type="currency" placeholder=" PUT CURRENCY" />
                    <Form.Label> Enter Unit_amount</Form.Label>
                    <Form.Control name="unit_amount" value={price.unit_amount} onChange={handleChange} type="unit_amount" placeholder="PUT UNIT_AMOUNT" />
                </Form.Group>
                <Button variant="primary" type="submit"> Create Price </Button>
                </Form>
          
        </div>
    )
}