import axios from "axios";
import Joi from "joi";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import cookie from "react-cookies";
import { UserContext } from "../UserContext/UserProvider";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";
import styles from "./styles.module.css";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { setLoading, setLoggedUser } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);

  const [errorList, setErrorList] = useState([]);
  const Navigate = useNavigate();

  async function submitFormData(e) {
    e.preventDefault();
    let validateResult = valideteForm();
    console.log(validateResult);
    if (validateResult.error) {
      setErrorList(validateResult.error.details);
      return;
    } else {
      setLoading(true);
      let { data } = await axios.post(
        "http://localhost:3000/api/v1/auth/signin",
        user,
      );
      setLoading(false);
      if (data.message != "success") {
        if (data.message == "plz confirm your email") {
          let path = "/VerifyEmail";
          Navigate(path, { replace: true });
          return;
        }
        const e = {
          message: `${data.message}`,
        };
        // console.log(data.message)
        setErrorList([e]);
        console.log(errorList);
        toast.error(data.message);
      } else {
        cookie.save("token", data.loginToken, { path: "/" });
        const decoded = jwtDecode(data.loginToken);
        toast.success(`Welcome back, ${decoded.name}`);
        setLoggedUser(decoded);
        goToHome();
      }
    }
  }

  function valideteForm() {
    const schema = Joi.object({
      email: Joi.string()
        .required()
        .email({ tlds: { allow: ["com", "net"] } }),
      password: Joi.string().required(),
    });

    return schema.validate(user, { abortEarly: false });
  }

  function getFormValue(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  function goToHome() {
    let path = "/";
    Navigate(path, { replace: true });
    // window.location.reload();
  }

  return (
    <>
      <div>
        <div className="container text-center my-5">
          <div className="user my-3">
            <i className="fas fa-user-secret user-icon" />
            <h4 className="login">Login</h4>
          </div>
          <div className="card p-5 w-50 m-auto">
            {errorList.map((error, index) => (
              <div key={index} className="alert alert-danger error-message">
                {error.message}
              </div>
            ))}
            <form onSubmit={submitFormData}>
              <input
                onChange={getFormValue}
                className="form-control"
                placeholder="Enter your email"
                type="text"
                name="email"
              />
              <div className={styles.FormInputContainer}>
                <input
                  onChange={getFormValue}
                  className="form-control my-4 "
                  placeholder="Enter your Password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                />
                <i
                  onClick={() => setShowPassword(!showPassword)}
                  className={`fa-solid fa-eye` + (showPassword ? "-slash" : "")}
                ></i>
              </div>
              <button
                className="btn btn-default-outline my-4 w-100 rounded"
                type="submit"
              >
                Login
              </button>
              <p>
                <Link className="text-muted forgot btn" to="/SentCode">
                  I Forgot My Password
                </Link>
              </p>
              <Link className="btn btn-default-outline" to="/register">
                Register
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
