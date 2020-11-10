import { Router } from 'express';
const router = Router();

import { storeProductPhoto, storeProfilePhoto } from '../libs/multer'
import { createPhoto, getPhotos } from '../controllers/photo.controller';
router.route('/product')
    .post(storeProductPhoto.single('image'), createPhoto)
    .get(getPhotos);

router.route('/profile')
    .post(storeProfilePhoto.single('image'), createPhoto)

export default router;