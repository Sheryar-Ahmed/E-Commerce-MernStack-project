import React from 'react';
import bg from '../assets/images/bg-wall.jpg';
import Product from './Product';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../actions/productAction';
import Loader from './Loader';
import HelmetProvider from './SEO/Helmet';

const Home = () => {
  const dispatch = useDispatch();
  const { loading, error, product } = useSelector(state => state.products);
  React.useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch])
  return <React.Fragment>
    <HelmetProvider
      title='Chic Choice Maven'
      description="At Chic Choice Maven, we understand that true beauty lies in self-expression. That's why we have carefully curated a collection of exquisite clothing, accessories, and lifestyle essentials, designed to empower and inspire the modern trendsetter within you. With a keen eye for the latest fashion trends and a commitment to offering exceptional quality, we bring you a selection that is as diverse as it is timeless.
                  Indulge in the art of dressing up with our meticulously crafted ensembles, meticulously handpicked to cater to your unique taste. From effortlessly chic dresses that effortlessly transition from day to night, to stylish tops and bottoms that effortlessly elevate your everyday look, we offer an array of choices that speak to your individuality.
                  Complement your outfits with our carefully curated accessories collection. Discover exquisite handbags that exude luxury, delicate jewelry that adds a touch of elegance, and statement pieces that command attention. Our accessories are thoughtfully chosen to enhance your personal style and add that perfect finishing touch to any ensemble.
                  At Chic Choice Maven, we believe that fashion should be accessible to all. That's why we offer a seamless online shopping experience, where you can effortlessly browse and explore our carefully categorized collections. Our user-friendly interface ensures that you can find exactly what you're looking for, whether it's a show-stopping gown for a special occasion or a versatile wardrobe staple for everyday wear.
                  We pride ourselves on delivering exceptional customer service and a personalized shopping experience. Our dedicated team is always ready to assist you with any inquiries, ensuring that your journey with us is nothing short of exceptional. From style advice to sizing assistance, we are here to make your shopping experience as enjoyable and convenient as possible.
                  Step into the world of Chic Choice Maven, where fashion is not just about what you wear but also about how it makes you feel. Unleash your inner maven, embrace your unique style, and let us be your trusted companion in your sartorial endeavors. Discover the joy of effortless elegance and make Chic Choice Maven your go-to destination for all things fashion."
    />
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
        <div className='w-full h-screen relative'><Loader /></div>
        :
        product && product.length > 0 ? product.map(
          (product) => <Product
            key={product._id}
            product={product}
          />
        ) : <div>There is no Featured Product Yet</div>}
      {error && <div>error</div>}
    </div>
  </React.Fragment>
};

export default Home;