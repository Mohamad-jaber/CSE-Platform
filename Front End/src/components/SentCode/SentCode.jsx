import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import cookie from "react-cookies";
import { useContext } from "react";
import { UserContext } from "../UserContext/UserProvider";

export default function SentCode() {
  const { setLoading } = useContext(UserContext);
  const [submitted, setSubmitted] = useState(false);
  let [email, setEmail] = useState({
    email: "",
  });

  let [state, setState] = useState(false);
  let [butState, setbutState] = useState(false);

  let [errorList, setErrorList] = useState([]);

  let [time, setTime] = useState(0);

  var timerId;

  async function submitFormData(e) {
    // setErrorList([]);
    e.preventDefault();
    setSubmitted(true);
    let { data } = await axios.patch(
      "http://localhost:3000/api/v1/auth/sendCode",
      email,
    );
    if (data.message != "success") {
      const e = {
        message: `${data.message}`,
      };
      console.log(data);
      setErrorList([e]);
      // console.log(errorList);
      toast.error(data.message);
      setSubmitted(false);
    } else {
      setState(true);
      cookie.save("email", email);

      timerId = setInterval(countdown, 1000);
    }
  }

  function getFormValue(e) {
    setEmail({ ...email, [e.target.name]: e.target.value });
  }

  let x = 30;
  function countdown() {
    if (x == -1) {
      clearTimeout(timerId);
      document.getElementById("btn")?.removeAttribute("disabled");
      setbutState(false);

      // console.log("end ")
    } else {
      let check = document.getElementById("btn")?.hasAttribute("disabled");
      // console.log(check)
      setbutState(check);
      if (!butState) {
        document.getElementById("btn")?.setAttribute("disabled", "true");
      }
      setTime(x);
      // console.log(x)
      x--;
    }
  }

  return (
    <>
      <div>
        <div className="container text-center my-5">
          <div className="user my-3">
            {/* <i className="fas fa-user-secret user-icon" /> */}
            <i class="fa-solid fa-lock user-icon"></i>
            <h4 className="login m-3">Trouble logging in?</h4>
          </div>
          {state ? (
            <div className="card p-5 w-50 m-auto">
              <form onSubmit={submitFormData}>
                <p>
                  We sent an email to {email.email}
                  <br />
                  with a code to Re-Set your account password .
                  <br />
                  If you receive the code click{" "}
                  <Link to="/ForgetPassword" className="text-info">
                    Here..
                  </Link>
                </p>

                <p className="mt-2">
                  {" "}
                  You can Re-Send code after {time} seconds remaining
                </p>
                <button
                  id="btn"
                  className="btn btn-default-outline  w-100 rounded"
                  type="submit"
                >
                  Re-Send Code
                </button>
              </form>
            </div>
          ) : (
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
                <button
                  id="btn"
                  className="btn btn-default-outline my-4 w-100 rounded button-onClick"
                  type="submit"
                  disabled={submitted}
                >
                  Reset My Password
                  {submitted ? (
                    <i class="fa fa-spinner fa-spin" aria-hidden="true"></i>
                  ) : (
                    <></>
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
