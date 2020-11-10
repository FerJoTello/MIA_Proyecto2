import { Router } from 'express';
const router = Router();

import { updateProfilePhoto, updateInfo, updatePassword} from '../controllers/user.controller';

router.route('/updateProfilePicture').post(updateProfilePhoto);
router.route('/updateUserInfo').post(updateInfo);
router.route('/updatePassword').post(updatePassword);
export default router;