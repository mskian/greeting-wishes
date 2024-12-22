import { Router } from "express";
import { getInputPage, getWishPage } from "../controllers/wishController";
import { validateName } from "../middlewares/validation";

const router = Router();

router.get("/", getInputPage);
router.get("/:name", validateName, getWishPage);

export default router;
