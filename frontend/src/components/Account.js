import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Loader from './Loader';


const Account = () => {
    const { loading, error, user } = useSelector(state => state.user);
    return <React.Fragment>
        <div className='relative w-full flex flex-row justify-center items-center'>
            {loading && <Loader />}
            {user && <div
                className='sm:w-[300px] w-96 shadow-xl h-content p-2 mt-3 flex flex-col gap-4 items-center'
            >{user && user.avatar && user.avatar.url && <img
                src={`data:image/jpeg;base64,${user.avatar.url}`}
                alt={user.avatar.url}
                className='w-40 h-40 aspect-square rounded-xl bg-contain'
            />}
                <span className='text-xl'>Name: <b>{user.name}</b></span>

            </div>}
        </div>
    </React.Fragment>
};

export default Account;