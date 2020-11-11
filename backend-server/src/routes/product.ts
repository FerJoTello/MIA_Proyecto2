import { Router } from 'express';
const router = Router();


import { getProducts, insertProduct2, getSpecificProduct } from "../controllers/product.controller";

router.route('').get(getProducts).post(insertProduct2);
router.route('/:id').get(getSpecificProduct);

import { newProductRequest } from '../controllers/cart.controller';
router.route('/addToCart').post(newProductRequest);

export default router;