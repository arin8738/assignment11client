/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import Swal from "sweetalert2";
import { FaGoogle } from "react-icons/fa";
import CustomHelmet from "../../Components/Helmet/CustomHelmet";

const Register = () => {
  const [seePass, setSeePass] = useState(true);

  const [passwordError, setPasswordError] = useState("");
  const [emptyP, setEmptyP] = useState(true);
  const [emptyCP, setEmptyCP] = useState(true);
  const [emptyE, setEmptyE] = useState(true);
  const [btnDisable, setBtnDisable] = useState(true);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { Register, UpdateUser, LoginWithGoogle } = useContext(AuthContext);

  const onSubmit = (data) => {
    console.log(data);

    if (data.password !== data.confirmPassword) {
      setPasswordError("Password and Confirm password does not match!");
      return;
    } else {
      setPasswordError("");
    }

    Register(data.email, data.password)
    .then(result => {
      const loggedUser = result.user;
      console.log(loggedUser)

      UpdateUser(data.name, data.photoUrl)
      .then(()=>{

        const newUser = {name: data.name, email: data.email, photo: data.photoUrl, designation: "Student" };

        fetch("https://language-master-server-side.vercel.app/user",{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        }
        )
        .then(res => res.json())
        .then(d => {
          // console.log("db",d)
          if(d.insertedId){
            // alert("Register success")
            Swal.fire({
              title: `Registration successful! Thanks, ${data.name}`,
              showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              }
            })
          }
        })

       
        navigate("/");
      })
      .catch("Unable to update profile!")
    })
    .catch(error => {
      console.log(error)
      setPasswordError(error.message)
    })
  };

  const handleGoogle = ()=>{
    LoginWithGoogle()
    .then((result)=>{
      const loggedUser = result.user;
      const newUser = {name: loggedUser.displayName, email: loggedUser.email, photo: loggedUser.photoURL, designation: "Student" };

        fetch("https://language-master-server-side.vercel.app/user",{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        }
        )
        .then(res => res.json())
        .then(d => {
          console.log("db",d)
          if(d.insertedId){
            // alert("Register success")
            Swal.fire({
              title: `Registration successful! Thanks, ${loggedUser.displayName}`,
              showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              }
            })
          }
        })

        
        // console.log(result)
        navigate("/");
    })
    .catch(err =>{
        console.log(err)
        setPasswordError(err.message)
    })
  }

  const handleEmail = (event) => {
    if (event.target.value) {
      setEmptyE(false);
    } else {
      setEmptyE(true);
    }
  };
  const handlePassword = (event) => {
    if (event.target.value) {
      setEmptyP(false);
    } else {
      setEmptyP(true);
    }
  };
  const handleCPassword = (event) => {
    if (event.target.value) {
      setEmptyCP(false);
    } else {
      setEmptyCP(true);
    }
  };

  useEffect(() => {
    // console.log(emptyE == true && emptyP == true && emptyCP == true);
    if (emptyE == true && emptyP == true && emptyCP == true) {
      setBtnDisable(!false);
    } else {
      setBtnDisable(!true);
    }
  }, [emptyE, emptyP, emptyCP]);

  return (
    <div className="flex justify-center items-center">
      <CustomHelmet>Registration</CustomHelmet>
      <div className="p-5 md:p-28"
      >
        <div style={{ backgroundRepeat: "no-repeat", backgroundSize: "cover" 
        ,backgroundImage: "url('https://photoshopstar.com/media/2015/11285/LF_3.jpg')"}}
          
          className="hero rounded-lg p-5 md:px-20 md:pt-5 md:pb-2 shadow-lg shadow-slate-950/50 "
          //   style={{ backgroundImage: `url(${bgImg})` }}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="hero-content flex-col lg:flex-row-reverse"
          >
            <div className="text-center lg:text-left">
              {/* <img src={bgImg2} alt="" /> */}
            </div>
            <div className="card flex-shrink-0 w-full max-w-md">
            <h3 className="text-2xl text-center font-semibold mb-3">Please Register</h3>

              <div className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    name="name"
                    {...register("name", { required: true })}
                    type="text"
                    placeholder="Enter your name"
                    className="input input-bordered"
                  />
                  {errors.name && (
                    <span className="text-red-600 my-2">Name is required</span>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Photo URL</span>
                  </label>
                  <input
                    name="photoUrl"
                    {...register("photoUrl", { required: true })}
                    type="text"
                    placeholder="Enter your name"
                    className="input input-bordered"
                  />
                  {errors.photoUrl && (
                    <span className="text-red-600 my-2">
                      Photo URL is required
                    </span>
                  )}
                </div>

                <div onBlur={handleEmail} className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    name="email"
                    {...register("email", { required: true })}
                    type="email"
                    placeholder="email"
                    className="input input-bordered"
                  />
                  {errors.email && (
                    <span className="text-red-600 my-2">Email is required</span>
                  )}
                </div>

                <div onBlur={handlePassword} className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    {...register("password", {
                      required: true,
                      minLength: 6,
                      maxLength: 32,
                      pattern:
                        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-]).{6,}$/i,
                    })}
                    name="password"
                    type={`${seePass ? "password" : "text"}`}
                    placeholder="password"
                    className="input input-bordered"
                  />
                  {errors.password?.type == "required" && (
                    <span className="text-red-600 my-2">
                      Password is required
                    </span>
                  )}
                  {errors.password?.type == "pattern" && (
                    <span className="text-red-600 my-2">
                      Password must contain at least six characters including at
                      least 1 upper case and 1 special character
                    </span>
                  )}
                  {(errors.password?.type == "minLength" ||
                    errors.password?.type == "maxLength") && (
                    <span className="text-red-600 my-2">
                      Password should be between 6 to 32 characters is required
                    </span>
                  )}
                </div>

                <div onBlur={handleCPassword} className="form-control">
                  <label className="label">
                    <span className="label-text">Confirm Password</span>
                  </label>
                  <input
                    {...register("confirmPassword", {
                      required: true,
                      minLength: 6,
                      maxLength: 32,
                      pattern:
                        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-]).{6,}$/i,
                    })}
                    name="confirmPassword"
                    type={`${seePass ? "password" : "text"}`}
                    placeholder="Confirm Password"
                    className="input input-bordered"
                  />
                  
                  {
                    seePass && <span className="my-1 text-xs mx-2" onClick={()=> setSeePass(!seePass)}>See password</span>
                  }
                  {
                    !seePass && <span className="my-1 text-xs mx-2" onClick={()=> setSeePass(!seePass)}>Hide password</span>
                  }

                  {errors.confirmPassword?.type == "required" && (
                    <span className="text-red-600 my-2">
                      Password is required
                    </span>
                  )}
                  {errors.confirmPassword?.type == "pattern" && (
                    <span className="text-red-600 my-2">
                      Password must contain at least six characters including at
                      least 1 upper case and 1 special character
                    </span>
                  )}
                  {(errors.confirmPassword?.type == "minLength" ||
                    errors.confirmPassword?.type == "maxLength") && (
                    <span className="text-red-600 my-2">
                      Password should be between 6 to 32 characters is required
                    </span>
                  )}
                  {passwordError && (
                    <span className="text-red-600 my-2">{passwordError}</span>
                  )}
                </div>

                <div className="form-control mt-6">
                  <input
                    disabled={btnDisable}
                    className="btn bg-[#cd9b50] border-none"
                    type="submit"
                    value="Register"
                  />
                </div>

                <p className="text-my-secondary text-center my-2">
                  Already have an account?
                  <Link to="/login" className="ml-1 hover:link">
                    Log in
                  </Link>
                </p>
                <div className="divider uppercase">Or Sing in with</div>
                <Link onClick={handleGoogle} className="btn btn-circle btn-outline text-center text-my-secondary hover:text-white hover:bg-my-primary hover:border-my-primary mx-auto"><FaGoogle></FaGoogle> </Link>
              
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
