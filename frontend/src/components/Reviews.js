import React from 'react';
import avatar from '../assets/images/avatar.svg';
import ReactStars from 'react-stars';

const Reviews = ({ review }) => {
    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        value: review.rating,
        count: 5,
        // onChange={ratingChanged}
        size: 24,
        color2: '#ffd700',
        half: true,
    };
    return (
        <div className='sm:w-[300px] md:w-96 w-[400px] border border-[#ddd] flex flex-col items-center justify-center self-stretch'>
            <img
                className='w-16 h-16'
                src={avatar}
                alt='user'
            />
            <span>{review.name}</span>
            <ReactStars
                {...options}
            />
            <span className='text-justify px-2'>{review.comment}</span>
            <span>created <b>{review.createdAt.slice(0, 10)}</b></span>
        </div>
    )
}

export default Reviews;