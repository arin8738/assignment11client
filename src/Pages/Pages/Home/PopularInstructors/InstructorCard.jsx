/* eslint-disable no-unused-vars */
import React from 'react';
import BtnOutLine from '../../../../Components/Buttons/BtnOutLine';

const InstructorCard = () => {
    const {name, img, role, description} = {name: "Abdullah", role: "teacher", description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores",  img: "https://thumbs.dreamstime.com/b/close-up-portrait-her-nice-cute-charming-attractive-lovely-unsure-puzzled-shocked-wavy-haired-girl-worrying-biting-lip-over-139812379.jpg" }
    return (
            <div
        className='flex flex-col justify-center text-center border p-10 mx-3 rounded-md'>
            <img className='w-36 h-36 mx-auto rounded-full' src={img} alt="" />
            <h3 className='text-xl font-semibold mt-3'>{name}</h3>
            <h4 className='mb-2 text-lg font-bold'>{role}</h4>
            <p>{description}</p>
            <BtnOutLine cStyle={`btn-sm my-5`} destination={"instoctors"}>See All Instructors</BtnOutLine>

        </div>
    );
};

export default InstructorCard;

