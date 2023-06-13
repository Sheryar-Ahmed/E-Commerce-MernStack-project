import React from 'react';
import { useSelector } from 'react-redux';
import {NavLink} from 'react-router-dom';
import HelmetProvider from './SEO/Helmet';

const EmailSuccess = () => {

  const { forgotPass } = useSelector(state => state.forgotPass)
  return (
    <div className='w-full h-screen flex flex-col items-center justify-center gap-5 bg-gray-100'>
            <HelmetProvider
                title={`Email Sent Successfully`}
            />
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="green" className="w-32 h-32">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span className='w-full text-center text-2xl'>{forgotPass.message}</span>
      <NavLink to='/login'>
        <button className="bg-grey-light hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded inline-flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          <span>Back to Login</span>
        </button>
      </NavLink>
    </div>
  )
}

export default EmailSuccess;
