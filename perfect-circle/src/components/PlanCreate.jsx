
import React from "react";
import { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as Action from "../redux/actions.js";
import InputGroup from 'react-bootstrap/InputGroup';


const PlanCreate = () => {
     const  email = "sara@gmail.com";
    const productId = "prod_MIHaM4f4ODQQMO"
    const dispatch = useDispatch
    const initialState = {amount:"", currency: "", interval: ""}
    const [input, setInput] = useState(initialState)
    const plans = useSelector(state => state.plans)
    const getUser = useSelector(state => state.getUser)
    const allProducts = useSelector(state => state.allProducts)
    const loading = useSelector(state => state.loading);

    useEffect(() => {
        if (email) {
            dispatch(Action.getAllProducts(email))
        }
        if (email) {
            dispatch(Action.planCreate(input,email,productId))
        }
      
    }, [loading, getUser.emailDb])
    
  return (
      <div>  
          <label htmlFor="cars">Choose a Plan</label>
          <select name="plan" id="plans">
              <option value="volvo">Volvo</option>
          </select>
      </div>
  )
}

export default PlanCreate