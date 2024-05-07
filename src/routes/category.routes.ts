import { categoryControllers } from "../controllers/index";
import express from "express";
const router = express.Router();
const categoryControllersObject = new categoryControllers();
import { verifyToken, verifyAdmin } from "../middlewares/index";
router.get(
  "/",
  [verifyToken],
  categoryControllersObject.getCategoriesController
);
router.post(
  "/",
  [verifyToken, verifyAdmin],
  categoryControllersObject.createCategoryController
);
router.get(
  "/:id",
  [verifyToken, verifyAdmin],
  categoryControllersObject.getCategoryController
);
router.patch(
  "/:id",
  [verifyToken, verifyAdmin],
  categoryControllersObject.updateCategoryController
);
router.delete(
  "/:id",
  [verifyToken, verifyAdmin],
  categoryControllersObject.deleteCategoryController
);

export default router;
