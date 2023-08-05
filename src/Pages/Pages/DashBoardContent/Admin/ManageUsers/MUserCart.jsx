/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";

const MUserCart = ({ index, data, handleRole}) => {
  const { name, email, designation, photo } = data;
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
                  src={photo}
                  alt="user"
                />
              </div>
            </div>
        </td>

        <td>
          {name}
          <br />
          <span className="badge badge-ghost badge-sm">
            {email}
          </span>
        </td>

        <td>{designation}</td>
        <th>
          <Link disabled={designation == "Instructor"} onClick={()=> handleRole(email, "Instructor")} className="btn btn-outline mx-1 btn-xs">Make Instructor</Link>
          <Link disabled={designation == "Admin"} onClick={()=> handleRole(email, "Admin")} className="btn btn-outline mx-1 btn-xs">Make Admin</Link>
        </th>
      </tr>
    </>
  );
};

export default MUserCart;
