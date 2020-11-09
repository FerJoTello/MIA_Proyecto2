import { Router } from 'express';
const router = Router();

import multer from '../libs/multer'
import { createPhoto, getPhotos } from '../controllers/photo.controller';
router.route('/photos')
    .post(multer.single('image'), createPhoto)
    .get(getPhotos);

import { login, register } from '../controllers/user.controller';
router.route('/login').post(login);
router.route('/register').post(register);

import { getCategories, getProducts, insertProduct2, getProduct, insertKeyWord } from "../controllers/product.controller";
router.route('/categories').get(getCategories);
router.route('/products').get(getProducts).post(insertProduct2);
router.route('/products/:id').get(getProduct);
router.route('/keywords').post(insertKeyWord);

export default router;
