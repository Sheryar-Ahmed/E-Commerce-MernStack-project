import React, { useEffect } from 'react';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails } from '../actions/productAction';
import { useParams } from 'react-router-dom';
import Loader from './Loader';
import ReactStars from 'react-stars';

const ProductDetails = () => {
    let [unary, setunary] = React.useState(1);
    const params = useParams();
    const dispatch = useDispatch();
    const { loading, error, productDetails } = useSelector(state => state.productDetails)
    useEffect(() => {
        dispatch(getProductDetails(params.id));
    }, [dispatch, params.id])
    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        value: productDetails && productDetails.ratings,
        count: 5,
        // onChange={ratingChanged}
        size: 24,
        color2: '#ffd700',
        half: true,
    }
    return (
        <div className='w-full py-16 flex flex-row justify-center items-center flex-wrap gap-0 bg-blue-50'>
            <div className='sm:px-2 md:px-2 lg:px-7 border border-blue self-stretch flex flex-col items-center justify-center'>
                <Carousel
                    showThumbs={false}
                    className='w-[400px] sm:w-[300px] sm:py-2 self-stretch'
                >
                    {loading
                        ? <Loader />
                        : productDetails && productDetails.images
                            .map((pic) =>
                                <img
                                    key={pic._id}
                                    src={pic.url}
                                    alt={productDetails.name}
                                />
                            )}
                </Carousel>
            </div>
            {
                productDetails &&
                <div
                    className='w-[400px] sm:w-[319px] md:w-[418px] md:px-2 self-stretch flex flex-col justify-start gap-2 items-start sm:px-2 pl-9 border border-blue py-2'
                >
                    <span>{productDetails.name}</span>
                    <span>{'proudct # ' + productDetails._id}</span>
                    <hr className='bg-blue-400 w-[300px]' />
                    <ReactStars
                        {...options}
                    />
                    <hr className='bg-blue-400 w-[300px]' />
                    <h3 className='text-bold text-2xl'>{productDetails.price} Rs</h3>
                    <div className='w-[300px] flex flex-row items-center gap-2 justify-start'>
                        <div className='flex flex-row gap-0'>
                            <button
                                className='border border-blue-400 w-6 bg-blue-400 text-[#ffffff]'
                                onClick={() => setunary(unary -= 1)}
                            >
                                -
                            </button>
                            <span className='w-14 flex items-center justify-center border border-blue-400'>{unary}</span>
                            <button
                                className='border border-blue-400 w-6 bg-blue-400 text-[#ffffff]'

                                onClick={() => setunary(unary += 1)}
                            >
                                +
                            </button>
                        </div>
                        <button className='rounded-xl w-28 bg-emerald-400 py-1'>Add to Cart</button>
                    </div>
                    <hr className='bg-blue-400 w-[300px]' />
                    <span className='text-xl'>
                        Status: <b className={productDetails.stock > 0 ? 'text-emerald-400' : 'text-[red]'}>
                            {productDetails.stock > 0 ? "InStock" : "OutOfStock"}
                        </b>
                    </span>
                    <hr className='bg-blue-400 w-[300px]' />
                    <h3 className='text-xl'>Description: </h3>
                    <p className='w-[300px] text-justify text-sm'>{productDetails.description}</p>
                    <button className='rounded-xl w-32 bg-emerald-400 p-1'>Submit Review</button>
                </div>
            }
        </div>
    )
}

export default ProductDetails;