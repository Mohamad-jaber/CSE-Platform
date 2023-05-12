import React, { useContext } from "react";
import cookie from "react-cookies";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../UserContext/UserProvider";
import styles from "./styles.module.css";

const Navbar = () => {
  const { loggedUser, setLoggedUser } = useContext(UserContext);

  let logOut = (e) => {
    e.preventDefault();
    toast.success(`Hope to see you back soon, ${loggedUser.name}.`);
    setLoggedUser(null);
    cookie.remove("token", { path: "/" });
    gohome();
  };

  let Navigate = useNavigate();
  let gohome = () => {
    let path = "/";
    Navigate(path, { replace: true });
  };

  let test =() =>{
    console.log(loggedUser)
  }

  return (
    <nav
      className={
        styles.navContainer +
        " navbar navbar-expand-lg bg-custom navbar-dark bg-dark"
      }
    >
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src="/assets/images/CSElogoo.png" width={200} alt="" />
        </Link>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div
          className={styles.navList + " collapse navbar-collapse"}
          id="navbarSupportedContent"
        >
          {loggedUser ? (
            <ul className={styles.navbarContent + " navbar-nav ml-auto"}>
              <li className="nav-item">
                {loggedUser.role == 1 ? <Link className="nav-link" to="/dashboard">
                  Dashboard
                </Link> : ''}
                
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/mylist">
                  My List
                </Link>
              </li>
              <li className="nav-item">
                <Link onClick={logOut} className="nav-link" to="/">
                  Logout
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav ml-auto">
              {/* <li className="nav-item">
                <Link className="nav-link" to="/findUser">
                  Find-User
                </Link>
              </li> */}
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="login">
                  Login
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
