import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetPasswordToken } from '../actions/userAction';
import { useParams, NavLink } from 'react-router-dom';
import Loader from './Loader';
import ModalBasic from './Modal';


const ResetPassword = () => {

  const dispatch = useDispatch();
  const params = useParams();
  const [pass, setPass] = React.useState("");
  const [confirmPass, setConfirmPass] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  const data = {
    password: pass,
    confirmPassword: confirmPass,
  };
  const submitResetPassHandler = (e) => {
    e.preventDefault();
    dispatch(resetPasswordToken(params.token, data));
  };
  const { loading, error, resetPass } = useSelector(state => state.resetPass);

  React.useEffect(() => {
    resetPass && resetPass.token && handleOpen();
  }, [resetPass]);

  return (
    <div className='w-full flex bg-gray-100 items-center justify-center h-screen'>
      <form onSubmit={submitResetPassHandler} className='w-96 sm:w-80 flex border border-[#dddddd] flex-col items-center justify-center p-8 shadow-xl rounded-lg gap-8 relative'>
        {loading && <Loader />}
        {error && <span className='w-full text-center text-red'>{error}</span>}
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z" />
            </svg>
          </div>
          <input type="password" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter New Password"
            onChange={(e) => setPass(e.target.value)}
            value={pass}
            required

          />
        </div>
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
            </svg>
          </div>
          <input type="password" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Confirm New Password"
            onChange={(e) => setConfirmPass(e.target.value)}
            value={confirmPass}
            required
          />
        </div>
        <button type='submit' class="bg-green hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded inline-flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
          </svg>
          <span>Submit</span>
        </button>
        {<ModalBasic open={open} setOpen={setOpen}>
          <div className='w-full flex flex-col items-center justify-center gap-5'>
            <h1 className='text-green'>Password Updated Successfully</h1>
            <NavLink to='/profile'>
              <button class="bg-grey-light hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded inline-flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
                <span>Go to Your Account</span>
              </button>
            </NavLink>
          </div>
        </ModalBasic>}
      </form>
    </div>
  )
}

export default ResetPassword;
