import multer from 'multer';
import { uuid } from 'uuidv4';
import path from 'path'

const productStorage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, uuid() + path.extname(file.originalname));
    }
})

const profileStorage = multer.diskStorage({
    destination: 'profile',
    filename: (req, file, cb) => {
        cb(null, uuid() + path.extname(file.originalname));
    }
})


export var storeProductPhoto = multer({ storage: productStorage });

export var storeProfilePhoto = multer({ storage: profileStorage });