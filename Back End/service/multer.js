import multer from 'multer'
import { nanoid } from 'nanoid'
import fs from 'fs-extra'
import path from 'path'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import connectDB from '../DB/connection.js'
import { error } from 'console'


const __dirname = dirname(fileURLToPath(import.meta.url));


let full = path.join(__dirname, `../uploads/`);
let filename = [];

// let uploadfile = [];

export const DetectError = (err, req, res, next) => {

    if (err) {
        res.status(400).json({ message: "Multer Error:", err: err });

    } else {
        next();
    }

}

export const getPath = () => {
    return async (req, res, next) => {
        await connectDB.execute(`select course_name from course where course_id=${req.params.course_id}`, async (error, data) => {
            if (error) {
                res.json({ message: "sql remove", e: error })
            } else {

                let uploadfile = [];
                let sourcePath = full + '/genaral/';
                let destinationPath;
                // console.log(req.params.folder)
                if (req.params.folder == 'lecture' || req.params.folder == 'summary') {
                    destinationPath = `${full}courses\\${data[0].course_name}\\${req.params.folder}`;
                } else {
                    destinationPath = `${full}courses\\${data[0].course_name}\\${req.params.folder}\\${req.body.type}`;
                }
                filename.map((fileName, index) => {
                    let destination = `${destinationPath}\\${fileName}`;
                    let source = `${sourcePath}\\${fileName}`

                    if (fs.existsSync(destination)) {
                        let count = 1;
                        let newFilename = `${fileName.split('.')[0]}_${count}.${fileName.split('.')[1]}`;
                        destination = `${destinationPath}\\${newFilename}`;
                        while (fs.existsSync(destination)) {
                            count++;
                            newFilename = `${fileName.split('.')[0]}_${count}.${fileName.split('.')[1]}`;
                            destination = `${destinationPath}\\${newFilename}`;

                        }

                        fs.rename(source, destination, (err) => {
                            if (err) {
                                res.json({ e: err, f: destinationPath })
                            } else {
                                console.log('Folder moved successfully' + " " + destinationPath);
    
                                // next()
                            }
                        });

                        fileName=newFilename;
                    }else{

                        fs.rename(source, destination, (err) => {
                            if (err) {
                                res.json({ e: err, f: destinationPath })
                            } else {
                                console.log('Folder moved successfully' + " " + destinationPath);
    
                                // next()
                            }
                        });
                    }


                    let t;
                    if (req.params.folder == 'exam') t = 0;
                    else if (req.params.folder == 'lecture') t = 1;
                    else if (req.params.folder == 'summary') t = 2;
                    uploadfile.push({
                        "path": destination,
                        "name": fileName,
                        "type": t
                    });

                });
                filename = [];

                req.hello = uploadfile;
                next();
            }
        })
    }
}

export const validationTypes = {
    // image: ['image/jpeg', 'image/png', 'image/jpg'],
    type: ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'video/mp4', 'video/webm', 'video/ogg']
}

export function myMulter(customValidation) {

    let customePath = 'genaral'


    const fullPath = path.join(__dirname, `../uploads/${customePath}`)
    // full=fullPath;
    console.log(fullPath);
    if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath)
    }

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `uploads/${customePath}`)
        },
        filename: function (req, file, cb) {
            filename.push(file.originalname);
            cb(null, file.originalname);
        }
    })

    function fileFilter(req, file, cb) {
        if (customValidation.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb('invalid image format', false);
        }
    }

    const upload = multer({
        dest: fullPath, limits: {
            fileSize: 1000000000  // set the maximum file size to 1gb
        }, fileFilter, storage
    });
    return upload;



}