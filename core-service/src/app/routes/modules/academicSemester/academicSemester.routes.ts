import express from 'express';
import { AcademicSemeterController } from './academicSemster.controller';
import { AcademicSemesterValidation } from './academicSemster.validation';
import validateRequest from '../../../middlewares/validateRequest';
const router = express.Router();

router.get('/', AcademicSemeterController.getAllFromDB)
router.get('/:id', AcademicSemeterController.getDataById)
router.post(
    '/',
    validateRequest(AcademicSemesterValidation.create),
    AcademicSemeterController.insertIntoDB
)



export const AcademicSemeterRoutes = router;