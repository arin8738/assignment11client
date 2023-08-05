/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import React from 'react';

const PopularLanguageCart = ({data}) => {

    const {image, enrolled, name} = data;

    return (
        <div className='w-[400px] h-[450px] mx-auto'>
            <img className='w-full h-full' src={image} alt="" />
            
            <div className='bg-[#48a7d4] bg-opacity-70 text-white mx-8 p-5 rounded-xl relative -top-44'>
                <div className='flex justify-between'>
                    <h3 className='text-xl font-semibold'>{name}</h3>
                    <p className='text-lg'>{enrolled} Students Enrolled</p>
                </div>
                <p className='py-3'>Take courses from the world's best instructors in affordable price.</p>
            </div>
        </div>
    );
};

export default PopularLanguageCart;