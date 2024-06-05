import express from "express";
import {
  getUser,
  getTopRentalsJobs,
  getJobs,
  getRentals,
  getMyAd,
  createJob,
  createRental,
  getCreateAd,
  getDashboard,
  skipUploadRentalImages,
  uploadRentalImages,
  postAd,
  postMessage,
  getIndividualChat,
  getChats,
  sendChatMessage,
} from "../controllers/users.controllers.js";
import { verifyToken, checkIfAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.get("/getuser/", verifyToken, getUser);
router.get("/gettoprentalsjobs/", getTopRentalsJobs);
router.get("/getjobs/", checkIfAuthenticated, getJobs);
router.get("/getrentals/", checkIfAuthenticated, getRentals);
router.get("/getdashboard/", verifyToken, getDashboard);
router.get("/createad/", verifyToken, getCreateAd);
router.post("/postad/", verifyToken, postAd);
router.post("/createjob/", verifyToken, createJob);
router.post("/createrental/", verifyToken, createRental);
router.post("/skipuploadrentalimages", verifyToken, skipUploadRentalImages);
router.post("/uploadrentalimages", verifyToken, uploadRentalImages);
router.post("/skipuploadrentalimages", verifyToken, skipUploadRentalImages);
router.post("/postmessage/", verifyToken, postMessage);
router.get("/getmyad/", verifyToken, getMyAd);
router.get("/getchats", verifyToken, getChats);
router.get("/getindividualchat", verifyToken, getIndividualChat);
router.post("/sendChatMessage", verifyToken, sendChatMessage);

export default router;
