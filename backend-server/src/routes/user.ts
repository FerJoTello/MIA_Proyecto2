import { Router } from 'express';
const router = Router();

import { updateProfilePhoto, updateInfo, updatePassword, updateCredits } from '../controllers/user.controller';

router.route('/updateProfilePicture').post(updateProfilePhoto);
router.route('/updateUserInfo').post(updateInfo);
router.route('/updatePassword').post(updatePassword);

router.route('/credits').post(updateCredits);

import { getCart, confirmRequest, cleanCart } from '../controllers/cart.controller';
router.route('/cart/:email').get(getCart);
router.route('/cart').post(confirmRequest);
router.route('/cleanCart').post(cleanCart);

export default router;