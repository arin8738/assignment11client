/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import BtnOutLine from '../../../../Components/Buttons/BtnOutLine';
import BtnSolid from '../../../../Components/Buttons/BtnSolid';

const MySelectedTable = ({data, index, handleDelete, payment}) => {
    const {courseName, price, availableSeats, instructor, instructorMail} = data;

    let disabled = false;
    if(payment == "Paid"){
      disabled= true;
    }

    return (
        <>
        <tr>
              <td>{index+1}</td>
              <td>
                <div className="flex items-center space-x-3">
                  <div>
                    <div className="font-bold">{courseName}</div>
                  </div>
                </div>
              </td>

              <td>{instructor}</td>

              <td className=''>${price}</td>
              <th>
                <BtnOutLine disabled={disabled} data={data} cStyle={`btn-sm disabled`} destination={`/dashboard/checkout/${data._id}`}>{payment}</BtnOutLine>
              </th>
              <th>
                <BtnSolid disabled={disabled} cStyle={`btn-sm`} clicked={handleDelete} _id={data._id} destination={``}>Delete</BtnSolid>
              </th>
            </tr>
        </>
    );
};

export default MySelectedTable;