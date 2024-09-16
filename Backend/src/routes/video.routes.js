import { upload } from "../middleware/multer.middleware.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { Router } from "express";
import {
  getAllVideos,
  publishVideo,
  deleteVideo,
  updateVideo,
  getVideoById,
  publishToggle,
  random
} from "../controllers/video.controller.js"

const router = Router()

router.route("/explore").get(random)
router.route("/").get(random)
router.use(verifyJWT)

router.route("/")
.post(upload.fields([
  {
    name: "video",
    maxCount: 1
  },
  {
    name: "thumbnail",
    maxCount: 1
  },
]),publishVideo)

router.route("/user-video").get(getAllVideos)
router.route("/:videoId").get(getVideoById)
router.route("/delete/:videoId").delete(deleteVideo)

router.route("/toggle/publish/:videoId")
    .patch(publishToggle)
// router.route("/").get(getAllVideos)
router.route("/update").patch(upload.single("video"),updateVideo)

export default router;
