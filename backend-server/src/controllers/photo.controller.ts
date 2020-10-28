import {Request, Response} from 'express'

export function createPhoto(req:Request, res:Response){
    console.log("Saved photo");
    return res.json({
        message: 'Photo'
    })
}

export function getPhotos(req:Request, res:Response){
    console.log("Guardando foto");
    return res.json({
        message: 'Photo'
    })
}