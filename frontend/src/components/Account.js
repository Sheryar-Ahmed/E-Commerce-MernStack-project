import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './Loader';
import { NavLink } from 'react-router-dom';
import Modal from './Modal';
import { updatedPassword, updatedProfile, userDetails } from '../actions/userAction';
import HelmetProvider from './SEO/Helmet';



const Account = () => {

    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const [openProf, setOpenProf] = React.useState(false);
    const [oldPassword, setOldPassword] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [name, setFullName] = React.useState('');
    const [email, setEmail] = React.useState('');

    const updatePassData = {
        oldPassword,
        newPassword,
        confirmPassword
    };

    const updatedProfileData = {
        name,
        email,
    };
    const handleOpen = () => setOpen(true);
    const handleOpenProf = () => setOpenProf(true);
    const updatedPasswordFunc = (e) => {
        e.preventDefault();
        dispatch(updatedPassword(updatePassData));
    };
    const updateProfile = (e) => {
        e.preventDefault();
        dispatch(updatedProfile(updatedProfileData));
        const timer = setTimeout(() => {
            dispatch(userDetails());
        }, 3000);
        return () => clearTimeout(timer);
    };

    const { loading, error, user } = useSelector(state => state.user);
    const { loadingPass, errorPass, userPass } = useSelector(state => state.updatePass);
    const { updatedUserloading, updatedUserError, updatedUser } = useSelector(state => state.updatedUser);
    return <React.Fragment>
        <div className='w-full mt-5'>
            <span className='ml-5 w-full text-3xl text-start'>My Profile</span>
        </div>
        <HelmetProvider
            title={user ? `Profile ${user.name}` : 'Profile Page'}
            description={user && user.name + user.email}
        />
        <div className='w-full flex flex-row flex-wrap items-center justify-center gap-20 sm:gap-8 relative'>
            {loading && <div className='w-full h-screen relative'><Loader /></div>}
            <div className='flex flex-col items-center justify-center gap-5'>
                <img
                    className='w-72 h-92 rounded-[50%]'
                    src={`data:image/jpeg;base64,${user.avatar.url}`}
                    alt='check'
                />
                <button onClick={handleOpenProf} className='w-72 border border-emerald-400 text-white bg-gray py-1'>Edit Profile</button>
                {<Modal open={openProf} setOpen={setOpenProf}>
                    <form
                        onSubmit={updateProfile}
                        className='w-full flex flex-col gap-2 relative'>
                        {updatedUserloading && <Loader />}
                        {updatedUserError && <span className='w-full text-center text-[red]'>{updatedUserError}</span>}
                        {updatedUser && <span className='w-full text-center text-emerald-400'>{updatedUser.message}</span>}
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray dark:text-white">Full Name</label>
                            <input value={name} onChange={(e) => setFullName(e.target.value)} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={user.name} required />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray dark:text-white">Email</label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={user.email} required />
                        </div>
                        <button type="submit" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Submit</button>
                    </form>
                </Modal>}
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
                <NavLink to='/order/me'>
                    <button className='w-72 border border-emerald-400 text-white bg-gray py-1'>My orders</button>
                </NavLink>
                <button
                    onClick={handleOpen}
                    className='w-72 border border-emerald-400 text-white bg-gray py-1'
                >
                    Change Password
                </button>
                {<Modal open={open} setOpen={setOpen}>
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
                </Modal>}
            </div>
        </div>
    </React.Fragment>
};

export default Account;