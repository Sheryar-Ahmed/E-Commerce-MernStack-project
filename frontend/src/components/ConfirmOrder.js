import React from 'react';
import CustromizedStepper from './Stepper';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import HelmetProvider from './SEO/Helmet';


const ConfirmOrder = () => {
    const navigate = useNavigate();
    const { cartItems, shippingInfo } = useSelector(state => state.cart);
    const { user } = useSelector(state => state.user);

    let subTotal = cartItems.reduce((acc, curr) => acc + curr.quantity * curr.price, 0);
    let shippingCharges = subTotal > 1000 ? 0 : 200;
    let gst = 0.18 * subTotal;
    let total = subTotal + shippingCharges + gst;
    const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;


    const PaymentHandler = () => {

        const data = {
            subTotal,
            shippingCharges,
            gst,
            total
        };
        sessionStorage.setItem('orderInfo', JSON.stringify(data));
        navigate('/process/payment')
    }

    return (
        <div className='w-full flex flex-col gap-5 mt-3'>
            <CustromizedStepper activeStep={1} />
            <HelmetProvider
                title='Order Confirmation'
            />
            <div className='w-full flex flex-row flex-wrap justify-center gap-3 border border-[red] py-5 items-center'>
                <div className='w-2/3 flex flex-col gap-5'>
                    <div className='w-full flex flex-col gap-5'>
                        <h1 className='font-bold text-xl text-start'>Shipping Info</h1>
                        <div className='w-full flex flex-col items-end justify-end gap-2'>
                            <div className='w-11/12 flex flex-row gap-4 items-center justify-start'>
                                <span className='text-md font-bold'>Name: </span>
                                <span className='text-sm'>{user && user.name}</span>
                            </div>
                            <div className='w-11/12 flex flex-row gap-4 items-center justify-start'>
                                <span className='text-md font-bold'>Phone: </span>
                                <span className='text-sm'>{shippingInfo.phoneNo}</span>
                            </div>
                            <div className='w-11/12 flex flex-row gap-4 items-center justify-start'>
                                <span className='text-md font-bold'>Address: </span>
                                <span className='text-sm'>{address}</span>
                            </div>
                        </div>
                    </div>
                    <div className='w-full'>
                        <div className='w-full flex flex-col gap-5'>
                            <h1 className='font-bold text-xl text-start'>Your Cart Items</h1>
                            {cartItems && cartItems.map((item) => <div key={item.name} className='w-11/12 flex flex-row justify-between'>
                                <div className='w-[60%] flex flex-row flex-wrap items-center sm:justify-center'>
                                    <div className='w-32 h-32'>
                                        <img src={item.image} alt={item.name} />
                                    </div>
                                    <div className='flex flex-col items-center justify-center gap-4 sm:gap-0 sm:mt-2'>
                                        <NavLink to={`/details/${item.productId}`}>
                                            <span className='sm:text-sm'>{item.name}</span>
                                        </NavLink>
                                    </div>
                                </div>
                                <div className='flex flex-col items-center justify-center gap-4 sm:gap-0 sm:mt-2'>
                                    <span>{`${item.quantity} X Rs ${item.price} = Rs ${item.quantity * item.price}`}</span>
                                </div>
                            </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className='w-[4px] flex flex-col'>
                    <hr className='w-[60%] border border-[red]' />
                </div>
                <div className='min-w-[250px] w-1/4 flex flex-col items-center gap-8'>
                    <h1 className='font-bold text-2xl'>Order Summary</h1>
                    <hr className='w-[60%] border border-[red]' />
                    <div className='w-3/5 flex flex-row gap-4 items-center justify-between'>
                        <span className='text-md font-bold'>SubTotal: </span>
                        <span className='text-sm'>{`Rs ${subTotal}`}</span>
                    </div>
                    <div className='w-3/5 flex flex-row gap-4 items-center justify-between'>
                        <span className='text-md font-bold'>Shipping Charges: </span>
                        <span className='text-sm'>{`Rs ${shippingCharges}`}</span>
                    </div>
                    <div className='w-3/5 flex flex-row gap-4 items-center justify-between'>
                        <span className='text-md font-bold'>GST: </span>
                        <span className='text-sm'>{`${gst}`}</span>
                    </div>
                    <hr className='w-[60%] border border-[red]' />
                    <div className='w-3/5 flex flex-row gap-4 items-center justify-between'>
                        <span className='text-md font-bold'>TOTAL: </span>
                        <span className='text-sm'>{total}</span>
                    </div>
                    <div className='w-3/5 flex flex-row gap-4 items-center justify-between'>
                        <button onClick={PaymentHandler} className="w-full bg-red-500 hover:bg-red text-white font-bold py-2 px-4 rounded">
                            Process To Payment
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ConfirmOrder;
