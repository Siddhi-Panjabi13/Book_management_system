import {bookControllers} from '../controllers/index'
const bookControllersObject=new bookControllers();
import express from 'express';
import { verifyAdmin, verifyToken } from '../middlewares';
const router=express.Router();

router.get('/',[verifyToken],bookControllersObject.getBooksController);
router.get('/searchingFiltering',bookControllersObject.getBooksControllerSearchingFiltering);
router.get('/:id',[verifyToken,verifyAdmin],bookControllersObject.getBookController);
router.post('/',[verifyToken,verifyAdmin],bookControllersObject.createBookController);
router.patch('/:id',[verifyToken,verifyAdmin],bookControllersObject.updateBookController)
router.delete("/:id",[verifyToken,verifyAdmin],bookControllersObject.deleteBookController)
export default router