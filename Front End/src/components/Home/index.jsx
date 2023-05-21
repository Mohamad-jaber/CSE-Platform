import React from "react";
import { Link } from "react-router-dom";
import Mylist from "../Mylist";
import styles from "./styles.module.css";

const Home = () => {
  return (
    <React.Fragment>
      <div className={" d-flex flex-wrap " + styles.home_div }>
        <div className=" col-lg-8  justify-content-center ">
        <h4 className={ styles.mainH }>
          Welcome to CSE Platform
        </h4>
        <h5 className={styles.mainH_p}>Welcome to our platform, where knowledge meets convenience! </h5>
        </div>
        <div className={"col-lg-2   d-flex justify-content-center  flex-column "+ styles.buttons}>
          <Link
            to="/login"
            className={"btn btn-default-outline my-4 " + styles.mainBtn}
          >
            <i className="fas fa-user" /> Login
          </Link>
          <Link
            to="/allcourses"
            className={"btn btn-default-outline " + styles.mainBtn}
          >
            <i class="fa-solid fa-book"></i> All Courses
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
