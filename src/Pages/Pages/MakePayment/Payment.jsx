import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Checkout from "./Checkout";

const stripePromise = loadStripe(import.meta.env.VITE_SECRET_KEY);

const Payment = () => {
  const [data, setData] = useState({});
  const params = useParams();
  //   const data1 = useLoaderData();

  useEffect(() => {
    axios
      .get(`https://language-master-server-side.vercel.app/single-cart/${params.id}`)
      .then(function (response) {
        // handle success
        //   console.log(response.data);
        setData(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, [params.id]);



  return (
    <div className="w-3/4 rounded-lg"
      style={{
        backgroundImage:
          "url('https://inai.io/hubfs/top-12-payment-gateways-in-colombia-that-you-need-to-know-about-2.jpeg')",
      }}
    >
      <div className=" bg-[black] opacity-75 text-white py-10 px-16 rounded-lg">
        <div>
          <h3 className="text-2xl font-semibold text-center my-5">
            Process to pay
          </h3>
          <div className="flex justify-between text-lg font-semibold">
            <p>Course Name: {data?.courseName}</p>
            <p>Total Amount: ${data?.price}</p>
          </div>
          <div className="divider"></div>
        </div>

        <Elements stripe={stripePromise}>
          <h3 className="text-base text-center my-5 text-my-p underline">
            Card details
          </h3>
          <Checkout data={data} price={data?.price}></Checkout>
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
