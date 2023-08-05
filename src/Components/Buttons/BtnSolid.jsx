/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';

const BtnSolid = ({children, destination, cStyle, clicked, disabled, _id}) => {
    return (
        <div>
            <Link to={destination} onClick={() =>clicked(_id)}
            disabled={disabled}
             className={`${cStyle} btn rounded-2xl px-5 hover:bg-my-secondary hover:border-my-secondary text-white border-my-primary bg-my-primary`}
             >{children}</Link>
        </div>
    );
};

export default BtnSolid;