/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";

const MyPaymentCard = ({ data, index }) => {
  const { courseName, transactionID, amount, method, date, time } = data;

  return (
    <>
      <tr>
        <td>{index + 1}</td>
        <td>
          <div className="flex items-center space-x-3">
            <div>
              <div className="font-bold">{courseName}</div>
            </div>
          </div>
        </td>

        <td className="">${amount}</td>
        <td>{transactionID}</td>
        <td>{time}</td>
        <td>{date}</td>
      </tr>
    </>
  );
};

export default MyPaymentCard;
