import React from 'react';
import bg from '../assets/images/bg-wall.jpg';
import Product from './Product';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../actions/productAction';
import Loader from './Loader';

const Home = () => {
  const dispatch = useDispatch();
  const { loading, error, product } = useSelector(state => state.products);
  React.useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch])
  return <React.Fragment>
    <div className='w-full h-full'>
      <img src={bg} className='aspect-auto h-full' alt='Background' />
    </div>
    <div className='w-full flex flex-col justify-center align-items-center mt-4'>
      <h1 className='text-2xl w-full text-center'>Featured Products</h1>
      <hr className='w-48 m-auto m-0' />
    </div>
    <div className='w-full flex flex-row justify-center align-items-center flex-wrap gap-4 py-3'>
      {loading
        ?
        <Loader />
        :
        product && product.map(
          (product) => <Product
            key={product._id}
            product={product}
          />
        )}
    </div>
  </React.Fragment>
};

export default Home;