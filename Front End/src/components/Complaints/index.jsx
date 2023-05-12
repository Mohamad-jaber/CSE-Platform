import React, { useContext, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { UserContext } from "../UserContext/UserProvider";
import copy from "copy-to-clipboard";
import { toast } from "react-toastify";
import axios from "axios";
import styles from "./styles.module.css";


const Complaint = () => {
    const params = useParams();
    const { setLoading, users } = useContext(UserContext);
    const [user, setUser] = useState(null);
    const [text, setText] = useState("");

    useEffect(() => {
        // const findUserIndex = users.findIndex(
        //   (userElement) => userElement._id === params.id,
        // );
        // setUser(users[findUserIndex]);
    }, []);

    const submitMessage = async (e) => {
        e.preventDefault();
        setLoading(true);
        await axios.post(`http://localhost:3000/api/v1/message/${params.id}`, {
            text,
        });
        setLoading(false);
        setText("");
        toast.success("Message sent successfully!", { autoClose: 2500 });
    };


    return (
        <React.Fragment>
            <div>
                <div className="container text-center py-5 my-5 text-center">
                    <div className="card py-5 mb-5">
                        <a href data-toggle="modal" data-target="#profile">
                            {/* <img src="/assets/images/avatar.png" className="avatar " alt /> */}
                            <i class="fa-solid fa-comment-dots fs-1"></i>
                        </a>
                        <h3 className="py-2">Write Your Complain</h3>
                        <div className="container w-50 m-auto">
                            <form action method="post">

                                <div class="input-group mb-3">


                                    <textarea
                                        className={"form-control px-3 py-2 " + styles.sendMessageBox}
                                        name
                                        id
                                        cols={10}
                                        rows={9}
                                        placeholder="Discreption...."
                                        value={text}
                                        onChange={(event) => setText(event.target.value)}

                                    />
                                </div>


                                <button
                                    className="btn btn-outline-success btn-container mt-3"
                                    onClick={submitMessage}
                                >
                                    <i className="far fa-paper-plane" /> Send
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </React.Fragment>
    );
};

export default Complaint;
