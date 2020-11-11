CREATE TABLE TIPO_USUARIO(
    id_tipo INT GENERATED ALWAYS AS IDENTITY(START WITH 1 INCREMENT BY 1) PRIMARY KEY NOT NULL,
    descripcion VARCHAR(10) NOT NULL
);
INSERT INTO TIPO_USUARIO(descripcion) VALUES('admin');
INSERT INTO TIPO_USUARIO(descripcion) VALUES('cliente');

CREATE TABLE USUARIO(
    correo_electronico VARCHAR(100) PRIMARY KEY NOT NULL,
    contrasena VARCHAR(100) NOT NULL,
    nombre VARCHAR(20) NOT NULL,
    apellido VARCHAR(20) NOT NULL,
    fecha_nac DATE NOT NULL,
    pais VARCHAR(20) NOT NULL,
    foto_perfil VARCHAR(100),
    tipo REFERENCES TIPO_USUARIO(id_tipo),
    creditos DECIMAL(8,2)
);
--INSERT INTO USUARIO(correo_electronico,contrasena,nombre,apellido,fecha_nac,pais,tipo) VALUES('ferjo','202cb962ac59075b964b07152d234b70','Fernando','Tello',DATE '2001-03-04','GT',1);
UPDATE USUARIO SET contrasena = '202cb962ac59075b964b07152d234b70' WHERE correo_electronico = 'chepix';

CREATE TABLE OPERACION(
    id_operacion INT GENERATED ALWAYS AS IDENTITY(START WITH 1 INCREMENT BY 1) PRIMARY KEY NOT NULL,
    cliente REFERENCES USUARIO(correo_electronico),
    descripcion VARCHAR(250),
    fecha_operacion DATE
);

CREATE TABLE CATEGORIA(
    nombre_categoria VARCHAR(50) PRIMARY KEY NOT NULL,
    descripcion VARCHAR(100)
);
--insert into CATEGORIA VALUES('Deportes','productos relacionados con deportes');

CREATE TABLE PRODUCTO (
    id_producto INT GENERATED ALWAYS AS IDENTITY(START WITH 1 INCREMENT BY 1) PRIMARY KEY NOT NULL,
    nombre_producto VARCHAR(100),
    precio_producto DECIMAL(8,2),
    categoria REFERENCES CATEGORIA(nombre_categoria),
    detalle_producto VARCHAR(100),
    usuario REFERENCES USUARIO(correo_electronico),
    imagen VARCHAR(100),
    fecha_publicacion DATE,
    es_visible NUMBER(1) NOT NULL CHECK (es_visible IN (1,0))
);

CREATE OR REPLACE FUNCTION
inserta_producto(nombre IN VARCHAR,precio IN DECIMAL, cat IN VARCHAR,detalle IN VARCHAR,usu IN VARCHAR, img IN VARCHAR, fecha IN VARCHAR) RETURN INT IS
    id_prod INT;
BEGIN
    INSERT INTO PRODUCTO(nombre_producto,precio_producto,categoria,detalle_producto,usuario,imagen,fecha_publicacion,es_visible)
        VALUES(nombre,precio,cat,detalle,usu,img,TO_DATE(fecha, 'MON DD, YYYY, HH:MI:SS AM'),1)
        RETURNING id_producto INTO id_prod;
    RETURN id_prod;
END inserta_producto;

CREATE TABLE PALABRA_CLAVE(
    palabra_clave VARCHAR(20) PRIMARY KEY NOT NULL
);

CREATE TABLE PRODUCTO_CLAVE (
    producto REFERENCES PRODUCTO(id_producto),
    palabra_clave REFERENCES PALABRA_CLAVE(palabra_clave)
);

CREATE TABLE COMENTARIO(
    id_comentario INT GENERATED ALWAYS AS IDENTITY(START WITH 1 INCREMENT BY 1) PRIMARY KEY NOT NULL,
    usuario REFERENCES USUARIO(correo_electronico),
    producto REFERENCES PRODUCTO(id_producto),
    contenido VARCHAR(160),
    fecha_comentario DATE
);

CREATE TABLE DENUNCIA(
    id_denuncia INT GENERATED ALWAYS AS IDENTITY(START WITH 1 INCREMENT BY 1) PRIMARY KEY NOT NULL,
    usuario REFERENCES USUARIO(correo_electronico),
    producto REFERENCES PRODUCTO(id_producto),
    descripcion VARCHAR(160),
    fecha_denuncia DATE
);

CREATE TABLE SOLICITUD(
    id_solicitud INT GENERATED ALWAYS AS IDENTITY(START WITH 1 INCREMENT BY 1) PRIMARY KEY NOT NULL,
    cliente REFERENCES USUARIO(correo_electronico),
    producto REFERENCES PRODUCTO(id_producto),
    cantidad INT NOT NULL,
    fecha_solicitud DATE,
    ejecutada NUMBER(1) NOT NULL CHECK (ejecutada IN (1,0))
);
--INSERT INTO SOLICITUD(cliente,producto,cantidad,fecha_solicitud,ejectuada) VALUES(cliente,producto,1,TO_DATE(fecha, 'MON DD, YYYY, HH:MI:SS AM'),0);

CREATE OR REPLACE PROCEDURE
actualiza_creditos(correo IN VARCHAR,creditosAModificar IN DECIMAL)IS
    creditos_actuales DECIMAL;
BEGIN
    SELECT creditos INTO creditos_actuales FROM USUARIO WHERE correo_electronico = correo;
    UPDATE USUARIO SET creditos=creditos_actuales+creditosAModificar WHERE correo_electronico = correo;
END actualiza_creditos;

BEGIN
    actualiza_creditos('ferjo',-1);
END;
COMMIT;
SELECT creditos FROM USUARIO WHERE correo_electronico = 'ferjo';

CREATE TABLE LIKE_(
    producto REFERENCES PRODUCTO(id_producto),
    usuario REFERENCES USUARIO(correo_electronico),
    fecha DATE,
    tipo VARCHAR(7)
);

CREATE TABLE CHAT(
    id_chat INT GENERATED ALWAYS AS IDENTITY(START WITH 1 INCREMENT BY 1) PRIMARY KEY NOT NULL,
    cliente REFERENCES USUARIO(correo_electronico),
    vendedor REFERENCES USUARIO(correo_electronico)
);

CREATE TABLE MENSAJE(
    id_mensaje INT GENERATED ALWAYS AS IDENTITY(START WITH 1 INCREMENT BY 1) PRIMARY KEY NOT NULL,
    usuario REFERENCES USUARIO(correo_electronico),
    contenido VARCHAR(140),
    fecha DATE,
    chat REFERENCES CHAT(id_chat)
);