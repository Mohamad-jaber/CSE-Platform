import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { UserContext } from "../UserContext/UserProvider";
import copy from "copy-to-clipboard";
import { toast } from "react-toastify";
import cookie from "react-cookies";
import axios from "axios";
import styles from "./styles.module.css";


const Submission = () => {
  let [courses, setcourses] = useState([]);

  const Navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const { loggedUser } = useContext(UserContext);

  const [selectedOne, setSelectedOne] = useState("none");
  const [selectedTwo, setSelectedTwo] = useState("none");
  const [selectedThree, setSelectedThree] = useState("none");
  const [yearExam, setYearExam] = useState('');
  const [Semester, setSemester] = useState('');
  const [DrName, setDrName] = useState('');
  const [StudentName, setStudentName] = useState('');

  const params = useParams();
  const { setLoading, users } = useContext(UserContext);
  const [text, setText] = useState("");
  const [yearOptions, setYearOptions] = useState([]);
  // const yearOptions = [];

  useEffect(() => {
    setLoading(true);
    getCourses();
    // getmylist();
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [courses]);

  const getCourses = async () => {

    let { data } = await axios.get("http://localhost:3000/api/v1/auth/allcourses");
    if (data.message === "success") {
      setcourses(data.data);
      // console.log(data.data);
    }


    if (loggedUser) {
      if (loggedUser.role == 1) {
        let path = "/";
        Navigate(path, { replace: true });
        toast.error("you are not allow to access this page");
      }
    } else {
      let path = "/";
      Navigate(path, { replace: true });
      toast.error("you are not allow to access this page");
    }
  }



  function handleDropdown1Change(event) {
    setSelectedOne(event.target.value);
    if (event.target.value === 'none') {

      setSelectedTwo('none');
      setSelectedThree('none');
    }
  }

  function handleDropdown2Change(event) {
    // console.log(event.target.value);
    setSelectedTwo(event.target.value);
    if (event.target.value === 'none') {

      // setSelectedTwo('none');
      setSelectedThree('none');
    }
    YearSelect();
  }

  function handleDropdown3Change(event) {
    // console.log(event.target.value);
    setSelectedThree(event.target.value);
  }


  function YearSelect() {
    // specify the range of years
    const startYear = 2010;
    const endYear = 2023;
    let y = [];
    // generate the options for the select menu
    for (let year = endYear; year >= startYear; year--) {
      y.push(
        <option value={`${year}-${year + 1}`}>{`${year}-${year + 1}`}</option>
      );
    }
    // console.log(y);
    setYearOptions(y);
  }





  // const handleFileChange = (event) => {
  //   console.log(event.target.files);
  // };

  const [formData, setFormData] = useState({
    file: null
  });

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setFormData({...formData, [name]: value});
  // };


  const handleSubmit = (event) => {
    event.preventDefault();

    setLoading(true);
    let getToken = cookie.load("token");
    const AuthStr = `CSE_${getToken}`;

    const formDataToSend = new FormData();
    formDataToSend.append('examYear', yearExam);
    formDataToSend.append('semesterName', Semester);
    formDataToSend.append('drName', DrName);
    formDataToSend.append('studentName', StudentName);
    formDataToSend.append('desc', text);
    formDataToSend.append('type', selectedThree == 'none' ? "" : selectedThree);
    console.log(formData.file);
    if (formData.file != null) {
      for (let i = 0; i < formData.file.length; i++) {
        formDataToSend.append('file', formData.file[i]);
      }

      axios.post(`http://localhost:3000/api/v1/submission/addSubmission/${selectedOne}/${selectedTwo}`
        , formDataToSend, { headers: { authorization: AuthStr }, })
        .then((response) => {
          console.log(response.data);
          // console.log(`http://localhost:3000/api/v1/submission/addSubmission/${selectedOne}/${selectedTwo}`)
          setSelectedOne('none');
          setSelectedThree('none');
          setSelectedTwo('none');
          setLoading(false);
          toast.success('Submission Added  ')


        })
        .catch((error) => {
          console.log(error);
          toast.success(error)

          setLoading(false);

        });
    } else {

      toast.error('please add file')
    }
    // setLoading(false);

  };






  return (
    <React.Fragment>
      <div>
        <div className="container text-center py-5 my-5 text-center">
          <div className="card py-5 mb-5">
            <a href data-toggle="modal" data-target="#profile">
              {/* <img src="/assets/images/avatar.png" className="avatar " alt /> */}
              <i class="fa-solid fa-cloud-arrow-up  fs-1"></i>
            </a>
            <h3 className="py-2">Upload File</h3>


            <div className="container w-50 m-auto">
              <form action method="post">


                <div class="input-group mb-3">
                  <label class="input-group-text" >Course Name</label>
                  <select class="form-select" name="course" onChange={(event) => { handleDropdown1Change(event); }}>
                    <option selected value="none">Choose...</option>
                    {courses.map((c, index) => {
                      return (
                        <option value={`${c.course_id}`}>{c.course_name}</option>
                      );
                    })}

                  </select>
                </div>

                {selectedOne !== "none" && (<div class="input-group mb-3">
                  <label class="input-group-text" >Options</label>
                  <select class="form-select" name="folder" onChange={(event) => { handleDropdown2Change(event) }}>
                    <option selected value="none">Choose...</option>
                    <option value="exam">Exam</option>
                    <option value="summary">Summary</option>
                    <option value="lecture">lecture</option>
                  </select>
                </div>)}

                {selectedTwo === 'exam' && selectedOne !== 'none' && (
                  <div class="input-group mb-3">
                    <label class="input-group-text " >Type of Exam</label>
                    <select class="form-select me-3" name="type" onChange={(event) => { handleDropdown3Change(event) }}>
                      <option selected value="none">Choose...</option>
                      <option value="first">First</option>
                      <option value="secand">Secand</option>
                      <option value="mid">Mid</option>
                      <option value="final">Final</option>
                    </select>


                    <span class="input-group-text" >Year</span>
                    <select class="form-select me-3" name="examYear" onChange={(event) => { setYearExam(event.target.value); }}>
                      <option selected value="none">Choose...</option>
                      {yearOptions.map((y, index) => {
                        return (
                          y
                        );
                      })}
                    </select>

                    <span class="input-group-text" >semester</span>

                    <select class="form-select me-3" name="semesterName" onChange={(event) => { setSemester(event.target.value); }}>
                      <option selected value="none">Choose...</option>
                      <option value="Fall">Fall</option>
                      <option value="spring">spring</option>
                      <option value="summer">summer</option>
                      {/* <option value="Final">Final</option> */}
                    </select>


                  </div>
                )
                }

                {(selectedTwo === 'lecture' || selectedTwo === 'summary') && selectedOne !== 'none' && (
                  <div class="input-group mb-3">

                    <span class="input-group-text" >Lecturer Name</span>
                    <input type="text" class="form-control " onChange={(event) => { setDrName(event.target.value); }} name="drName" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"></input>


                    <span class="input-group-text" >Year</span>
                    <select class="form-select me-3" name="examYear" onChange={(event) => { setYearExam(event.target.value); }}>
                      <option selected value="none">Choose...</option>
                      {yearOptions.map((y, index) => {
                        return (
                          y
                        );
                      })}
                    </select>

                  </div>
                )
                }

                {selectedTwo === 'summary' && selectedOne !== 'none' && (
                  <div class="input-group mb-3">


                    <span class="input-group-text" >Student Name</span>
                    <input type="text" class="form-control" name="studentName" onChange={(event) => { setStudentName(event.target.value); }} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"></input>

                  </div>
                )
                }

                {(selectedTwo === 'summary' || selectedTwo === 'lecture' || (selectedTwo === 'exam' && yearExam != '' && Semester != '')) && selectedOne !== 'none' && (
                  <div class="input-group mb-3">
                    <div class="input-group mb-3 ">
                      <input max="1000000000" type="file" name="file" accept=".pdf,.docx,video/*" multiple className="form-control mb-3" onChange={(event) => {
                        console.log(event.target.value);
                        setFormData({ file: event.target.files });


                        const file = event.target.files[0];
                        if (file && file.size > 1000000000) {
                          event.target.value = null; // reset the file input
                          document.getElementById('erorr_upload').hidden = false;
                          // alert("File size exceeds 5MB!");
                        } else {
                          document.getElementById('erorr_upload').hidden = true;

                        }
                      }}></input>
                      <div id="erorr_upload" class="alert alert-danger input-group " role="alert" hidden>
                        File size must be less than 1GB.
                      </div>
                    </div>

                    <textarea
                      className={"form-control px-3 py-2 " + styles.sendMessageBox}
                      name="disc"
                      id
                      cols={10}
                      rows={9}
                      placeholder="Description...."
                      value={text}
                      onChange={(event) => setText(event.target.value)}
                    />
                  </div>
                )}

                <button
                  className="btn btn-outline-success btn-container mt-3"
                  onClick={handleSubmit}
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

export default Submission;
