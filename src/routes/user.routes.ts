import { userControllers } from "../controllers/index";
import express from 'express';
const router = express.Router();
const userControllersObject = new userControllers();
import { verifyToken,verifyAdmin } from "../middlewares/index";
router.get('/',[verifyToken,verifyAdmin], userControllersObject.getUsersController);
router.post('/',userControllersObject.createUserController);
router.post('/login',userControllersObject.loginUserController);
router.post('/logout',[verifyToken],userControllersObject.logoutUserController);
router.get('/getById',[verifyToken,verifyAdmin],userControllersObject.getUserController);
// router.patch('/:id',[verifyToken,verifyAdmin],userControllersObject.updateUserController);
export default router