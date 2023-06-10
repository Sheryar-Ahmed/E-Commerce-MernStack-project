import React, { useRef } from 'react';
import {
    CardElement,
    useStripe,
    useElements,
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
} from '@stripe/react-stripe-js';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Stepper from './Stepper';
import { createNewOrder } from '../actions/orderActions';

const Payment = () => {
    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
    const { user } = useSelector(state => state.user);
    const { shippingInfo, cartItems } = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const payBtn = useRef(null);
    const stripe = useStripe();
    const elements = useElements();
    const paymentData = {
        amount: Math.round(orderInfo.total * 100),
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        payBtn.current.disabled = true;

        const orderData = {
            shippingInfo: {
                address: shippingInfo.address,
                city: shippingInfo.city,
                state: shippingInfo.state,
                country: shippingInfo.country,
                pinCode: shippingInfo.pinCode,
                phoneNo: shippingInfo.phoneNo,
            },
            orderItems: cartItems,
            itemsPrice: orderInfo.subTotal,
            taxPrice: orderInfo.gst,
            shippingPrice: orderInfo.shippingCharges,
            totalPrice: orderInfo.total
        }

        try {
            const config = {
                Headers: {
                    "Content-Type": "application/json",
                    'Access-Control-Allow-Credentials': true
                },
                withCredentials: true
            };

            const { data } = await axios.post(
                `${process.env.REACT_APP_BASE_URL}/api/v1/process/payment`,
                paymentData,
                config
            );

            const client_secret = data.client_secret;

            if (!stripe || !elements) return;

            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email,
                        address: {
                            line1: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            postal_code: shippingInfo.pinCode,
                            country: shippingInfo.country,
                        },
                    },
                },
            });

            if (result.error) {
                payBtn.current.disabled = false;

                console.log("result error", result.error.message);
            } else {
                if (result.paymentIntent.status === "succeeded") {
                    orderData.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status
                    };
                    dispatch(createNewOrder(orderData));
                    navigate("/success");
                } else {
                    console.log("There's some issue while processing payment ");
                }
            }
        } catch (error) {
            payBtn.current.disabled = false;
            console.log("server error", error.response.data.message);
        }
    };


    return (
        <div className='w-full flex flex-col items-center h-screen pt-5'>
            <Stepper activeStep={2} />
            <div className='w-full flex items-center justify-center flex-col h-[80vh]'>
                <form onSubmit={(e) => submitHandler(e)} className='w-72 flex flex-col items-center justify-center gap-8'>
                    <span className='text-2xl font-bold'>Card Info</span>
                    <div className='w-full flex flex-row items-center justify-center gap-2 border border-red px-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                        </svg>
                        <CardNumberElement className='outline-none w-full p-4' />
                    </div>
                    <div className='w-full flex flex-row items-center justify-center gap-2 border border-red px-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                        </svg>
                        <CardExpiryElement className='outline-none w-full p-4' />
                    </div>
                    <div className='w-full flex flex-row items-center justify-center gap-2 border border-red px-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                        </svg>

                        <CardCvcElement className='outline-none w-full p-4' />
                    </div>
                    <input
                        type='submit'
                        value={`Pay - ${orderInfo && orderInfo.total}`}
                        ref={payBtn}
                        className='w-full border border-red bg-red hover:bg-red-500 px-2 py-3 text-white rounded-md'
                    />
                </form>
            </div>
        </div>
    )
}

export default Payment
