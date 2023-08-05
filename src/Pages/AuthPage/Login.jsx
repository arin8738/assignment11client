/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from "react";
import Swal from "sweetalert2";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { FaGoogle } from "react-icons/fa";
import CustomHelmet from "../../Components/Helmet/CustomHelmet";

const Login = () => {
  const [seePass, setSeePass] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  const from = location.state?.path || location.state?.pathname || "/";

  //   const [disable, setDisable] = useState(true);
  const { user, Login, LoginWithGoogle } = useContext(AuthContext);
  const [errorM, setErrorM] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    console.log(email, password);
    Login(email, password)
      .then((result) => {
        console.log(result.user);
        setErrorM("");

        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Login successful!",
          showConfirmButton: false,
          timer: 1500,
        });

        navigate(from);
      })
      .catch((err) => {
        setErrorM(err.message);
        console.log(err);
      });
  };

  const handleGoogle = () => {
    LoginWithGoogle()
      .then((result) => {
        const loggedUser = result.user;
        const newUser = {
          name: loggedUser.displayName,
          email: loggedUser.email,
          photo: loggedUser.photoURL,
          designation: "Student",
        };

        fetch("https://language-master-server-side.vercel.app/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        })
          .then((res) => res.json())
          .then((d) => {
            // console.log("db",d)
            if (d.insertedId) {
              // alert("Register success");
              Swal.fire({
                title: `Registration successful! Thanks, ${loggedUser.displayName}`,
                showClass: {
                  popup: "animate__animated animate__fadeInDown",
                },
                hideClass: {
                  popup: "animate__animated animate__fadeOutUp",
                },
              });
            }
          });
        // console.log(result);
        navigate(from);
      })
      .catch((err) => {
        console.log(err);
        setErrorM(err.message);
      });
  };

  return (
    <div className="flex justify-center items-center">
      <CustomHelmet>Login</CustomHelmet>
      <div className="p-5 md:p-28 rounded-lg">
        <div style={{ backgroundRepeat: "no-repeat", backgroundSize: "cover" ,
        backgroundImage: "url('https://photoshopstar.com/media/2015/11285/LF_3.jpg')"}}
          
          className="hero p-5 md:px-10 md:py-5 shadow-lg rounded-lg shadow-slate-950/50 "
          //   style={{ backgroundImage: `url(${bgImg})` }}
        >
          <form onSubmit={handleLogin} className="hero-content flex-col rounded-l"
          >
            <div className="text-center lg:text-left">
              {/* <img src={bgImg2} alt="" /> */}
            </div>
            <div className="card flex-shrink-0 w-full max-w-md">
              <h3 className="text-2xl text-center font-semibold mb-3">
                Please Log in
              </h3>

              <div className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    name="email"
                    type="email"
                    placeholder="email"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type={`${seePass ? "password" : "text"}`}
                    name="password"
                    placeholder="password"
                    className="input input-bordered"
                  />
                </div>
                {seePass && (
                  <span
                    className="my-1 text-xs mx-2"
                    onClick={() => setSeePass(!seePass)}
                  >
                    See password
                  </span>
                )}
                {!seePass && (
                  <span
                    className="my-1 text-xs mx-2"
                    onClick={() => setSeePass(!seePass)}
                  >
                    Hide password
                  </span>
                )}
                {errorM && <p className="text-my-primary">{errorM}</p>}

                <div className="form-control mt-6">
                  <button
                    // disabled={disable}
                    className="btn bg-[#cd9b50] border-none"
                  >
                    Login
                  </button>
                </div>
                <p className="text-my-secondary text-center my-2">
                  Don't have an account?
                  <Link to="/register" className="ml-1 hover:link">
                    Register
                  </Link>
                </p>
                <div className="divider uppercase">Or Sing in with</div>
                <Link
                  onClick={handleGoogle}
                  className="btn btn-circle btn-outline text-center text-my-secondary hover:text-white hover:bg-my-primary hover:border-my-primary mx-auto"
                >
                  <FaGoogle></FaGoogle>{" "}
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
