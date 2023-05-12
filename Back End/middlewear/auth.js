import jwt from "jsonwebtoken";
import connectDB from "../DB/connection.js";
// import { date } from "joi";j
// import prosess


export const auth = () => {
    return async (req, res, next) => {
        try {
            const { authorization } = req.headers;
                // console.log(req.headers);
            if (!(authorization.startsWith(process.env.BearerToken))) {
                res.json({ message: "invalid Bearer Token" });
            } else {
                const token = authorization.split(process.env.BearerToken)[1];
                const decoded = jwt.verify(token, process.env.tokenLogin);
                if (!decoded || !decoded.id || !decoded.isLoggin) {
                    res.json({ message: "invalid token payload" });
                } else {
                    // const user = await userModel.findById(decoded.id).select('email uesrName');

                    connectDB.execute(`SELECT * FROM users where User_ID = ${decoded.id}`, (error, data) => {

                        if (data.length == 0) {
                            res.status(404).json({ message: "not register user" });
                        } else {
                            req.user = data[0];
                            next()
                        }


                    });

                }
            }

        } catch (error) {
            console.log(error);
            console.log(req.headers);
            res.json({ message: "catch error auth", error: error });
        }
    }
}


export const adminAuth = () => {

    return async (req, res, next) => {
        try {
            const { authorization } = req.headers;
            if (!authorization.startsWith(process.env.BearerToken)) {
                res.json({ message: "invalid Bearer Token" });
            } else {
                const token = authorization.split(process.env.BearerToken)[1];
                const decoded = jwt.verify(token, process.env.tokenLogin);
                if (!decoded || !decoded.id || !decoded.isLoggin) {
                    res.json({ message: "invalid token payload" });
                } else {
                    if (decoded.role == 1) {

                        // const user = await userModel.findById(decoded.id).select('email uesrName');
                        connectDB.execute(`SELECT * FROM users where User_ID = ${decoded.id}`, (error, data) => {

                            if (data.length == 0) {
                                res.status(404).json({ message: "not register user" });
                            } else {
                                req.user = data[0];
                                next()
                            }

                        });
                    } else {
                        res.json({ message: "you are not allow to accsess this page " })
                    }

                }
            }

        } catch (error) {
            res.json({ message: "catch error auth", error: error });
        }
    }
}