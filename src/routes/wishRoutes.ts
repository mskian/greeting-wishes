import { Router } from "express";
import { getInputPage, getWishPage, CreateImage, downloadImageHandler } from "../controllers/wishController";
import { validateName } from "../middlewares/validation";

const router = Router();

router.get("/", getInputPage);
router.get("/:name", validateName, getWishPage);
router.get("/nt/:nt", CreateImage);
router.get("/dl/:dl", downloadImageHandler);

export default router;
