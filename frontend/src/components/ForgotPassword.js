import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPasswordAction } from '../actions/userAction';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
import HelmetProvider from './SEO/Helmet';
const ForgotPassword = () => {
    const { loading, error, forgotPass } = useSelector(state => state.forgotPass);

    const [email, setEmail] = React.useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = {
        email: email,
    }
    const sendEmailHandler = (e) => {
        e.preventDefault();
        dispatch(forgotPasswordAction(userData));
    };
    forgotPass && !error && !loading && forgotPass.success === true && navigate('/forgot/password/verification');
    return (
        <div className='w-full h-screen bg-gray-100 flex items-center justify-center relative'>
                  <HelmetProvider
                title='Password Recovery'
            />
            {loading && <Loader />}
            <div className='sm:w-72 w-96 shadow-lg rounded-lg p-12 flex flex-col items-center justiy-center gap-5 bg-white'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="blue" className="w-16 h-16">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                </svg>
                <span className='w-full text-center'>Forgot Password</span>
                <p className='w-full text-center text-sm'>Enter your Email and we'll send you a link to reset your Password</p>
                <form onSubmit={sendEmailHandler} className='w-full flex flex-col gap-5'>
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 3.75H6.912a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859M12 3v8.25m0 0l-3-3m3 3l3-3" />
                            </svg>
                        </div>
                        <input type="email" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required

                        />
                    </div>
                    {error && <span className='w-full text-red text-center'>{error}</span>}
                    <button type='submit' className='w-full bg-green text-white py-1.5 rounded-lg'>submit</button>
                </form>
                <NavLink to='/login'>
                    <button class="bg-grey-light hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded inline-flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                        <span>Back to Login</span>
                    </button>
                </NavLink>
            </div>
        </div>
    )
}

export default ForgotPassword;
