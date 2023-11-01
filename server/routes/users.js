import express from "express";
import {
  getUser,
  getTopRentalsJobs,
  createJob,
  getCreateAd,
  postCreateAd,
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
router.get("/gettoprentalsjobs/", getTopRentalsJobs);
router.get("/getjobs/",verifyToken, getJobs);
router.get("/getrentals/",checkIfAuthenticated, getRentals);
router.get("/createad/", verifyToken, getCreateAd);
router.post("/createad/", verifyToken, postCreateAd);
router.post("/createjob/", verifyToken, createJob);
router.get("/getmyads/", verifyToken, getMyAds);
router.get("/getmyad/", verifyToken, getMyAd);
router.get("/getchats", verifyToken, getChats);
router.get("/getindividualchat", verifyToken, getIndividualChat);
router.post("/sendChatMessage", verifyToken, sendChatMessage);

export default router;
