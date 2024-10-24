import { Router } from "express";
import { assign_coach_to_user } from "../controllers/user.controller.js";


const router = Router();


router.route("/", async (req, res) => {
    return res.json({"message": "hello world"})
})
router.route("/assign_coache").post(assign_coach_to_user)

export default router;