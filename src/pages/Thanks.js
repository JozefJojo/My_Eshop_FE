
import React, {useContext, useEffect, useState } from 'react';
import ProductService from '../services/ProductService';
import { ShopContext } from '../context/shop-context';
import {CartItem}  from './cart/cart-item';
import "./cart/cart.css";
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { OrderItem } from './cart/order-item'; 

const Thanks = () =>{

    const [products, setProducts] = useState([])
    const {cartItems, getTotalCartPrice, getTotalCartAmount} = useContext(ShopContext);
    const totalPrice = getTotalCartPrice();
    const totalAmount = getTotalCartAmount();
    const navigate = useNavigate();

    useEffect (() => {
        const getProductsAsync = async () => {
            const response = await ProductService.getProducts()
            setProducts (response.data)
        }
        getProductsAsync()
    },[])
   
    return (
        <div className='cart'>
            <div>
                <h1>Your Cart Items</h1>
            </div>
            <div className='cartOrder'>
                <div className='orderLineContainer'>
                        <h2 className="user-form-label">{<span>{totalAmount} </span> }above items will be sent to:</h2>

                        <div className='orderList'>
                            {products.map((product) => cartItems[product.id] ? <OrderItem key={product.id} data={product} /> : null)}
                        </div>
                        <div className='totalPrice'>{totalPrice} -,E </div>  
                </div>

                <Button variant="success" className="continue-button" onClick={() => navigate(`/`)}>Continue</Button>

            </div>
       </div>
        )
}

export default Thanks

