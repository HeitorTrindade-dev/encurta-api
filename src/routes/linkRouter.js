import { Router } from "express";
import { LinkController } from "../controllers/linkController.js";

const router = Router();
const linkController = new LinkController();

router.post("/link", linkController.createLink.bind(linkController));

export default router;