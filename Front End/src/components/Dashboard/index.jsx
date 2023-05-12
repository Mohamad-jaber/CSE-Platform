import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { UserContext } from "../UserContext/UserProvider";
// import styles from "./styles.module.css";
import cookie from "react-cookies";
import { toast } from "react-toastify";
import axios, { Axios } from "axios";
import { date } from "joi";


function Dashboard() {
    let [submission, setSubmission] = useState([]);
    const { loggedUser, setLoading } = useContext(UserContext);
    const [filter, setFilter] = useState(1);
    const Navigate = useNavigate();



    useEffect(() => {
        setLoading(true);
        getSubmission();
    }, []);

    useEffect(() => {
        setLoading(false);
    }, [submission]);

    const getSubmission = async () => {

        let getToken = cookie.load("token");
        const AuthStr = `CSE_${getToken}`;

        let { data } = await axios.get("http://localhost:3000/api/v1/submission/",
            { headers: { authorization: AuthStr }, });
        if (data.message === "success") {
            setSubmission(data.data);
            // console.log(data.data);
        } else if (data.message === "you are not allow to accsess this page ") {
            // toast.error("not add");
            // res.json({});
            let path = "/";
            Navigate(path, { replace: true });
            toast.error(data.message);
            // console.log(data);
        } else {
            toast.error(data.message);

        }
    }


    const AcceptSub = async (id) => {

        let getToken = cookie.load("token");
        const AuthStr = `CSE_${getToken}`;

        setLoading(true);
        let { data } = await axios.get(`http://localhost:3000/api/v1/submission/accept/${id}`,
            { headers: { authorization: AuthStr }, });
        if (data.message === "success") {
            // console.log(data.data);
            toast.success(`Accept success`);

        } else {
            toast.error(data.message);
        }
        setLoading(false);
    }


    const RejectSub = async (id) => {

        let getToken = cookie.load("token");
        const AuthStr = `CSE_${getToken}`;

        setLoading(true);
        let { data } = await axios.get(`http://localhost:3000/api/v1/submission/reject/${id}`,
            { headers: { authorization: AuthStr }, });
        if (data.message === "success") {
            // console.log(data.data);
            toast.success(`reject success`);

        } else {
            toast.error(data.message);
        }
        setLoading(false);
    }



    const handleFilter = (event) => {
        setFilter(event.target.value);
    };


    const [currentPage, setCurrentPage] = useState(1);
    const maxPage = Math.ceil(submission.filter((item) =>
        item.submission_status == filter
    ).length / 10);

    const handleClick = (page) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * 10;
    const endIndex = startIndex + 10;

    const handleDownload = async (id) => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:3000/api/v1/download/${id}`, {
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


    const rows = submission.filter((item) =>
        item.submission_status == filter
    ).slice(startIndex, endIndex).map((sub, index) => (
        <tr key={index}>
            <th scope="row">{sub.submission_id}</th>
            <td>{sub.user_name}</td>
            <td><button type="button" class="btn btn-success me-1" onClick={() => handleDownload(sub.submission_id)}>Download files</button></td>
            <td>{sub.submission_description}</td>
            <td>{sub.submission_status == 0 ? <h5 class="text-danger">Rejected</h5> : sub.submission_status == 1 ? <h5 class="">Pending</h5> : <h5 class="text-success">Accepted</h5>}</td>
            <td>
                <button type="button" class="btn btn-success me-1" onClick={() => AcceptSub(sub.submission_id)}>accept</button>
                <button type="button" class="btn btn-danger" onClick={() => RejectSub(sub.submission_id)}>reject</button>
            </td>
        </tr>
    ));

    const pagination = [];
    for (let i = 1; i <= maxPage; i++) {
        pagination.push(
            <li class="page-item">
                <a class="page-link  " key={i} onClick={() => handleClick(i)}>
                    {i}
                </a>
            </li>
        );
    }








    // return <button onClick={handleClick}>Download Files</button>;




    return (
        <React.Fragment>
            <div>
                <div className="container text-center py-5 my-5 text-center">
                    <div class="input-group mb-3 w-50">
                        <label class="input-group-text w-50" >Choose Status</label>
                        <select class="form-select  w-50" aria-label="Default select example" onChange={(event) => { handleFilter(event) }}>
                            <option selected value={1}>Pending</option>
                            <option value={0}>Rejected</option>
                            <option value={2}>Accepted</option>
                        </select>
                    </div>
                    <table class="table table-bordered border-dark border-1">
                        <thead>
                            <tr>
                                <th scope="col">submission_id</th>
                                <th scope="col">User Name</th>
                                <th scope="col">files</th>
                                <th scope="col">submission_description</th>
                                <th scope="col">submission_status</th>
                                <th scope="col">action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </table>
                    <nav >
                        <ul class="pagination pagination-lg justify-content-center " >
                            {pagination}
                        </ul>
                    </nav>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Dashboard;