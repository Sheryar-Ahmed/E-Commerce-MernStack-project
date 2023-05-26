import * as React from 'react';
import { getAllProducts } from '../actions/productAction';
import Product from './Product';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './Loader';
import { useSearchParams } from 'react-router-dom';
import Pagination from "./Pagination";
import Slider from '@mui/material/Slider';
import Tooltip from '@mui/material/Tooltip';
import { useDebounce } from 'use-debounce';
import ReactStars from 'react-stars';

const Products = () => {

  const dispatch = useDispatch();
  //search
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = React.useState("");
  const [currentPage, setcurrentPage] = React.useState(1);
  const [price, setPrice] = React.useState([0, 500000]);
  const [category, setCategory] = React.useState("");
  const [ratings, setRatings] = React.useState(0);
  const [ratingsdeb] = useDebounce(ratings, 1000);
  const [pricedb] = useDebounce(price, 1000);



  const options = {
    edit: true,
    color: "rgba(20,20,20,0.1)",
    count: 5,
    value: ratings,
    size: 24,
    color2: '#ffd700',
    half: true,
  };
  const ratingChanged = (newRating) => {
    setRatings(newRating);
  }
  //categories
  let categoryList = [
    "Laptop",
    "PC",
    "Mobile Phone",
    "AirPods",
    "HeadPhones",
    "Tops",
    "LCD",
    "Movies",
  ]
  const handleChange = (event, newValue) => {
    setPrice(newValue);
  };

  const searchHandler = (e) => {
    e.preventDefault();
    setKeyword(searchParams.get('keyword'));
  }
  React.useEffect(() => {

    dispatch(getAllProducts(keyword, currentPage, price, category, ratings));

  }, [dispatch, keyword, currentPage, pricedb, category, ratingsdeb]);
  const { loading, error, product, resultPerPage, productsCount } = useSelector(state => state.products);
  return (loading
    ? <Loader />
    :
    <div className='w-full flex flex-col items-center justify-center mt-3'>
      <h1 className='text-3xl text-center'>Products</h1>
      <hr className='text-emerald-400 w-[120px] border-2' />
      {/* //search */}
      <form className='w-1/2 md:w-11/12 sm:w-11/12 mt-4' onSubmit={searchHandler}>
        <label className="mb-2 text-sm font-medium text-emerald-400 sr-only dark:text-blue-100">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" className="w-5 h-5 text-emerald-400 dark:text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 pl-10 text-sm text-emerald-500 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-blue-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search..."
            required
            onChange={(e) => setSearchParams({ 'keyword': e.target.value })}
          />
          <button
            type="submit"
            className="text-blue-100 absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Search
          </button>
        </div>
      </form>
      <div className='w-full flex flex-row items-start justify-center flex-wrap'>
        <div className='w-[200px] mt-10 flex flex-col items-center justify-start'>
          <div className='w-full flex flex-row gap-2 items-center justify-start'>
            <span className='text-start'>Price</span>
            <Tooltip title="Clear Filter" placement="bottom">
              <svg
                onClick={() => { setCategory(""); setRatings(0);}}
                width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="48" height="48" fill="white" fillOpacity="0.01" /><path d="M14 14L34 34" stroke="#333" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" /><path d="M14 34L34 14" stroke="#333" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Tooltip>
          </div>
          <Slider
            size="small"
            sx={{ width: '80%' }}
            value={price}
            onChange={handleChange}
            valueLabelDisplay="auto"
            min={0}
            max={500000}
          />
          <span className='w-full text-start'>Ratings</span>
          <ReactStars
            {...options}
            onChange={ratingChanged}
          />
          <span className='w-full text-start'>
            Category
          </span>

          <ul className='w-2/3 list-disc'>
            {categoryList.map(
              (item) =>
                <li
                  className='w-full hover:text-emerald-400 cursor-pointer'
                  key={item}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </li>)}
          </ul>
        </div>
        <div className='w-2/3 flex flex-row items-center justify-start flex-wrap'>
          {product && product.length > 0
            ? product.map((product) => <Product key={product._id} product={product} />)
            :
            <h1 className='w-3/4 mt-20 text-center text-3xl'>No Results Found</h1>
          }
        </div>
      </div>
      {product && product.length > 3 &&
        <div className="paginationBox">
          <Pagination
            productsCount={category ? product && product.length : productsCount}
            resultPerPage={resultPerPage}
            setcurrentPage={setcurrentPage}
            currentPage={currentPage}
          />
        </div>
      }
    </div>
  )
}

export default Products;