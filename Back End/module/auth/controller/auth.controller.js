// import { userModel } from "../../../DB/model/user.model.js";
import connectDB from "../../../DB/connection.js"
import bcrypt from "bcrypt";
import { myEmail } from "../../../service/nodemailerEmail.js";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";




export const signup = async (req, res) => {
  try {
    const { email, password, userName } = req.body;

    connectDB.execute(`SELECT * FROM users where email= "${email}"`, (erorr, data) => {
      if (data.length > 0) {
        res.json({ message: "Email already exists" });
      } else {
        bcrypt.hash(password, 5, async (error, hash) => {
          // const newUser = new userModel({ email, password: hash, userName });
          // const saveUser = await newUser.save();
          let user_id;
          connectDB.execute(`INSERT INTO users( user_name, email, password, user_type, Confirmation_status) VALUES ("${userName}","${email}","${hash}",0,0)`);
          connectDB.execute(`SELECT * FROM users where email="${email}" `, (erorr, data) => {
            user_id = data[0].User_ID;
          })
          let token = jwt.sign(
            { email, id: user_id },
            process.env.tokenEmailSignatuer,
            { expiresIn: 60 * 60 },
          );
          let reftoken = jwt.sign(
            { email, id: user_id },
            process.env.tokenEmailSignatuer,
          );
          let link = `${req.protocol}://${req.headers.host}${process.env.BASEURL}/auth/verify/${token}`;
          let link2 = `${req.protocol}://${req.headers.host}${process.env.BASEURL}/auth/reguestEmailToken/${reftoken}`;
          // let message = `<a href="${link}" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">verify email</a>
          // `;
          const message = `<a href="${link}" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px; background-color: #1a82e2; margin: 1rem 0;">verify email</a>
              <br />
                  <a href="${link2}" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px; background-color: #1a82e2;">Request New Confirmation Email</a>
              `;
          await myEmail({
            email,
            token,
            message,
            emailPurpose: "confirm your email address",
          });
          // await myEmail({ email, token, message });
          res.status(201).json({ message: "success signup" });
        });
      }


    })


  } catch (error) {
    res.status(500).json({ message: "catch error", error });
  }
};


export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;


    connectDB.execute(`SELECT * FROM users where email= "${email}"`, async (erorr, data) => {
      // const user = await userModel.findOne({ email });
      if (data.length == 0) {
        res.json({ message: "email not exist" });
      } else {
        const match = await bcrypt.compare(password, data[0].password);
        if (!match) {
          res.json({ message: "password incorrect" });
        } else {
          if (data[0].Confirmation_status == 0) {
            res.json({ message: "plz confirm your email" });
          } else {
            const loginToken = jwt.sign(
              { name: data[0].user_name, id: data[0].User_ID, isLoggin: true , role:data[0].user_type },
              process.env.tokenLogin,
            );
            res.json({ message: "success", loginToken });
          }
        }
      }


    })



  } catch (error) {
    res.json({ message: "catch error", errror });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    jwt.verify(token, "jsonemailconfirm", async (error, decoded) => {
      // let user = await userModel.findOne({ email: decoded.email });


      connectDB.execute(`SELECT * FROM users where email= "${decoded.email}"`, async (erorr, data) => {
        if (data.length > 0) {

          connectDB.execute(`UPDATE users SET Confirmation_status = 1 where User_ID = ${data[0].User_ID}`);

          res.json({ message: "done verify your email" });
        } else {
          res.jsno({ message: "your email not found" });
        }


      })
    });
  } catch (error) {
    res.json({ message: "error catch", error });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.tokenEmailSignatuer);

    connectDB.execute(`SELECT * FROM users where email= "${decoded.email}" `, async (erorr, data) => {

      // console.log(decoded.id);
      if (data.length == 0) {
        res.json({ message: "not register account" });
      } else {
        if (data[0].Confirmation_status == 1) {
          res.json({ message: "Already Confirmed" });
        } else {
          let email = data[0].email;
          let id = data[0].User_ID;
          let token = jwt.sign(
            { email, id: id },
            process.env.tokenEmailSignatuer,
            { expiresIn: 60 * 2 },
          );
          let link = `${req.protocol}://${req.headers.host}${process.env.BASEURL}/auth/verify/${token}`;
          const message = `<a href="${link}" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px; background-color: #1a82e2;">verify email</a>`;
          await myEmail({
            email,
            token,
            message,
            emailPurpose: "confirm your email address",
          });
          // let message = `<a href="${link}" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">verify email</a>`;
          // await myEmail({ email, token, message });
          res.json({ message: "success" });
        }
      }

    });
  } catch (error) { }
};

export const sendCode = async (req, res) => {
  const { email } = req.body;
  connectDB.execute(`SELECT * FROM users where email= "${email}" `, async (erorr, data) => {
    if (data.length == 0) {
      res.json({ message: "not register account" });
    } else {
      const accessCode = nanoid();
      // await userModel.findByIdAndUpdate(user._id, { code: accessCode });
      connectDB.execute(`UPDATE users SET code = "${accessCode}" where email="${email}"`);
      const message = ` <p style="font-size: 1.3rem;display: flex; flex-direction: column; gap: 10px; margin-top: 30px;"><span>Access code:</span><span style="border: 1px solid #1a82e2; padding: 10px 20px; color: #1a82e2;">${accessCode}</span></p>`;
      await myEmail({
        email,
        message,
        emailPurpose: "Access Code to change your password",
      });

      // let message = `<h2>access code : ${accessCode}</h2>`;
      // await myEmail({ email, message });
      res.json({ message: "success" });
    }

  });

};

export const forgetPassword = async (req, res) => {
  const { email, code, password } = req.body;
  // const user = await userModel.findOne({ email, code });

  connectDB.execute(`SELECT * FROM users where email= "${email}" and code = "${code}" `, async (erorr, data) => {
    if (data.length == 0) {
      res.json({ message: "In-valid account or In-valid OTP Code" });
    } else {
      bcrypt.hash(password, 8, async function (err, hash) {
        connectDB.execute(`UPDATE users SET password = "${hash}" where User_ID= ${data[0].User_ID} `);
        res.json({ message: "success" });
      });
    }

  });
};

export const allCourses = async (req, res) => {
  // const users = await userModel.find({}).select("name userName email gender");
  connectDB.execute(`SELECT * FROM course `, async (erorr, data) => {
    if (data.length>0) {
      res.status(200).json({ message: "success", data });
    } else {
      res.status(404).json({ message: "not found" });
    }
  });

};


