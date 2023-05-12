import axios from "axios";
import Joi from "joi";
import React, { useState } from "react";
import { useContext } from "react";
import cookie from "react-cookies";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../UserContext/UserProvider";
import styles from "./styles.module.css";

const ResetPassword = () => {
  const [resetCode, setResetCode] = useState(null);
  const [email, setEmail] = useState(cookie.load("email"));
  const [inputField, setInputField] = useState("");
  const [errorList, setErrorList] = useState([]);
  const { setLoading } = useContext(UserContext);
  const navigator = useNavigate();

  const schema = Joi.object({
    password: Joi.string().min(6).max(20).required(),
  });

  const getFormValue = (e) => {
    const inputValue = e.target.value;
    if (resetCode) {
      const { error } = schema.validate({ password: inputValue });
      console.log(error);
      console.log(inputField);
      if (error) {
        setErrorList(error.details);
      } else {
        setErrorList([]);
      }
    }
    setInputField(inputValue);
  };

  const submitFormData = async (e) => {
    e.preventDefault();
    if (resetCode) {
      console.log(email.email);
      setLoading(true);
      const result = await axios.patch(
        "http://localhost:3000/api/v1/auth/forgetpassword",
        {
          email: email.email,
          code: resetCode,
          password: inputField,
        },
      );
      setLoading(false);
      cookie.remove("email");
      if (result.data.message === "success") {
        toast.success("Changed successfully!");
        navigator({ pathname: "/login" });
      } else {
        if (result.data.message === "In-valid account or In-valid OTP Code") {
          toast.error("Wrong reset code entered, please try again.");
          navigator({ pathname: "/SentCode" });
        }
      }
    } else {
      setResetCode(inputField);
      setInputField("");
    }
  };
  return (
    <div className="container text-center my-5">
      <div className="user my-3">
        {resetCode ? (
          <i className="fa-solid fa-unlock user-icon text-success"></i>
        ) : (
          <i className="fa-solid fa-lock user-icon text-dark"></i>
        )}
        <h4
          className={`login my-4 ` + (resetCode ? "text-success" : "text-dark")}
        >
          Reset Your Password
        </h4>
      </div>
      <div className="card p-5 w-50 m-auto">
        {errorList.map((error, index) => (
          <div key={index} className="alert alert-danger error-message">
            {error.message}
          </div>
        ))}
        <form onSubmit={submitFormData}>
          {!resetCode ? (
            <input
              onChange={getFormValue}
              value={inputField}
              className="form-control text-center py-3"
              placeholder="Enter the reset code"
              type="text"
              name="email"
            />
          ) : (
            <input
              onChange={getFormValue}
              value={inputField}
              className="form-control my-4 py-3"
              placeholder="Enter your new password"
              type="text"
              name="password"
            />
          )}
          <button
            className="btn btn-default-outline my-4 w-100 rounded"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
