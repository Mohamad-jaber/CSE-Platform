import connectDB from "../../../DB/connection.js";
import { myMulter, validationTypes } from "../../../service/multer.js";


export const addSubmission = async (req, res) => {
    try {
        let arr = req.hello;
        let subid;
        
        connectDB.execute(`INSERT INTO submission(submission_status,submission_description,User_id) VALUES (1,"${req.body.desc}",${req.user.User_ID})`, (error, data) => {
            if (error) {
                res.json({ message: "sql error", error: error });
            } else{
                arr.map((a, INDEX) => {
                    connectDB.execute(`INSERT INTO material ( material_name , category , path, course_id, submission_id ,material_description) VALUES("${a.name}",${a.type},"${(a.path).replaceAll("\\", "/")}",${req.params.course_id},${data.insertId}, "exam year:${req.body.examYear} , semesterName:${req.body.semesterName} , dr-Name :${req.body.drName} ,studentName: ${req.body.studentName
                        }")`, (error, data) => {
                            if (error) {
                                res.json({ message: "sql error", error: error });
                            } else{
                            }
                        })
                    });
                    
                }
                //0 exam , 1 Summary , 3 lecture 
                res.json({ message: "success"  });
                
            
        });

        


    } catch (error) {
        res.json({ message: "catch error hh", error: error });

    }
}

export const acceptSubmission = async (req, res) => {
    try {
        const id = req.params.sub_id;
        connectDB.execute(`SELECT * FROM submission where submission_id = ${id}`, (error, data) => {
            if (error) {
                res.json({ message: "sql error", e: error });
            } else {
                if (data.length > 0) {
                    connectDB.execute(`UPDATE material SET material_status= 1 WHERE submission_id=${id}`, (error, data) => {
                        if (error) {
                            res.json({ message: "sql error", e: error });
                        } else {
                            connectDB.execute(`UPDATE submission SET submission_status= 2 WHERE submission_id= ${id}`, (error, data) => {
                                if (error) {
                                    res.json({ message: "sql error", e: error });

                                } else {
                                    res.json({ message: "success" })
                                }
                            })
                        }
                    });
                } else {
                    res.json({ message: "invalid id " })
                }

            }
        })
    } catch (error) {
        res.json({ message: "catch error hh", error: error });
    }
}


export const rejectSubmission = async (req, res) => {
    try {
        const id = req.params.sub_id;
        connectDB.execute(`SELECT * FROM submission where submission_id = ${id}`, (error, data) => {
            if (error) {
                res.json({ message: "sql error", e: error }); c
            } else {
                if (data.length > 0) {
                    connectDB.execute(`UPDATE material SET material_status= 0 WHERE submission_id=${id}`, (error, data) => {
                        if (error) {
                            res.json({ message: "sql error", e: error });

                        } else {
                            connectDB.execute(`UPDATE submission SET submission_status= 0 WHERE submission_id= ${id}`, (error, data) => {
                                if (error) {
                                    res.json({ message: "sql error", e: error });
                                } else {
                                    res.json({ message: "success" });
                                }
                            })
                        }
                    });
                } else {
                    res.json({ message: "invalid id " });

                }
            }
        })
    } catch (error) {
        res.json({ message: "catch error hh", error: error });
    }
}


export const getAllSubmission = async (req, res) => {
    try {
        connectDB.execute(`SELECT submission_id,submission_date,submission_status,submission_description,User_id,user_name FROM submission NATURAL JOIN users `, (error, data) => {
            if (error) {
                res.json({ message: "sql error", e: error });
            } else {
                res.json({ message: "success", data: data });
            }
        })


    } catch (error) {
        res.json({ message: "catch error hh", error: error });

    }
}


