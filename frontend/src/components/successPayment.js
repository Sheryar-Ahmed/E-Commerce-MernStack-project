import React from 'react';
import CompleteOrderIcon from '@mui/icons-material/CheckCircleOutlined';
import { NavLink } from 'react-router-dom';
import HelmetProvider from './SEO/Helmet';

const successPayment = () => {
    return (
        <div className='w-full flex flex-col items-center justify-center h-screen'>
                  <HelmetProvider
                title="Payment Successfull"
            />
            <div className='flex flex-col items-center justify-center gap-5'>
                <CompleteOrderIcon sx={{ fontSize: '8rem', color: 'green' }} />
                <span className='text-2xl text-center'>Your Order has been placed Successfully.</span>
                <NavLink to='/order/me'>
                    <button className='bg-red px-3 py-2 text-white rounded-sm'>View Orders</button>
                </NavLink>
            </div>
        </div>
    )
}

export default successPayment;
