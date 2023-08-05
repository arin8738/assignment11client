/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import React, { createContext, useContext } from "react";
import MySelectedTable from "./MySelectedTable";
import { AuthContext } from "../../../AuthPage/AuthProvider";
import { RotatingLines } from "react-loader-spinner";
import useCart from "../../../../Components/Hooks/useCart";
import CustomHelmet from "../../../../Components/Helmet/CustomHelmet";
import Swal from "sweetalert2";

const MySelectedClasses = () => {
  const { user, loading } = useContext(AuthContext);

  const [cart, refetch, isLoading] = useCart();
  // const total = cart.reduce((sum, item) => sum + item.price, 0);

  const CardData = createContext(cart || 0);

  // console.log(data);
  if (isLoading)
    return (
      <RotatingLines
        strokeColor="#ff5161"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    );

  const handleDelete = (id) => {
    console.log(id);

    // const isDelete = confirm("Are you sure to delete it? If yes, click ok!");

    Swal.fire({
      title: "Are you sure to delete it?",
      text: "It will be deleted permanently",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://language-master-server-side.vercel.app/course/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((d) => {
            console.log(d);
            if (d.deletedCount) {
              refetch();
              // alert("Deleted successfully")
              Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Deleted successfully",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
      }
    });

    // if(isDelete){
    //   fetch(`https://language-master-server-side.vercel.app/course/${id}`, {
    //   method: "DELETE",
    // })
    //   .then((res) => res.json())
    //   .then((d) => {
    //     console.log(d);
    //     if(d.deletedCount){
    //       refetch()
    //       // alert("Deleted successfully")
    //       Swal.fire({
    //         position: 'top-center',
    //         icon: 'success',
    //         title: 'Deleted successfully',
    //         showConfirmButton: false,
    //         timer: 1500
    //       })
    //     }
    //   });
    // }
  };

  return (
    <div className="">
      <CustomHelmet>Selected-Class</CustomHelmet>
      <div className="mt-20 mb-10 text-center w-9/12 md:w-1/2 mx-auto">
        <h3 className="text-3xl font-semibold mb-5">My Selected Courses</h3>
        {/* <h3 className="text-base font-semibold mb-5">Total price: ${total.toFixed(2)}</h3> */}
      </div>

      <div className="overflow-x-auto mb-20">
        <table className="table w-[65vw] mx-5">
          {/* head */}
          <thead className="rounded-lg">
            <tr className="bg-my-secondary rounded-lg">
              <th>#</th>
              <th>Course Name</th>
              <th>Instructor</th>
              <th>Price</th>
              <th className="">Pay</th>
              <th className="">Delete</th>
            </tr>
          </thead>

          <tbody>
            {/* row 1 */}
            {cart?.map((d) => (
              <MySelectedTable
                handleDelete={handleDelete}
                index={cart.indexOf(d)}
                key={d._id}
                data={d}
                payment={`Pay`}
              ></MySelectedTable>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MySelectedClasses;
