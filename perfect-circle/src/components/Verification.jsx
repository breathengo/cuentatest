import React from "react";
import { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
//import PaymentLink from "./PaymentLink";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as Action from "../redux/actions.js";
import ProductForm from "./ProductForm";
import { Error } from "./Error";
import { PriceCreate } from "./PriceCreate";
import InputGroup from 'react-bootstrap/InputGroup';
import PaymentLink from ".//PaymentLink";
import PlanCreate from './PlanCreate';


export const Verification = () => {
    const initialState = { name: "", }
    const [input, setInput] = useState(initialState);
    //console.log(input, "HOLA SOY EL PRODUCTO NAME")
    const productos = useSelector(state => state.products);
    //console.log(productos.dbProductId, "HOLA SOY EL PRODUCTO RECIEN AGREGADO DE REDUX")
    const getUser = useSelector(state => state.getUser);
    //console.log(getUser.emailDb, "HOLA SOY EL ESTADO DE REDUX del user.email")
    const [user, setUser] = useState({ email: "" });
    const loading = useSelector(state => state.loading);
    const dispatch = useDispatch();
    const allProducts = useSelector(state => state.allProducts);
    //console.log(allProducts, "TODOS LOS PrODUCTOS")
    const initialState2 = { amount: "", currency: "", interval: "" }
    const [planInput, setPlanInput] = useState(initialState2);
    const allPlans = useSelector(state => state.allPlans);
   
    const plans = useSelector(state => state.plans)
    console.log(plans, "hola soy plans")
    const [productSelect, setProductSelect] = useState("");
    console.log(productSelect, "hola soy el productSelect")
    const [planSelect, setPlanSelect] = useState("");

    useEffect(() => {
        if (getUser.emailDb) {
            dispatch(Action.getAllProducts(getUser.emailDb))
        }
        if (getUser.emailDb && plans) {
            dispatch(Action.getAllPlans(getUser.emailDb))
        }
    }, [loading, getUser.emailDb]);

    const handleSubmitDirect = (e) => {
        e.preventDefault();
        dispatch(Action.productCreate(input, getUser.emailDb))
        alert("Product Created")
        // console.log(Action.productCreate(getUser.emailDb, product.name), "HOLA SOY EL ACTION")
    }
    const handleChangeDirect = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(Action.getUser(user.email))
        alert("email sent")
    }
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }
    const handleDirecToDetails = () => {
        window.location.href = "/"
    };
    const handleSubmitPrice = (e) => {
        e.preventDefault();
        // tomar el producto del select y mandarlo  a la action de priceCreate
        if (getUser.emailDb && allProducts.length > 0) {
            dispatch(Action.planCreate(planInput, getUser.emailDb, productSelect) // en productSelect tengo el id del producto 
            )
        }
        alert("price created")
    }
    const handleChangePlan = (e) => {
        setPlanInput({
            ...planInput,
            [e.target.name]: e.target.value,
        })
    }
    const handleProductSelectChange = (e) => {
        //console.log(e.target.value, "hola soy el etarget.value")
        setProductSelect(
            e.target.value // EL ID DEL PRODUCTO SELECCIONADO, el value del <OPTION>
        )
    }
    const handlePlanSelectChange = (e) => {
        console.log(e.target.value, "hola soy el etarget.value")
        setPlanSelect(
            e.target.value // EL ID DEL PRODUCTO SELECCIONADO, el value del <OPTION>
        )
    }

    return (
        <div>
            <h4> verification account </h4>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" size="sm">
                    <Form.Label> Enter your Email</Form.Label>
                    <Form.Control name="email" value={user.email} onChange={handleChange} type="email" placeholder="lalalala@gmail.com" />
                </Form.Group>
                <Button variant="primary" type="submit"> Verification User </Button>
            </Form>
            <h1>---------------------------------------</h1>
            <h4> 📌 {getUser.accountDb}</h4>
            <h4> 📌 {getUser.emailDb}</h4>
            <div>
                {getUser.nameDb &&
                    <Fragment>
                        <h4 >⭐ {getUser.nameDb}</h4>
                        <Form onSubmit={handleSubmitDirect}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Product Name</Form.Label>
                                <Form.Control name="name" value={input.name} onChange={handleChangeDirect} type="name" rows={3} />
                            </Form.Group>
                            <Button variant="primary" type="submit"> Create a Product</Button>
                        </Form>
                        <h1>---------------------------------------</h1>
                        {allProducts.length > 0 &&
                            <Fragment>
                                <Form.Select aria-label="Default select example" onChange={handleProductSelectChange} value={productSelect}>
                                    {
                                        allProducts &&
                                        allProducts.map(e =>
                                            <option value={e.id}>{e.name} </option>
                                        )}
                                </Form.Select>
                                <h1>-------------------------------------------------------------</h1>
                                <InputGroup className="mb-3" type="submit">
                                    <Form.Control name="amount" value={planInput.amount} onChange={handleChangePlan} type="amount" placeholder="plase add price..." />
                                    <Form.Control name="currency" value={planInput.currency} onChange={handleChangePlan} type="currency" placeholder="  plase add currency..." />
                                    <Form.Control name="interval" value={planInput.interval} onChange={handleChangePlan} type="interval" placeholder="  plase add interval..." />

                                    <Button variant="outline-secondary" id="button-addon2" type="submit" onClick={(e) => handleSubmitPrice(e)}>
                                        Add Plan
                                    </Button>
                                </InputGroup>
                                <h4> ⭐ {plans.name} </h4>
                                <h4> ⭐ {plans.plan} </h4>
                                <Form.Select aria-label="Default select example" onChange={handlePlanSelectChange} value={planSelect}>
                                    { allPlans.length > 0 &&
                                        allPlans.map(o =>
                                                <option value={o.id} >{o.amount}</option>
                                        )}
                                </Form.Select>
                                <Form.Select aria-label="Default select example" onChange={handlePlanSelectChange} value={planSelect}>
                                    { allPlans.length > 0 &&
                                        allPlans.map(o =>
                                                <option value={o.id} >{o.interval}</option>
                                        )}
                                </Form.Select>
                                <h1> -----------------------------------</h1>
                                <PaymentLink id={plans.planId} email={getUser.emailDb} />
                            </Fragment>
                        }
                    </Fragment>
                }
            </div>
            <h1>---------------------------------------</h1>
            <Button variant="primary" type="submit" onClick={handleDirecToDetails}> BACK TO HOME</Button>
            <div>
            </div>
        </div>
    )
};
export default Verification;
