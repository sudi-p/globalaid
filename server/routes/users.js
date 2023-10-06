import express from "express";
import {
  getUser,
  getTopRentalsJobs,
  createJob,
  createAd,
  getJobs,
  getRentals,
  getMyAds,
  getMyAd,
  getIndividualChat,
  getChats,
  sendChatMessage,
} from "../controllers/users.js";
import { verifyToken, checkIfAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.get("/getuser/", verifyToken, getUser);
router.get("/gettoprentalsjobs/", verifyToken, getTopRentalsJobs);
router.get("/getjobs/",checkIfAuthenticated, getJobs);
router.get("/getrentals/",checkIfAuthenticated, getRentals);
router.get("/createad/", verifyToken, createAd);
router.post("/createad/", verifyToken, createAd);
router.post("/createjob/", verifyToken, createJob);
router.get("/getmyads/", verifyToken, getMyAds);
router.get("/getmyad/", verifyToken, getMyAd);
router.get("/getchats", verifyToken, getChats);
router.get("/getindividualchat", verifyToken, getIndividualChat);
router.post("/sendChatMessage", verifyToken, sendChatMessage);

export default router;
