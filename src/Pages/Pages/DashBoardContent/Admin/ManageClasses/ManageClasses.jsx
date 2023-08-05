/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import MClassCart from "./MClassCart";
import CustomHelmet from "../../../../../Components/Helmet/CustomHelmet";
import Swal from "sweetalert2";

const ManageClasses = () => {
  // const [feedback, setFeedback] = useState("");
  const { isLoading, data, refetch } = useQuery({
    queryKey: ["allClasses"],
    queryFn: () =>
      fetch("https://language-master-server-side.vercel.app/classes").then((res) => res.json()),
  });

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

  const handleStatus = (id, status) => {
    const info = { status };

    fetch(`https://language-master-server-side.vercel.app/class/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    })
      .then((res) => res.json())
      .then((d) => {
        console.log(d);
        if (d.modifiedCount) {
          refetch();
          // alert("Role updated successfully");
          Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'Approved',
            showConfirmButton: false,
            timer: 1500
          })

        }
      });
  };

  const handleFeedBack = async(id) => {
    // window.my_modal_3.showModal()

    // let text;
    // let message = prompt("Write Feedback:", "");
    // if (message == null || message == "") {
    //   text = "User cancelled the prompt.";
    // }

    let message = "";
    const { value: text } = await Swal.fire({
      input: 'textarea',
      inputLabel: 'Give feedback',
      inputPlaceholder: 'Type your feedback here...',
      inputAttributes: {
        'aria-label': 'Type your message here'
      },
      showCancelButton: true
    })
    
    if (text) {
      message = text;
      Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: 'Feedback added successfully',
        showConfirmButton: false,
        timer: 1500
      })
    }else{
      return;
    }

    // setFeedback(message)

    fetch(`https://language-master-server-side.vercel.app/course-feedback/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({feedback: message}),
      })
      .then(res => res.json())
      .then(d => {
        console.log(d)
        if(d.modifiedCount >0){
          // alert("Feedback added")
          Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'Feedback added successfully.',
            showConfirmButton: false,
            timer: 1500
          })
        }
      })

  };

  // console.log(feedback)

  return (
    <div className="pt-14">
      <CustomHelmet>Manage-Class</CustomHelmet>
      <h3 className="text-2xl font-semibold text-center mb-5">
        All the Classes
      </h3>

      <div className="overflow-x-auto mb-20">
        <table className="table w-[69vw] mx-5">
          {/* head */}
          <thead className="rounded-lg">
            <tr className="bg-my-secondary rounded-lg">
              <th>#</th>
              <th>Photo</th>
              <th>Class Name</th>
              <th>Instructor</th>
              <th>Instructor Mail</th>
              <th>Available Seats</th>
              <th>Price</th>
              <th className="text-center">Status</th>
              {/* <th className="">Delete</th> */}
            </tr>
          </thead>

          <tbody>
            {/* row 1 */}
            {data?.map((d) => (
              <MClassCart
                handleStatus={handleStatus}
                handleFeedBack={handleFeedBack}
                index={data.indexOf(d)}
                key={d._id}
                data={d}
              ></MClassCart>
            ))}
          </tbody>
        </table>
      </div>

      {/* You can open the modal using ID.showModal() method */}
      <dialog id="my_modal_3" className="modal">
        <form method="dialog" className="modal-box">
          <button
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
          <h3 className="font-semibold text-center text-lg">Admin Feed Back</h3>
          <div className="divider"></div>
          <p>{}</p>
          {/* <p className="py-4">Press ESC key or click on ✕ button to close</p> */}
        </form>
      </dialog>
    </div>
  );
};

export default ManageClasses;
