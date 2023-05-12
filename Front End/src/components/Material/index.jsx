import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from "../UserContext/UserProvider";
import { Breadcrumbs } from 'react-breadcrumbs-dynamic';
import cookie from "react-cookies";
import axios from 'axios';

// const CourseComponent = (props) => {



//     const { courseId } = useContext(UserContext);
//     const { loggedUser, setLoading } = useContext(UserContext);

//     const [course, setCourse] = useState({});
//     const [materials, setMaterials] = useState([]);

//     // useEffect(() => {
//     //     // Fetch course and material data from server-side API using course ID from props
//     //     fetch(`/api/courses/${props.match.params.id}`)
//     //         .then(response => response.json())
//     //         .then(data => {
//     //             setCourse(data.course);
//     //             setMaterials(data.materials);
//     //         })
//     //         .catch(error => console.log(error));
//     // }, [props.match.params.id]);



//     let getMaterial = async () => {
//         setLoading(true);
//         let getToken = cookie.load("token");
//         const AuthStr = `CSE_${getToken}`;
//         let { data } = await axios.delete(`http://localhost:3000/api/v1/material/${courseId}`,

//         );

//         setLoading(false);
//         if(data.message == 'success'){

//         }

//     }

//     return (
//         <div>
//             {/* <p>Course ID: {courseId}</p> */}
//             {/* <Breadcrumbs /> */}
//             <h1>{course.name}</h1>
//             <ul>
//                 {materials.map((material) => (
//                     <li key={material.id}><Link to={material.path}>{material.name}</Link></li>
//                 ))}
//             </ul>


//         </div>
//     );
// }

// export default CourseComponent;



// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

const CourseMaterials = ({ match }) => {
    const [course, setCourse] = useState({});
    const [materials, setMaterials] = useState([]);
    const [breadcrumbs, setBreadcrumbs] = useState([]);


    const { courseId } = useContext(UserContext);
    const { loggedUser, setLoading, courseCate, setCourseCate, courseName } = useContext(UserContext);

    const fetchMaterial = async () => {
        // setLoading(true);
        console.log(courseCate);
        const res = await axios.get(`http://localhost:3000/api/v1/material/${courseId}/${courseCate}`);
        // console.log(res.data);
        setCourse(res.data.course);
        setMaterials(res.data.material);
        setBreadcrumbs(res.data.breadcrumbs);
        // console.log(breadcrumbs);
        setLoading(false);
    };

    useEffect(() => {
        setLoading(true);
        fetchMaterial();
        // getCourse();
        // getmylist();
    }, []);

    useEffect(() => {
        setLoading(false);
    }, [breadcrumbs]);


    const handleDownload = async (id) => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:3000/api/v1/download/material/${id}`, {
                responseType: 'blob' // tell axios to treat the response as a binary blob
            });

            // Create a URL for the blob
            const url = window.URL.createObjectURL(new Blob([response.data]));

            // Create a link element and click it to download the file
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'files.zip');
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    return (
        <div className="container  my-5">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    {breadcrumbs.map((breadcrumb) => (
                        <li
                            key={breadcrumb.label}
                            className={`breadcrumb-item ${breadcrumb.active ? 'active' : ''
                                }`}
                            aria-current={breadcrumb.active ? 'page' : null}
                        >
                            {breadcrumb.active ? (
                                breadcrumb.label
                            ) : (
                                // <Link to={breadcrumb.link} >{breadcrumb.label} lll</Link>
                                <Link to={breadcrumb.link} ><button type="button" class="btn btn-secondary">{breadcrumb.label}</button></Link>
                            )}
                        </li>
                    ))}
                </ol>
            </nav>


                
                <ul class="list-group list-group-flush ">
                    {materials.map((material) => (
                        <li class="list-group-item mb-2 " key={material.material_id}>
                            <p>{material.material_name}</p>
                            <button type="button" class="btn btn-success me-1" onClick={() => handleDownload(material.material_id)}>Download file</button>
                        </li>
                    ))}
                    
                </ul>
            
        </div>
    );
};

export default CourseMaterials;