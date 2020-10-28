import app from "./app";

app.listen(app.get('port'), () => {
    console.log(`Backend inicializado en el puerto ${app.get('port')}`);
});
  
import {checkConnection, closeConnection} from './oracle'
checkConnection();
