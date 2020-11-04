import {Request, Response} from 'express'

export function createPhoto(req:Request, res:Response){
    let photoPath = {path: req.file.path};
    return res.send(photoPath);
}

export function getPhotos(req:Request, res:Response){
    console.log("Guardando foto");
    return res.json({
        message: 'Photo'
    })
}