/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import BtnSolid from "../Buttons/BtnSolid";
import Rating from "react-rating";
import { FiMail } from 'react-icons/fi';


const engImg = "https://i.ibb.co/MPZD6Q4/Flag-of-the-United-Kingdom.png";
const spnImg = "https://i.ibb.co/9r6hjvc/Spain-flag-300.png";
const chnImg = "https://i.ibb.co/845Hmgn/Flag-of-China.png";
const gerImg = "https://i.ibb.co/xYYgVtn/2560px-Flag-of-Germany-svg.png";
const frnImg = "https://i.ibb.co/k0Xwh6J/Flag-of-France.png";
const sdaImg = "https://i.ibb.co/HnhdhSj/Flag-of-Saudi-Arabia-svg.png";
const noImg = "https://i.ibb.co/DwfmK4q/depositphotos-86009122-stock-photo-languages-signpost.webp"

const InstroctorPageCard = ({data}) => {
  const { name, photo, email, designation} = data;


  return (
    <div className="my-4">
      <div className="card w-96 bg-base-100 shadow-xl relative mx-auto">
        <figure className="px-5 pt-5 w-96 h-[230px]">
          <img src={photo} alt="Language Plan" className="rounded-md w-full h-full" />
        </figure>
        <div className="card-body relative">
          <img
            src={noImg}
            className="border-4 border-white w-12 h-12 rounded-full absolute -top-6 right-16"
            alt=""
          />

          <h2 className="card-title flex justify-between"><span>{name}</span> <span className="text-my-primary">{designation}</span></h2>
          <h2 className="flex items-center gap-1 text-base"><FiMail className="text-my-primary"></FiMail><span className="text-my-p">{email}</span></h2>
          {/* <p className="text-my-p">{details}</p> */}


        </div>
      </div>
    </div>
  );
};

export default InstroctorPageCard;
