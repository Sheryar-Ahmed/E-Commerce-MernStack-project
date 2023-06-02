import React from 'react';
import ReactStars from 'react-stars';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    value: product.ratings,
    count: 5,
    size: 24,
    color2: '#ffd700',
    half: true,
  }

  return (
    <Link to={'/details/'+product._id} >
      <div className='p-4 rounded-xl shadow-sm hover:shadow-lg'>
        <div className='w-64'>
          <div className='bg-blue-100 rounded-xl p-5'>
            <img src={product.images[0].url} alt={product.name} />
          </div>
          <div className='mt-2'>
            <h3 className='font-bold text-lg truncate'>{product.name}</h3>
          </div>
          <p className='text-justify text-sm mt-2 line-clamp-4'>{product.description}</p>
          <div className='flex flex-row justify-between items-center '>
            <span className='font-bold text-3xl'>{product.price} Rs</span>
            <button className="bg-emerald-500 text-white py-1 px-3 rounded-lg">
              +
            </button>
          </div>
          <div className='w-64 flex flex-row items-center gap-2'>
            <ReactStars
              {...options}
            />
            <span>({product.numOfReviews} reviews)</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Product;