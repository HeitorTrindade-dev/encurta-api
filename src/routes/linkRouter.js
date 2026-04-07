import { Router } from "express";
import { LinkController } from "../controllers/linkController.js";

const router = Router();
const linkController = new LinkController();

router.post("/", linkController.createLink.bind(linkController));
router.get("/links", linkController.getAllLinks.bind(linkController));
router.get("/links/:code", linkController.getLink.bind(linkController));
router.get("/:code", linkController.getUrl.bind(linkController));

export default router;