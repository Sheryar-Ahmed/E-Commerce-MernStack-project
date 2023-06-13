import React, { useEffect } from 'react'
import { getOrderDetails } from '../actions/orderActions';
import { useParams, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './Loader';
import HelmetProvider from './SEO/Helmet';

const OrderDetails = () => {
    const params = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getOrderDetails(params.id));
    }, [dispatch, params.id]);
    const { loading, detailOrder } = useSelector(state => state.detailOrder);
    const { user } = useSelector(state => state.user);
    const address = Object.keys(detailOrder).length !== 0 && `${detailOrder.shippingInfo.address}, ${detailOrder.shippingInfo.city}, ${detailOrder.shippingInfo.state}, ${detailOrder.shippingInfo.pinCode}, ${detailOrder.shippingInfo.country}`;

    return loading
        ? <div className='w-full h-screen relative'>
            <Loader />
        </div>
        : !loading
            && Object.keys(detailOrder).length == 0
            ? <span className='w-full h-screen text-center text-2xl text-red'>'No data yet'</span>
            : (detailOrder &&
                <div className='w-full flex flex-col gap-5 mt-3'>
                    <HelmetProvider
                        title={(detailOrder && detailOrder.name) || ('Chic Choice Maven')}
                        description={address}
                    />
                    <div className='w-full flex flex-row flex-wrap justify-center gap-3 py-5 items-center'>
                        <div className='w-2/3 flex flex-col gap-5'>
                            <div className='w-full flex flex-col gap-5'>
                                <h1 className='w-full sm:text-lg font-bold text-2xl'>{`Order # ${detailOrder._id}`}</h1>
                                <div className='w-11/12 sm:w-full flex flex-row gap-4 items-center justify-start'>
                                    <span className='text-md font-bold'>Order Status: </span>
                                    <span className='font-bold sm:text-sm text-2xl text-yellow'>{detailOrder.orderStatus}</span>
                                </div>
                                <h1 className='font-bold text-xl text-start'>Shipping Info</h1>
                                <div className='w-full flex flex-col items-end justify-end gap-2'>
                                    <div className='w-11/12 flex flex-row gap-4 items-center justify-start'>
                                        <span className='text-md font-bold'>Name: </span>
                                        <span className='text-sm'>{user && user.name}</span>
                                    </div>
                                    <div className='w-11/12 flex flex-row gap-4 items-center justify-start'>
                                        <span className='text-md font-bold'>Phone: </span>
                                        <span className='text-sm'>{detailOrder.shippingInfo.phoneNo}</span>
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
                                    {detailOrder.orderItems && detailOrder.orderItems.map((item) => <div className='w-11/12 flex flex-row justify-between'>
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
                            <div className='flex flex-col gap-8'>
                                <h1 className='font-bold text-2xl'>Order Details</h1>
                                <hr className='border border-[red]' />
                                <div className='w-3/5 flex flex-row gap-4 items-center justify-between'>
                                    <span className='text-md font-bold'>Payment Status: </span>
                                    <span className='text-sm text-green font-bold'>{`${detailOrder.paymentInfo.status}`}</span>
                                </div>
                                <div className='w-3/5 flex flex-row gap-4 items-center justify-between'>
                                    <span className='text-md font-bold'>Shipping Charges: </span>
                                    <span className='text-sm'>{`Rs ${detailOrder.shippingPrice}`}</span>
                                </div>
                                <div className='w-3/5 flex flex-row gap-4 items-center justify-between'>
                                    <span className='text-md font-bold'>GST: </span>
                                    <span className='text-sm'>{`${detailOrder.taxPrice}`}</span>
                                </div>
                                <hr className='border border-[red]' />
                                <div className='w-3/5 flex flex-row gap-4 items-center justify-between'>
                                    <span className='text-md font-bold'>TOTAL: </span>
                                    <span className='text-sm'>{detailOrder.totalPrice}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
}

export default OrderDetails;