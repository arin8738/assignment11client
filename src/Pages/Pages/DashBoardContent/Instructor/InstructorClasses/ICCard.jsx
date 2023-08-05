/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';

const ICCard = ({ index, data}) => {
    const {feedback, name, image, status, instructorMail, instructor, enrolled, availableSeats, price, _id } = data;
    return (
      <>
        <tr>
          <th>
            {index+1}
          </th>
          <td>
              <div className="avatar">
                <div className="mask mask-squircle w-12 h-12">
                  <img
                    src={image}
                    alt="Class"
                  />
                </div>
              </div>
          </td>
  
          <td>
            {name}
          </td>
  
          <td className='text-base font-semibold'>{instructor}
          <p className='text-xs font-normal'>{instructorMail}</p>
          </td>
          <td>{availableSeats-enrolled} of {availableSeats}</td>
          <td>{enrolled}</td>
          <td className='text-end'>${price}</td>
          <td> <Link disabled className="btn btn-outline mx-1 btn-xs">{status}</Link></td>

          <th>
            <Link to={`/dashboard/my-classes/${_id}`} className="btn btn-outline mx-1 btn-xs">Update</Link>
            </th>
            <th className='text-xs font-normal text-my-p'>{feedback? feedback : ""}</th>
        </tr>
      </>
    );
  };

export default ICCard;