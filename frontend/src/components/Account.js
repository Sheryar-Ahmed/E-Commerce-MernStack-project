import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './Loader';
import { NavLink } from 'react-router-dom';
import ModalChangePass from './Modal';
import { logoutUser, updatedPassword } from '../actions/userAction';
const Account = () => {

    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const [oldPassword, setOldPassword] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');

    const updatePassData = {
        oldPassword,
        newPassword,
        confirmPassword
    };
    const handleOpen = () => setOpen(true);
    const updatedPasswordFunc = (e) => {
        e.preventDefault();
        dispatch(updatedPassword(updatePassData));
    };
    const LogoutUser = () => {
        dispatch(logoutUser());
        window.location.reload(false);
    }
    const { loading, error, user } = useSelector(state => state.user);
    const { loadingPass, errorPass, userPass } = useSelector(state => state.updatePass);
    return <React.Fragment>
        <div className='w-full mt-5 flex flex-col gap-4'>
            <span className='ml-5 w-full text-3xl text-start'>My Profile</span>
            <button onClick={() => LogoutUser()} className='w-72 border border-emerald-400 text-white bg-gray py-1'>Logout</button>
        </div>
        <div className='w-full flex flex-row flex-wrap items-center justify-center gap-20 sm:gap-8 relative'>
            {loading && <div className='w-full h-screen relative'><Loader /></div>}
            <div className='flex flex-col items-center justify-center gap-5'>
                <img
                    className='w-72 h-92 rounded-[50%]'
                    src={`data:image/jpeg;base64,${user.avatar.url}`}
                    alt='check'
                />
                <button className='w-72 border border-emerald-400 text-white bg-gray py-1'>Edit Profile</button>

            </div>
            <div className='flex flex-col gap-9'>
                <div className='w-full flex flex-col items-start justify-start'>
                    <span>Full Name</span>
                    <span className='text-sm text-gray'>{user.name}</span>
                </div>
                <div className='w-full flex flex-col items-start justify-start'>
                    <span>Email</span>
                    <span className='text-sm text-gray'>{user.email}</span>
                </div>
                <div className='w-full flex flex-col items-start justify-start'>
                    <span>Joined On</span>
                    <span className='text-sm text-gray'>{user.createdAt.slice(0, 10)}</span>
                </div>
                <NavLink to='/myorders'>
                    <button className='w-72 border border-emerald-400 text-white bg-gray py-1'>My orders</button>
                </NavLink>
                <button
                    onClick={handleOpen}
                    className='w-72 border border-emerald-400 text-white bg-gray py-1'
                >
                    Change Password
                </button>
                {<ModalChangePass open={open} setOpen={setOpen}>
                    <form
                        onSubmit={updatedPasswordFunc}
                        className='w-full flex flex-col gap-2 relative'>
                        {loadingPass && <Loader />}
                        {errorPass && <span className='w-full text-center text-[red]'>{errorPass}</span>}
                        {userPass && <span className='w-full text-center text-emerald-400'>Password Updated Successfully</span>}
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray dark:text-white">Old Password</label>
                            <input value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} type="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="********" required />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray dark:text-white">New Password</label>
                            <input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} type="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="********" required />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray dark:text-white">Confirm Password</label>
                            <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="********" required />
                        </div>
                        <button type="submit" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Submit</button>

                    </form>
                </ModalChangePass>}
            </div>
        </div>
    </React.Fragment>
};

export default Account;