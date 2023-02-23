import express from "express";
import {
    getUser,
    createJob,
    getJobs,
    getRentals
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";


const router = express.Router();

router.get("/getuser/", verifyToken, getUser);
router.get("/getjobs/", verifyToken, getJobs);
router.get("/getrentals/", verifyToken, getRentals)
router.post("/createjob/", verifyToken, createJob);

export default router;
