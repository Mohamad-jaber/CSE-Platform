import axios from "axios";
import jwtDecode from "jwt-decode";
import React, { createContext, useEffect, useState } from "react";
import cookie from "react-cookies";
import Loader from "../Loader";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);


  const [courseId, setCourseId] = useState(3);
  const [courseName , setCourseName] =useState('');
  const [courseCate , setCourseCate] =useState(0);

 

  async function getUsers() {
    let { data } = await axios.get(
      "http://localhost:3000/api/v1/auth/allusers",
    );

    setUsers(data.users);
  }

  useEffect(() => {
    const token = cookie.load("token");
    if (token) {
      const decoded = jwtDecode(token);
      setLoggedUser(decoded);
    }
    getUsers();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [users]);

  return (
    <UserContext.Provider
      value={{ loggedUser, setLoggedUser, users, setLoading ,setCourseId  ,courseId ,courseName ,setCourseName ,courseCate ,setCourseCate}}
    >
      {loading ? <Loader /> : children}
    </UserContext.Provider>
  );
};
