import React from 'react';
import bg from '../assets/images/bg-wall.jpg';
import Product from './Product';
const Home = () => {
  return <React.Fragment>
    <div className='w-full h-full'>
      <img src={bg} className='aspect-auto h-full' alt='Background' />
    </div>
    <div className='w-full flex flex-col justify-center align-items-center mt-4'>
      <h1 className='text-2xl w-full text-center'>Featured Products</h1>
      <hr className='w-48 m-auto m-0' />
    </div>
    <div className='w-full flex flex-row justify-center align-items-center flex-wrap gap-4 py-3'>
      <Product />
      <Product />
      <Product />
      <Product />
      <Product />
      <Product />

    </div>
  </React.Fragment>
};

export default Home;