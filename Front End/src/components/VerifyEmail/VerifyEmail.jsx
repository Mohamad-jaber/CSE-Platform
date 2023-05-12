import React from "react";
import { Link } from "react-router-dom";

function VerifyEmail() {
  return (
    <>
      <div className="d-flex justify-content-center">
        <img src="/assets/images/logoo.png" width={900} className="pt-4  " alt="" />
      </div>
      <div className="d-flex justify-content-center">
        <h2 className="text-success pt-5">
          Please verify your email before you login
        </h2>
      </div>
      <div className="d-flex justify-content-center">
        <Link
          type="submit"
          to="/login"
          className="btn btn-outline-info btn-lg mt-3"
        >
          Login in your account
        </Link>
      </div>
    </>
  );
}

export default VerifyEmail;
