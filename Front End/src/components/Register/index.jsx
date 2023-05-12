import axios from "axios";
import Joi from "joi";
import React, { useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../UserContext/UserProvider";
import styles from "./styles.module.css";
//import styles from "./styles.module.css";

const Register = () => {
  let [user, setUser] = useState({
    userName: "",
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const { setLoading } = useContext(UserContext);

  let getFormInfo = (e) => {
    let myUser = { ...user }; //Depth copy
    myUser[e.target.name] = e.target.value; //value by tag name
    setUser(myUser);
  };

  let [formMiddleware, setFormMiddleware] = useState([]);

  let btnClick = async (e) => {
    e.preventDefault();
    let validateResult = validateForm();
    console.log(validateResult);
    if (validateResult.error) {
      setFormMiddleware(validateResult.error.details);
      return;
    }
    setLoading(true);

    let { data } = await axios.post(
      "http://localhost:3000/api/v1/auth/signup",
      user,
    );

    if (data.message === "success signup") {
      goToValidat();
    } else {
      toast.error(data.message);
    }
    setLoading(false);
  };

  let Navigate = useNavigate();
  let goToValidat = () => {
    let path = "/VerifyEmail";
    Navigate(path, { replace: true });
  };

  let validateForm = () => {
    const schema = Joi.object({
      userName: Joi.string().min(6).max(20).required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      password: Joi.string().min(6).max(20).required(),
    });
    return schema.validate(user);
  };

  return (
    <>
      <div className="d-flex justify-content-center pt-4">
        {formMiddleware?.map((error, index) => (
          <div key={index} className="alert alert-danger error-message w-50">
            {error.message}
          </div>
        ))}
      </div>
      <div className="container text-center my-5">
        <div className="user my-3">
          <i className="far fa-edit user-icon" />
          <h4 className="login">Register</h4>
        </div>
        <div className="card p-5 w-50 m-auto">
          <form onSubmit={btnClick} action="/handleLogin">
            <input
              onChange={getFormInfo}
              className="form-control"
              placeholder="Enter your Name"
              type="text"
              name="userName"
            />
            <input
              onChange={getFormInfo}
              className="form-control my-2 "
              placeholder="Enter your email"
              type="email"
              name="email"
            />
            <div className={styles.FormInputContainer}>
              <input
                onChange={getFormInfo}
                className="form-control  "
                placeholder="Enter your Password"
                type={showPassword ? "text" : "password"}
                name="password"
              />
              <i
                onClick={() => setShowPassword(!showPassword)}
                className={`fa-solid fa-eye` + (showPassword ? "-slash" : "")}
              ></i>
            </div>
            {/* <div className={styles.FormInputContainer}>
              <input
                onChange={getFormInfo}
                className="form-control  my-2"
                placeholder="Password Confirmation"
                type={showPasswordConfirm ? "text" : "password"}
                name="cpassword"
              />
              <i
                onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                className={
                  `fa-solid fa-eye` + (showPasswordConfirm ? "-slash" : "")
                }
              ></i>
            </div> */}
            <button
              type="submit"
              className="btn btn-default-outline my-4 w-100 rounded"
            >
              Register
            </button>
            <Link className="btn btn-default-outline" to="/login">
              Login
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
