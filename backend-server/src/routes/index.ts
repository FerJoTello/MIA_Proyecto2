import { Router } from 'express';
const router = Router();

import photos from './photos'
router.use('/photos', photos);

import user from './user'
router.use('/user', user);

import product from './product';
router.use('/products', product);

import { getCategories } from '../controllers/product.controller';
router.route('/categories').get(getCategories);

import { login, register } from '../controllers/user.controller';
router.route('/login').post(login);
router.route('/register').post(register);

import { insertKeyWord } from "../controllers/product.controller";
router.route('/keywords').post(insertKeyWord);

export default router;
