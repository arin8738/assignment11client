/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import CustomHelmet from "../../../../Components/Helmet/CustomHelmet";
import MyPaymentCard from "./MyPaymentCard";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../AuthPage/AuthProvider";

const MyPaymentHistory = () => {
  const { user } = useContext(AuthContext);
  const [sortOP, setSortOp] = useState(-1);
  const [paymentCart, setPaymentCart] = useState([]);

  useEffect(() => {
    fetch(`https://language-master-server-side.vercel.app/payment-history/${user?.email}`, {
      method: "GET",
      headers: {
        sort: sortOP,
      },
    })
      .then((res) => res.json())
      .then((p) => setPaymentCart(p));
  }, [sortOP, user?.email]);

  const handleSort = (event) => {
    // console.log(event.target.value);
    setSortOp(event.target.value);
  };

  return (
    <div>
      <CustomHelmet>Payment-History</CustomHelmet>

      <div className="mt-20 mb-10 text-center w-full mx-auto">
        <h3 className="text-3xl font-semibold mb-5">My Selected Courses</h3>
      </div>

      <div className="overflow-x-auto mb-20">
        <div className="flex justify-end mr-5">
          <select onChange={handleSort} className="select select-success max-w-xs">
            <option disabled selected>
              Sort by date
            </option>
            <option value={1}>Old to new</option>
            <option value={-1}>New to old</option>
          </select>
        </div>

        <table className="table mt-1 w-[65vw] mx-5">
          {/* head */}
          <thead className="rounded-lg">
            <tr className="bg-my-secondary rounded-lg">
              <th>#</th>
              <th>Course Name</th>
              <th>Price</th>
              <th>Transaction ID</th>
              <th className="">Time</th>
              <th className="">Date</th>
            </tr>
          </thead>

          <tbody>
            {/* row 1 */}
            {paymentCart?.map((d) => (
              <MyPaymentCard
                key={d._id}
                data={d}
                index={paymentCart.indexOf(d)}
              ></MyPaymentCard>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyPaymentHistory;
