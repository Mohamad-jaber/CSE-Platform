import React, { useContext, useState } from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";
import Mylist from "./components/Mylist";
import AllCourses from "./components/AllCourses";
import Register from "./components/Register";
import NotFound from "./components/NotFound";
import Layout from "./components/Layout";
// import Massages from "./components/Massages";
import VerifyEmail from "./components/VerifyEmail/VerifyEmail";
import { UserContext } from "./components/UserContext/UserProvider";
import Submission from "./components/Submission";
import Complaint from "./components/Complaints";
import SentCode from "./components/SentCode/SentCode";
import ResetPassword from "./components/ResetPassword";
import Dashboard from './components/Dashboard/index';
import Material from './components/Material/index';
import CourseDetail from "./components/CourseDetail";

const PageRouter = () => {
  const { loggedUser } = useContext(UserContext);
  

  return (
    <Routes>
      <Route element={<Layout />}>
        {loggedUser ? (
          <>
            <Route path="mylist" element={<Mylist showMessage={true} />} />
            {/* <Route path="Massages" element={<Massages />} /> */}
            <Route path="/allcourses" element={<AllCourses showMessage={true}  />}/>
            <Route path="/submission" element={<Submission />} /> 
            <Route path="/complaint" element={<Complaint />} /> 
            <Route path="/dashboard" element={<Dashboard />} /> 
            <Route path="/material" element={<Material />} /> 
            <Route path="/" element={<AllCourses showMessage={true}  />}/>
          </>
        ) : (
          <>
            <Route index element={<Home />} />
            {/* <Route path="/findUser" element={<Mylist showMessage={true} />} /> */}
            <Route path="/allcourses" element={<AllCourses showMessage={true}  />}/>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="/submission" element={<Submission />} /> 

            <Route path="/verifyEmail" element={<VerifyEmail />} />
            <Route path="/SentCode" element={<SentCode />} />
            <Route path="/ForgetPassword" element={<ResetPassword />} />
          </>
        )}
        
        <Route  path="/course/:id" element={<CourseDetail />} />
        <Route  path="/course/:id/detail" element={<Material />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default PageRouter;
