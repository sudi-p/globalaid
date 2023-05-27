import express from "express";
import {
  getUser,
  createJob,
  createAd,
  getJobs,
  getRentals,
  getMyAds,
  getMyAd
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/getuser/", verifyToken, getUser);
router.get("/getjobs/", verifyToken, getJobs);
router.get("/getrentals/", verifyToken, getRentals);
router.get("/createad/", verifyToken, createAd);
router.post("/createad/", verifyToken, createAd);
router.post("/createjob/", verifyToken, createJob);
router.get("/getmyads/", verifyToken, getMyAds);
router.get("/getmyad/", verifyToken, getMyAd);

export default router;
