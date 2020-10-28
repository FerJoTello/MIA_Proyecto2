import { Router } from 'express';
const router = Router();

import multer from '../libs/multer'
import { createPhoto, getPhotos } from '../controllers/photo.controller';
router.route('/photos')
    .post(multer.single('image'), createPhoto)
    .get(getPhotos);

import { login, register } from '../controllers/user.controller';
router.route('/login').post(login);
router.route('/register').post(register)

export default router;
