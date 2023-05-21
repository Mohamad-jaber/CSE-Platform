import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { UserContext } from "../UserContext/UserProvider";
import styles from "./styles.module.css";
import cookie from "react-cookies";
import { toast } from "react-toastify";
import axios, { Axios } from "axios";
import { date } from "joi";



export default function MainPage() {

    let [courses, setcourses] = useState([]);
    const { loggedUser, setLoading } = useContext(UserContext);
    const { courseId, setCourseId , setCourseName} = useContext(UserContext);
    const Navigate = useNavigate();

    let [mylist, setMylist] = useState([]);

    let getCourse = async () => {
        // let getToken = cookie.load("token");
        // const AuthStr = "tariq__".concat(getToken);
        // console.log(AuthStr);

        let { data } = await axios.get("http://localhost:3000/api/v1/auth/allcourses");
        if (data.message === "success") {
            setcourses(data.data);
        }
    };

    let typeofcourse = ["اجباري تخصص", " اجباري جامعه", "اجباري كليه", "اختياري تخصص", "اختياري جامعه"];

    useEffect(() => {
        setLoading(true);
        getCourse();
        getmylist();
    }, []);

    useEffect(() => {
        setLoading(false);
    }, [courses]);

    let addMylist = async (e, id) => {
        e.preventDefault();

        setLoading(true);
        let getToken = cookie.load("token");
        const AuthStr = `CSE_${getToken}`;
        // console.log(AuthStr);
        let { data } = await axios.get(`http://localhost:3000/api/v1/course/addToList/${id}`,
            { headers: { authorization: AuthStr }, }
        );
        setLoading(false);
        if (data.message == "added successfully") {
            toast.success("added successfully!", { autoClose: 2500 });
            getmylist();
            // console.log(id);
            // console.log(mylist);
        } else if (data.message == 'catch error auth') {
            // toast.error("not add");
            toast.error("login first");
            // console.log(data);
        } else {
            toast.error(data.message);

        }


    }


    let removeMylist = async (e, id) => {
        e.preventDefault();

        setLoading(true);
        let getToken = cookie.load("token");
        const AuthStr = `CSE_${getToken}`;
        // console.log(AuthStr);
        let { data } = await axios.delete(`http://localhost:3000/api/v1/course/removeFromList/${id}`,
            { headers: { authorization: AuthStr }, }
        );
        setLoading(false);
        if (data.message == "remove successfully") {
            toast.success("remove successfully", { autoClose: 2500 });
            getmylist();
            // console.log(mylist.includes(id));
        } else {
            toast.error(data.message);
            // console.log(data);
        }
    }


    let getmylist = async () => {
        let arr = [];

        let getToken = cookie.load("token");
        const AuthStr = `CSE_${getToken}`;
        // console.log(AuthStr);

        let { data } = await axios.get(`http://localhost:3000/api/v1/course/mylist`,
            { headers: { authorization: AuthStr }, }
        );

        if (data.message == "success") {
            console.log(data);

            for (let index = 0; index < data.data.length; index++) {
                arr.push(data.data[index].course_id);
            }
            // console.log(arr);
            setMylist(arr);
        }
    }

    const handleCourseClick = (id , name) => {
        setCourseId(id);
        setCourseName(name);
        console.log(courseId);
        goToHome();

    }

    function goToHome() {
        let path = `/course/${courseId}`;
        Navigate(path, { replace: true });
        // window.location.reload();
    }




    return (
        <div className="container  my-5">

            <h1 className={styles.headerText}>All Courses  </h1>

            <div className="d-flex justify-content-center  row mt-3">

                <div className="text-center "><h5>Let's work together to make this course a collaborative and rewarding experience for all of us. </h5>  <p>Add your matetials : <Link to='/submission' class="btn bg-custom text-white">Submit</Link></p> </div>
                <div class="row row-cols-1 row-cols-md-3 g-4">
                    {
                        courses.map((course, index) => {
                            return (
                                <div class="col">
                                    <div class="card" >
                                        <div class="card-body">
                                            <button className="bg-transparent border-0 w-100" onClick={() => handleCourseClick(course.course_id , course.course_name)}>
                                                <h5 class="card-title mb-3">{course.course_name}</h5>

                                                <p class="card-text">{course.course_description}</p>

                                                <span class="badge rounded-pill bg-custom me-2 fs-4">
                                                    {typeofcourse[course.course_type]}
                                                </span>

                                            </button>
                                                <button className="bg-white border-0" type="submit" onClick={mylist.includes(course.course_id) ? (e) => removeMylist(e, course.course_id) : (e) => addMylist(e, course.course_id)}>
                                                    {mylist.includes(course.course_id) ?
                                                        <i class="fa-solid fa-heart fs-1 ms-2"></i>
                                                        :
                                                        <i class="fa-regular fa-heart fs-1 ms-2"></i>}
                                                </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }

                </div>
            </div>


        </div>
    );
}
