import { Request, Response } from 'express'
import OracleDB from 'oracledb';
import { connection } from '../oracle'


export async function login(req: Request, res: Response) {
    let email = req.body.email;
    let pass = req.body.password;
    let query = `SELECT * FROM USUARIO WHERE correo_electronico = '${email}' AND contrasena = '${pass}'`;
    let result: OracleDB.Result<any> = await connection.execute(query);
    try {
        if (result.rows) {
            let response = {
                email: result.rows[0][0],
                firstName: result.rows[0][2],
                lastName: result.rows[0][3],
                birthDate: result.rows[0][4],
                country: result.rows[0][5],
                imgFile: result.rows[0][6],
                type: result.rows[0][7],
                credits: result.rows[0][8]
            }
            res.json(response);
        }
    } catch (err) {
        res.send(null);
    }
}

export async function register(req: Request, res: Response) {
    let email = req.body.email;
    let pass = req.body.password;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let birthDate = req.body.birthDate;
    let country = req.body.country;
    let query = `INSERT INTO USUARIO(correo_electronico,contrasena,nombre,apellido,fecha_nac,pais,tipo,creditos) VALUES('${email}','${pass}','${firstName}','${lastName}',DATE '${birthDate}','${country}',2,10000)`;
    console.log(query);
    try {
        let result: OracleDB.Result<any> = await connection.execute(query, [], { autoCommit: true });
        if (result.rowsAffected) {
            res.send(result);
        } else {
            res.status(400).send('Bad Request')
        }
    } catch (error) {
        res.status(400).send("Ese usuario ya existe");
    }
}

export async function updateProfilePhoto(req: Request, res: Response) {
    let email = req.body.email;
    let path = req.body.path;
    let query = `UPDATE USUARIO SET foto_perfil = '${path}' WHERE correo_electronico='${email}'`;
    console.log(query);
    let result: OracleDB.Result<any> = await connection.execute(query, [], { autoCommit: true });
    if (result.rowsAffected) {
        res.send(result);
    } else {
        res.status(400).send('Bad Request')
    }
}

export async function updateInfo(req: Request, res: Response) {
    let email = req.body.email;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let birthDate = req.body.birthDate;
    let country = req.body.country;
    let query = `UPDATE USUARIO SET nombre = '${firstName}', apellido = '${lastName}', pais = '${country}', fecha_nac = TO_DATE('${birthDate}', 'MONTH DD, YYYY') WHERE correo_electronico = '${email}'`;
    try {
        let result: OracleDB.Result<any> = await connection.execute(query, [], { autoCommit: true });
        if (result.rowsAffected) {
            res.send({ data: "Datos actualizados" });
        } else {
            res.send({ data: "No se hicieron cambios" });
        }
    } catch (error) {
        res.statusCode = 500;
        res.statusMessage = error;
        res.send();
    }
}

export async function updatePassword(req: Request, res: Response) {
    let email = req.body.email;
    let password = req.body.password;
    let query = `UPDATE USUARIO SET contrasena = '${password}' WHERE correo_electronico = '${email}'`;
    console.log(query);
    try {
        let result: OracleDB.Result<any> = await connection.execute(query, [], { autoCommit: true });
        if (result.rowsAffected) {
            res.send({ data: "Datos actualizados" });
        } else {
            res.send({ data: "No se hicieron cambios" });
        }
    } catch (error) {
        res.statusCode = 500;
        res.statusMessage = error;
        res.send();
    }
}

export async function updateCredits(req: Request, res: Response) {
    let binds = req.body.array;
    let query =
        `BEGIN
            actualiza_creditos(:email,:creditsToModify);
        END;`
    try {
        let result: OracleDB.Result<any> = await connection.executeMany(query, binds, { autoCommit: true });
        if (result.rowsAffected) {
            res.json({ message: "Actualizados correctamente" });
        } else {
            res.json({ message: "No se actualizó" })
        }
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}