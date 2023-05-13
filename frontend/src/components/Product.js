import React from 'react';
import ReactStars from 'react-stars'
import galaxy from '../assets/products/galaxy.png';
const Product = () => {
  return (
    <div className='p-4 rounded-xl shadow-sm hover:shadow-lg'>
      <div className='w-64'>
        <div className='bg-blue-100 rounded-xl p-5'>
          <img src={galaxy} alt={`galaxy`} />
        </div>
        <div className='mt-2'>
          <h3 className='font-bold text-lg truncate'>Galaxy S1</h3>
        </div>
        <p className='text-justify text-sm mt-2 line-clamp-4'>Samsung Galaxy mobile devices use One UI, a user interface based on Google's Android operating system (OS). The latest Samsung Galaxy S22 Ultra smartphone offers a 108-megapixel camera and can shoot video in 8K ultra-high-definition resolution. The Samsung Galaxy S10+ offers users 1 terabyte of internal storage.
        </p>
        <div className='flex flex-row justify-between items-center '>
          <span className='font-bold text-3xl'>43,500 Rs</span>
          <button className="bg-emerald-500 text-white py-1 px-3 rounded-lg">
            +
          </button>
        </div>
        <ReactStars
          count={5}
          // onChange={ratingChanged}
          size={24}
          color2={'#ffd700'}
          half={true}
        />
      </div>
    </div>
  )
}

export default Product;