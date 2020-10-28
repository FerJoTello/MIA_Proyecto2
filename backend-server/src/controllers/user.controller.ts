import {Request, Response} from 'express'
import OracleDB from 'oracledb';
import { connection } from '../oracle'


export async function login(req:Request, res:Response) {
    let email = req.body.email;
    let pass = req.body.password;
    let query = `SELECT * FROM USUARIO WHERE correo_electronico = '${email}' AND contrasena = '${pass}'`;
    let result:OracleDB.Result<any> = await connection.execute(query);
    try {
        if (result.rows){
            let response = {
                email: result.rows[0][0],
                firstName: result.rows[0][2],
                lastName: result.rows[0][3],
                birthDate: result.rows[0][4],
                country: result.rows[0][5],
                imgFile: result.rows[0][6]
            }
            res.json(response);
        }
    } catch (err) {
        res.send(null);
    }
}

export async function register(req:Request, res:Response) {
    let email = req.body.email;
    let pass = req.body.password;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let birthday = req.body.birthday;
    let country = req.body.country;
    let query = `INSERT INTO USUARIO(correo_electronico,contrasena,nombre,apellido,fecha_nac,pais,tipo) VALUES('${email}','${pass}','${firstName}','${lastName}',DATE '${birthday}', '${country}',2)`;
    let result = await connection.execute(query);
    console.log(result);
    return res.send("Termino");
}