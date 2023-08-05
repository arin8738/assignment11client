/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Checkout = ({ data, price }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorM, setErrorM] = useState("");

  const [clientSecret, setClientSecret] = useState("");
  const navigate = useNavigate();

    // console.log("pp", price);

  let date = new Date().toLocaleDateString();
  // console.log(date); // 6/17/2022
  const time = moment().format("LT");
  //   console.log(time)

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("https://language-master-server-side.vercel.app/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ price: price }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
        console.log(data);
      });
  }, [price]);

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setErrorM(error.message);
    } else {
      setErrorM("");
      //   console.log("[PaymentMethod]", paymentMethod);
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: data?.name,
            email: data?.email,
          },
        },
      });

    if (confirmError) {
      console.log(confirmError);
    }

    if (paymentIntent?.status == "succeeded") {
      fetch(`https://language-master-server-side.vercel.app/course/${data.oldID}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: data._id }),
      })
        .then((res) => res.json())
        .then((d) => {
          //   console.log(d);
          if (d.resultCart.modifiedCount > 0 && d.result.modifiedCount > 0) {
            const paymentDetails = {
              email: data.email,
              courseName: data.courseName,
              transactionID: paymentIntent.id,
              amount: (paymentIntent.amount / 100).toFixed(2),
              method: paymentIntent.payment_method_types[0],
              date: date,
              time,
            };

            fetch(`https://language-master-server-side.vercel.app/payment-history/${data.email}`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(paymentDetails),
            })
              .then((res) => res.json())
              .then((d) => {
                console.log("payment date", d);
              });

            // alert("Added to DB");
            // alert("Payment Successful!");
            Swal.fire({
              position: 'top-center',
              icon: 'success',
              title: 'Payment Successful',
              showConfirmButton: false,
              timer: 1500
            })
            navigate("/dashboard/my-selected-classes");
          }
        });
    }
    // console.log(paymentIntent);

    // const paymentDetails = {
    //   transactionID: paymentIntent.id,
    //   amount: (paymentIntent.amount / 100).toFixed(2),
    //   method: paymentIntent.payment_method_types[0],
    //   date: date,
    //   time,
    // };
    // console.log("paymentDetails", paymentDetails);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />

        <div className="flex justify-center">
          <button
            type="submit"
            className="btn btn-primary hover:bg-my-primary border-none text-white btn-sm my-2 px-5 w-1/3 mt-10"
            disabled={!stripe || !clientSecret}
          >
            Pay ${price}
          </button>
        </div>

        <p className="text-[red] my-5">{errorM}</p>
      </form>
    </div>
  );
};

export default Checkout;
