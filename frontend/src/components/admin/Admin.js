import * as React from 'react';
import 'chart.js/auto';
import { Pie } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsListAdmin } from '../../actions/productAction';
import { getOrdersListAdmin } from '../../actions/orderActions';
import { getUsersListAdmin } from '../../actions/userAction';

const Admin = () => {


    const dispatch = useDispatch();


    React.useEffect(() => {

        dispatch(getProductsListAdmin());
        dispatch(getOrdersListAdmin());
        dispatch(getUsersListAdmin());

    }, [dispatch])



    //getting orders/users/products from the state
    const { productsList, stock, outStock, productsListLoading, productsListError } = useSelector(state => state.productsList)
    const { ordersList, totalAmount, ordersListLoading, ordersListError } = useSelector(state => state.ordersList)
    const { usersList, usersListLoading, usersListError } = useSelector(state => state.usersList)


    //chart data for products
    const chartData = {
        labels: ['In Stock', 'Out Stock'],
        // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
        datasets: [
            {
                label: 'Product',
                data: [stock ? stock : 'loading...', outStock ? outStock : 'loading...'],
                // you can set indiviual colors for each bar
                backgroundColor: [
                    '#9c27b0',
                    '#3f51b5',
                ],
                borderWidth: 1,
            }
        ]
    }

    const data = {
        labels: ['Intial Amount', 'Amount Earned'],
        // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
        datasets: [
            {
                label: `Earning(${ordersListLoading ? " loading... " : totalAmount})`,
                data: [0, totalAmount],
                // you can set indiviual colors for each bar
                backgroundColor: [
                    '#9c27b0',
                    '#3f51b5',
                ],
                borderWidth: 1,
            }
        ]
    }
    const { pathname, hash } = window.location;

    return (pathname === '/admin/dashboard' && !hash) && <React.Fragment>
        <div className='bg-[white] w-full flex flex-row gap-2 items-center justify-center shadow-[box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px ] py-2 flex-wrap'>
            <NavLink to='/admin/dashboard#allProducts'>
                <button
                    class="sm:w-[240px] sm:h-[240px] w-72 h-72 rounded-full bg-[#3f51b5] hover:bg-[#9c27b0] text-white">
                    Product <br />
                    <span className='text-lg'>{productsListLoading ? 'Loading...' : productsList && productsList.length}</span>
                </button>
            </NavLink>
            <NavLink to='/admin/dashboard#allOrders'>
                <button
                    class="sm:w-[240px] sm:h-[240px] w-72 h-72 rounded-full bg-gray hover:bg-[lightgreen] text-white">
                    Orders <br />
                    <span className='text-lg'>{ordersListLoading ? 'Loading...' : ordersList && ordersList.length}</span>
                </button>
            </NavLink>

            <NavLink to='/admin/dashboard#allUsers'>
                <button
                    class="sm:w-[240px] sm:h-[240px] w-72 h-72 rounded-full bg-[#9c27b0] hover:bg-[#3f51b5] text-white">
                    Users <br />
                    <span className='text-lg'>{usersListLoading ? 'Loading...' : usersList && usersList.length}</span>
                </button>
            </NavLink>
        </div>

        <div className='w-full bg-[white] my-2 flex flex-row gap-2 items-center justify-center shadow-[box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px ] py-2 flex-wrap'>
            <div class="sm:w-[280px] sm:h-[280px] w-full h-[400px] flex items-center justify-center bg-[white] text-white">
                <Line
                    data={data}
                    options={{
                        plugins: {
                            title: {
                                display: true,
                                text: "Total Amount"
                            },
                            legend: {
                                display: true
                            }
                        }
                    }}
                />
            </div>
        </div>
        <div className='w-full bg-[white] flex flex-row gap-2 items-center justify-center shadow-[box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px ] py-2 flex-wrap'>
            <div class="sm:w-[280px] sm:h-[280px] w-[400px]  h-[400px] flex items-center justify-center bg-[white] text-white">
                <Pie
                    data={chartData}
                    options={{
                        plugins: {
                            title: {
                                display: true,
                                text: "Availability of Products"
                            }
                        }
                    }}
                />
            </div>
        </div>
        <paper>
            <div className='sm:text-sm sm:py-3 text-center p-3 mt-2' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                &copy; {new Date().getFullYear()} Copyright:{' '}
                <NavLink className='text-dark' to='/'>
                    Ecommerece
                </NavLink>
            </div>
        </paper>
    </React.Fragment>
};
export default Admin;