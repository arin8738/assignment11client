import { useQuery } from "@tanstack/react-query";
import React from "react";
import MUserCart from "./MUserCart";
import { RotatingLines } from "react-loader-spinner";
import CustomHelmet from "../../../../../Components/Helmet/CustomHelmet";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const { isLoading, data, refetch } = useQuery({
    queryKey: ["allUsers"],
    queryFn: () =>
      fetch("https://language-master-server-side.vercel.app/users").then((res) => res.json()),
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

    const handleRole = (email, role)=>{
        const info = {role};

        fetch(`https://language-master-server-side.vercel.app/user/${email}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
      })
      .then(res => res.json())
      .then(d => {
        // console.log(d)
        if(d.modifiedCount){
            refetch()
          // alert("Role updated successfully")
          Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'Role updated successfully.',
            showConfirmButton: false,
            timer: 1500
          })
          
        }
      })
    }

  return (
    <div className="pt-14">
      <CustomHelmet>Manage-User</CustomHelmet>
      <h3 className="text-2xl font-semibold text-center mb-5">All the users</h3>

      <div className="overflow-x-auto mb-20">
        <table className="table w-[65vw] mx-5">
          {/* head */}
          <thead className="rounded-lg">
            <tr className="bg-my-secondary rounded-lg">
              <th>#</th>
              <th>Photo</th>
              <th>Info</th>
              <th>Current Role</th>
              <th className="text-center">Action</th>
              {/* <th className="">Delete</th> */}
            </tr>
          </thead>

          <tbody>
            {/* row 1 */}
            {data?.map((d) => (
              <MUserCart
              handleRole={handleRole}
                index={data.indexOf(d)}
                key={d._id}
                data={d}
              ></MUserCart>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
