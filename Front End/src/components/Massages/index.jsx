import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import cookie from "react-cookies";
import { toast } from "react-toastify";
import { shareProfile } from "../Submission";
import { UserContext } from "../UserContext/UserProvider";
import "./style.css";

const Massages = () => {

  let [messages, setMessages] = useState([]);
  const { loggedUser, setLoading } = useContext(UserContext);

  let getMessage = async () => {
    let getToken = cookie.load("token");
    const AuthStr = "tariq__".concat(getToken);
    console.log(AuthStr);

    let { data } = await axios.get("http://localhost:3000/api/v1/message/", {
      headers: { authorization: AuthStr },
    });
    if (data.message === "success") setMessages(data.messageList);
  };

  useEffect(() => {
    setLoading(true);
    getMessage();
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [messages]);

  const deleteMessage = async (e, index) => {
    e.preventDefault();

    let getToken = cookie.load("token");
    const AuthStr = "tariq__".concat(getToken);

    setLoading(true);
    let { data } = await axios.delete(
      `http://localhost:3000/api/v1/message/${messages[index]._id}`,
      { headers: { authorization: AuthStr } },
      { params: { authorization: AuthStr } },
    );

    if (data.message !== "success") {
      toast.error("Message wasn't deleted, something went wrong!");
    } else toast.success("Message Deleted Successfully!");
    getMessage();
    console.log(data);
    setLoading(false);
  };

  return (
    <>
      <div>
        <div className="container text-center py-5 my-5 text-center">
          <div className="card pt-5">
            <a href data-toggle="modal" data-target="#profile">
              <img src="/assets/images/avatar.png" className="avatar " alt="" />
            </a>
            <h3 className="py-2">{loggedUser.name}</h3>
            <button
              data-toggle="modal"
              data-target="#share"
              className="btn btn-default-outline share "
              onClick={(e) =>
                shareProfile(
                  e,
                  `${window.location.origin}/messageUser/${loggedUser.id}`,
                )
              }
            >
              <i className="fas fa-share-alt" /> Share Profile
            </button>
          </div>
        </div>
        <h2 className="masage">
          Messages <i className="fa-regular fa-envelope"></i>
        </h2>
        <div className="messagesContainer">
          {messages.length ? (
            <>
              {messages.map((message, index) => {
                return (
                  <div className="messageBox">
                    <p className="messageText">{message.text}</p>
                    <button
                      type="submit"
                      onClick={(e) => deleteMessage(e, index)}
                      className="btn btn-outline-danger"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                );
              })}
            </>
          ) : (
            <h4>You don't have any messages...</h4>
          )}
        </div>
      </div>
    </>
  );
};
export default Massages;
