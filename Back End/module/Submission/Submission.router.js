import { Router } from "express";
import { adminAuth, auth } from "../../middlewear/auth.js";
import { DetectError, getPath, myMulter, validationTypes } from "../../service/multer.js";
import { acceptSubmission, addSubmission, getAllSubmission, rejectSubmission } from './controller/Submission.controller.js';

const router = Router();

router.post('/addSubmission/:course_id/:folder',auth(),myMulter(validationTypes.type).array('file'),DetectError,getPath(),addSubmission);
router.get('/accept/:sub_id',adminAuth(),acceptSubmission);
router.get('/reject/:sub_id',adminAuth(),rejectSubmission);
router.get('/',adminAuth(),getAllSubmission);


export default router;