/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../../AuthPage/AuthProvider";
import CustomHelmet from "../../../../../Components/Helmet/CustomHelmet";

const AddAClass = () => {
  const [fill, setFill] = useState(false);
  const { user } = useContext(AuthContext);

  // const handleFilter = (event) => {
  //   console.log(event.target.value);
  //   // setSort(event.target.value);
  //   setCtgry(event.target.value);
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    // user?.displayName
    const classesName = form.classesName.value;
    const availableSeats = parseInt(form.availableSeats.value);
    const photo = form.photo.value;
    const price = parseFloat(form.price.value);

    if (availableSeats && classesName && photo && price) {
      setFill(false);
    } else {
      // alert("Fill all the input fields");

      Swal.fire({
        title: "Unable to add!",
        text: "Fill all the input fields!",
        icon: "warning",
        confirmButtonText: "Okay",
      });
      return;
    }
    // console.log(fill);

    const newClass = {
      image: photo,
      price,
      name: classesName,
      instructor: user?.displayName,
      instructorMail: user?.email,
      status: "Pending",
      availableSeats,
      enrolled: 0
    };

    console.log(newClass);

    fetch("https://language-master-server-side.vercel.app/add-class", {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(newClass)
    })
    .then(res => res.json())
    .then(r => {
      // console.log(r);
      if(r.insertedId){
        form.reset();
        // alert("Added Successfully")
        Swal.fire({
          position: 'top-center',
          icon: 'success',
          title: 'Added Successfully',
          showConfirmButton: false,
          timer: 1500
        })
      }

    })
  };

  return (
    <div className="mb-16">
      <CustomHelmet>Add-A-Class</CustomHelmet>
      <form onSubmit={handleSubmit}
      style={{backgroundImage: "url('https://i.ibb.co/BgVcNZ2/photo-1508615039623-a25605d2b022-ixlib-rb-4-0.jpg')"}}
      className="p-20 rounded-lg"
      >
        <h3 className='text-center font-bold text-2xl mb-6 text-white'>Add A Class</h3>
        {/* form row  */}
        <div className="md:flex mb-3">
          <div className="form-control md:w-1/2 w-full mr-4">
            <label className="label">
              <span className="label-text text-[black] text-base font-semibold">
                Class name:{" "}
              </span>
            </label>
            <label className="input-group">
              <input
                style={{ borderRadius: "10px" }}
                type="text"
                placeholder="Class name"
                name="classesName"
                className="input input-bordered w-full"
              />
            </label>
          </div>

          <div className="form-control md:w-1/2 w-full">
            <label className="label">
              <span className="label-text text-[black] text-base font-semibold">
                Available Seats
              </span>
            </label>
            <label className="input-group">
              <input
                style={{ borderRadius: "10px" }}
                name="availableSeats"
                type="text"
                placeholder="Available Seats"
                className="input input-bordered w-full"
              />
            </label>
          </div>
        </div>

        <div className="md:flex mb-3">
          <div className="form-control md:w-1/2 w-full mr-4">
            <label className="label">
              <span className="label-text text-[black] text-base font-semibold">
                Instructor name:{" "}
              </span>
            </label>
            <label className="input-group">
              <input
                defaultValue={user?.displayName}
                disabled
                style={{ borderRadius: "10px" }}
                // name="instructorName"
                type="text"
                className="input input-bordered w-full"
              />
            </label>
          </div>

          <div className="form-control md:w-1/2 w-full">
            <label className="label">
              <span className="label-text text-[black] text-base font-semibold">
                Instructor email:
              </span>
            </label>
            <label className="input-group">
              <input
                defaultValue={user?.email}
                disabled
                style={{ borderRadius: "10px" }}
                name="instructorEmail"
                type="email"
                placeholder="Seller email"
                className="input input-bordered w-full"
              />
            </label>
          </div>
        </div>

        <div className="md:flex mb-3">
          <div className="form-control md:w-1/2 w-full mr-4">
            <label className="label">
              <span className="label-text text-[black] text-base font-semibold">
                Price:{" "}
              </span>
            </label>
            <label className="input-group">
              <input
                style={{ borderRadius: "10px" }}
                name="price"
                type="text"
                placeholder="Price"
                className="input input-bordered w-full"
              />
            </label>
          </div>

          <div className="form-control mb-5">
            <label className="label">
              <span className="label-text text-[black] text-base font-semibold">
                Photo URL of the Class:
              </span>
            </label>
            <label className="input-group">
              <input
                style={{ borderRadius: "10px" }}
                name="photo"
                type="text"
                placeholder="Class photo URL"
                className="input input-bordered w-full"
              />
            </label>
          </div>
        </div>

        <input
          // disabled={fill}
          type="submit"
          value="Add a Class"
          className="btn drop-shadow-2xl btn-block bg-my-pink border-my-pink hover:bg-my-blue hover:border-my-blue"
        />
      </form>
    </div>
  );
};

export default AddAClass;
