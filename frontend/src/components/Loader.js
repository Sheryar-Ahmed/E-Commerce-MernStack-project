import React from 'react'
import { CirclesWithBar } from 'react-loader-spinner';


const Loader = () => {
    return (
        <div className='w-full flex items-center justify-center h-full absolute top-6/12 left-6/12'>
            <CirclesWithBar
                height="100"
                width="100"
                color="#4fa94d"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                outerCircleColor=""
                innerCircleColor=""
                barColor=""
                ariaLabel='circles-with-bar-loading'
            />
        </div>
    )
}

export default Loader;