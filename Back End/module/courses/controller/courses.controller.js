import connectDB from '../../../DB/connection.js';
import fs from 'fs';


export const AddCourse = async (req, res) => {

    try {
        const { course_name, course_type, course_description } = req.body;
        connectDB.execute(`SELECT * FROM course where course_name = "${course_name}"`, async (erorr, data) => {
            if (data.length > 0) {
                res.json({ message: "courses already exists" });
            } else {
                connectDB.execute(`INSERT INTO course(course_name, course_description,course_type) VALUES ("${course_name}","${course_description}",${course_type})`, (error, data) => {
                    if (!fs.existsSync(`C:/Users/Mohad/OneDrive/Documents/GG-Project/back-end/uploads/courses/${course_name}`)) {
                        fs.mkdirSync(`C:/Users/Mohad/OneDrive/Documents/GG-Project/back-end/uploads/courses/${course_name}`, { recursive: true });
                        const subFolders = ['exam', 'summary', 'lecture'];
                        for (const subFolder of subFolders) {
                            const subFolderPath = `C:/Users/Mohad/OneDrive/Documents/GG-Project/back-end/uploads/courses/${course_name}/${subFolder}`;
                            fs.mkdirSync(subFolderPath);
                        }
                    }
                    res.json({ message: "add course successfuly", d: data })
                });
            }
        });

    } catch (error) {
        res.json({ message: "catch error", error });
    }
};

export const deleteCourse = async (req, res) => {

    try {
        const { id } = req.params;

        connectDB.execute(`SELECT * FROM course where course_id=${id}`, async (erorr, data) => {
            if (data.length == 0) {
                res.json({ message: "course does not exist or invalid id " });
            } else {
                connectDB.execute(`DELETE FROM course WHERE course_id=${id}`, (erorr) => {
                    if (erorr) {
                        res.json({ message: erorr.sqlMessage });
                    } else {
                        connectDB.execute(`SELECT * FROM course where course_id=${id}`, async (erorr, data) => {
                            if (data.length == 0) {
                                res.json({ message: "delete course successfuly" })
                            } else {
                                res.json({ message: "samething happend , delete course again ." });
                            }
                        });

                    }
                });
            }
        });
    } catch (error) {
        res.json({ message: "catch error", error: error });
    }
};

export const updateCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const { course_name, course_type, course_des } = req.body;
        connectDB.execute(`SELECT * FROM course where course_id=${id}`, async (erorr, data) => {
            if (data.length == 0) {
                res.json({ message: "course does not exist or invalid id " });
            } else {
                connectDB.execute(`SELECT * FROM course where course_name="${course_name}" and course_id <> ${id} `, (erorr, data) => {
                    if (data.length > 0) {
                        res.json({ message: "this course name already exist" });
                    } else {

                        connectDB.execute(`UPDATE course SET course_name="${course_name}",course_description="${course_des}",course_type= ${course_type} where course_id=${id}`, (erorr) => {
                            if (erorr) {
                                res.json({ message: "sql quere erorr", x: erorr.sqlMessage });
                            } else {
                                res.json({ message: "update successfully" });
                            }
                        });
                    }
                });
            }
        });

    } catch (error) {
        res.json({ message: "catch error", error: error });
    }

};

export const addToList = async (req, res) => {
    try {
        const { id } = req.params;
        connectDB.execute(`SELECT * FROM course where course_id=${id}`, async (erorr, data) => {
            if (erorr) {
                res.json({ message: "sql erorr", erorr: erorr });
            } else {
                if (data.length == 0) {
                    res.json({ message: "course does not exist or invalid id " });
                } else {
                    connectDB.execute(`INSERT INTO list(course_id, user_Id) VALUES (${id},${req.user.User_ID})`, (erorr, data) => {
                        if (erorr) {

                            if (erorr.code == "ERR_HTTP_HEADERS_SENT") {
                                res.json({ message: "DVs" });
                            } else if (erorr.code == "ER_DUP_ENTRY") {
                                res.json({ message: "this course already exist in your list" });
                            }
                            res.json({ message: "sql erorr", erorr: erorr });

                        } else {
                            res.json({ message: "added successfully" });

                        }
                    });
                }
            }
        });
    } catch (error) {
        res.json({ message: "catch error add", error: error });
    }
}



export const removeFromList = async (req, res) => {
    try {
        const { id } = req.params;
        connectDB.execute(`SELECT * FROM course where course_id=${id}`, async (erorr, data) => {
            if (erorr) {
                res.json({ message: "sql erorr", erorr: erorr });
            } else {
                if (data.length == 0) {
                    res.json({ message: "course does not exist or invalid id " });
                } else {
                    connectDB.execute(`DELETE FROM list WHERE course_id = ${id} and user_Id = ${req.user.User_ID}`, (erorr, data) => {
                        if (erorr) {
                            res.json({ message: "sql erorr", erorr: erorr });
                        } else {
                            res.json({ message: "remove successfully" });

                        }
                    });
                }
            }
        });
    } catch (error) {
        res.json({ message: "catch error", error: error });
    }
}


export const ListCourses = async (req, res) => {
    // const users = await userModel.find({}).select("name userName email gender");
    connectDB.execute(`SELECT * FROM list where user_Id = ${req.user.User_ID}`, async (erorr, data) => {
        if (erorr) {
            res.json({ message: "sql erorr", erorr: erorr });
        } else if (data.length > 0) {
            res.status(200).json({ message: "success", data });
        } else {
            res.json({ message: "not found" });
        }
    });

};