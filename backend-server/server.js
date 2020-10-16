const express = require('express');
const oracledb = require('oracledb');
const app = express();
let connection;

// revisa si es posible la conexion y se almacena la variable en connection
async function checkConnection() {
    try {
        connection = await oracledb.getConnection({
            user: 'ferjo',
            password: 'ferjo',
            connectString: 'localhost:1521/ORCLCDB.localdomain'
        });
        console.log("Successfully connected to Oracle!")
    } catch (err) {
        console.log("Error: ", err);
    }
}
// una vez que se deja de usar la base de datos se debe de cerrar la conexion
async function closeConnection() {
    if (connection) {
        try {
            await connection.close();
        } catch (err) {
            console.log("Error when closing the database connection: ", err);
        }
    }
}

checkConnection();


//  Estableciendo puertos
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
    console.log(`Backend inicializado en el puerto ${app.get('port')}`);
});

app.get('/', (req, res) => {
    console.log('Just for testing')
    res.send('Hello');
});

async function prueba(req, res){
    result = await connection.execute(`SELECT * FROM TIPO_USUARIO`);
    return res.send(result.rows);
}
app.get('/prueba', (req, res) => {
    prueba(req,res)
});