import fs from 'fs-extra'
import path from 'path'
import { dirname } from 'path'
import { Router } from "express";
import connectDB from '../DB/connection.js'
import archiver from 'archiver';




const router = Router();

router.get('/:id', (req, res) => {
    connectDB.execute(`SELECT path FROM material WHERE submission_id = ${req.params.id}`, (error, data) => {
        if (error) {
            res.json({ message: "Sql error", e: error });
        } else {
            const paths = data.map(row => row.path);

            const archive = archiver('zip', {
                zlib: { level: 9 } // set the compression level to 9 (maximum)
            });

            // Pipe the archive to the response object
            res.setHeader('Content-Type', 'application/zip');
            res.setHeader('Content-Disposition', 'attachment; filename="files.zip"');
            archive.pipe(res);

            // Add each file to the archive
            for (const filePath of paths) {
                const fileStream = fs.createReadStream(filePath);
                archive.append(fileStream, { name: path.basename(filePath) });
            }

            // Finalize the archive
            archive.finalize();
        }
    });
});


router.get('/material/:id', (req, res) => {
    connectDB.execute(`SELECT path FROM material WHERE material_id = ${req.params.id}`, (error, data) => {
        if (error) {
            res.json({ message: "Sql error", e: error });
        } else {
            const paths = data.map(row => row.path);

            const archive = archiver('zip', {
                zlib: { level: 9 } // set the compression level to 9 (maximum)
            });

            // Pipe the archive to the response object
            res.setHeader('Content-Type', 'application/zip');
            res.setHeader('Content-Disposition', 'attachment; filename="files.zip"');
            archive.pipe(res);

            // Add each file to the archive
            for (const filePath of paths) {
                const fileStream = fs.createReadStream(filePath);
                archive.append(fileStream, { name: path.basename(filePath) });
            }

            // Finalize the archive
            archive.finalize();
        }
    });
})



export default router;