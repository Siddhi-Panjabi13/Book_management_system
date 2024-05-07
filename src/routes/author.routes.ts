import { authorControllers } from "../controllers/index";
import express from "express";
const router = express.Router();
const authorControllersObject = new authorControllers();
import { verifyToken, verifyAdmin } from "../middlewares/index";
router.get("/", [verifyToken], authorControllersObject.getAuthorsController);
router.post(
  "/",
  [verifyToken, verifyAdmin],
  authorControllersObject.createAuthorController
);
router.get(
  "/:id",
  [verifyToken, verifyAdmin],
  authorControllersObject.getAuthorController
);
router.patch(
  "/:id",
  [verifyToken, verifyAdmin],
  authorControllersObject.updateAuthorController
);
router.delete(
  "/:id",
  [verifyToken, verifyAdmin],
  authorControllersObject.deleteAuthorController
);

export default router;
