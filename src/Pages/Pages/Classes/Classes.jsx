/* eslint-disable no-unused-vars */
import Swal from "sweetalert2";
import CustomHelmet from "../../../Components/Helmet/CustomHelmet";
import LanguagePlanCart from "../../../Components/LanguagePlanCart/LanguagePlanCart";
import PageBanner from "../../../Components/PageBanner/PageBanner";
import { useQuery } from "@tanstack/react-query";
import { RotatingLines } from "react-loader-spinner";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../AuthPage/AuthProvider";
import useCart from "../../../Components/Hooks/useCart";

const Classes = () => {
  const { user } = useContext(AuthContext);
  const [, refetch] = useCart();

  const { isLoading, data,} = useQuery({
    queryKey: ["instructor"],
    queryFn: async () => {
      const res = await fetch("https://language-master-server-side.vercel.app/courses");
      // console.log(data)
      return res.json();
    },
  });

  const location = useLocation();
  // console.log(location.pathname)
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="h-[70vh] flex justify-center items-center">
        <RotatingLines
          strokeColor="#ff5161"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={true}
        />
      </div>
    );
  }
  // console.log(data);

  const select = (data) => {
    // console.log(id);
    // if (!user) {
    //   const isConfirm = confirm(
    //     "You are not sing in yet! Sing in to select it."
    //   );

    //   if (isConfirm) {
    //     navigate("/login", { state: location, replace: true });
    //     return
    //   }
    // }

    if(!user){
      Swal.fire({
        title: 'You are not sing in yet!',
        text: "Sing in to select it.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sing in'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: location, replace: true });
        }
      })
    }
    else{
      const {name, price, availableSeats, instructor, instructorMail, _id} = data;
      const cart = {email: user.email, oldID: _id, courseName:name, price, availableSeats, instructor, instructorMail, status: "unpaid"}
      console.log(cart)

      fetch(`https://language-master-server-side.vercel.app/course/${user.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cart),
      })
      .then(res => res.json())
      .then(d => {
        console.log(d)
        if(d.insertedId){
          refetch();
          // alert("Added successfully")
          Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'Added to cart.',
            showConfirmButton: false,
            timer: 1500
          })
        }
      })
    }
  };

  return (
    <div>
      <CustomHelmet>Courses</CustomHelmet>
      <div>
        <PageBanner
          title={`All the offered classes`}
          subTitle={`Teaching Turning Today's Learners Into Tomorrow's Leaders`}
          img="https://www.mcgill.ca/continuingstudies/files/continuingstudies/cs/hero/languages_1440x600_0.jpg"
        ></PageBanner>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-10">
        {data?.map((d) => (
          <LanguagePlanCart
            key={d._id}
            data={d}
            select={select}
          ></LanguagePlanCart>
        ))}
      </div>
    </div>
  );
};

export default Classes;
