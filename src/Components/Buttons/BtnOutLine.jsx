/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';

const BtnOutLine = ({children, destination, cStyle, disabled}) => {
    return (
        <div>
            <Link to={destination}
            disabled = {disabled}
             className={` ${cStyle} btn btn-outline px-5 rounded-2xl hover:bg-my-primary hover:border-my-primary text-my-primary border-my-primary`}
             >{children}</Link>
        </div>
    );
};

export default BtnOutLine;