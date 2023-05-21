import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../UserContext/UserProvider';
import styles from "./styles.module.css";

const CourseDetail = ({ match }) => {
    const [course, setCourse] = useState({});
    const { courseId, courseName, courseCate, setCourseCate } = useContext(UserContext);


    const set = (x) => {
        setCourseCate(x);
    }

    return (
        <div className="container  my-5">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/"><button type="button" class="btn btn-secondary">Home</button></Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        {courseName}
                    </li>
                </ol>
            </nav>


        <div className='d-flex'>

            
                <div class="card-body text-center" >
                    <h1>
                        <Link onClick={() => set(0)} to={`/course/${courseId}/detail`}> <i class={`fa-solid fa-folder ` + styles.folder} ></i> </Link>
                    </h1>
                    {/* <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                    <p>Exams</p>
                </div>
            

            
                <div class="card-body text-center" >
                    <h1>
                        <Link onClick={() => set(1)} to={`/course/${courseId}/detail`}> <i class={`fa-solid fa-folder ` + styles.folder} ></i> </Link>
                    </h1>
                    {/* <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                    <p>Summaries</p>
                </div>
            

            
                <div class="card-body text-center" >
                    <h1>
                        <Link onClick={() => set(2)} to={`/course/${courseId}/detail`}> <i class={`fa-solid fa-folder ` + styles.folder} ></i> </Link>
                    </h1>
                    {/* <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                    <p>Lectures</p>
                </div>
            
        </div>

            
            

        </div>
    );
};

export default CourseDetail;


