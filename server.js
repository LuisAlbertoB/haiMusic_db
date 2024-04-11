const express = require('express');
const cors = require('cors');
const dbConfig = require("./app/config/db.config");

const app = express();

var corsOption = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOption));

// analiza solicitudes de tipo de contenido - aplicación/json
app.use(express.json());

// analiza solicitudes de tipo de contenido - aplicación/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`)
  .then(() => {
    console.log("Exito al conectar con mongo db");
    initial();
  })
  .catch(err => {
    console.error("error al conectar", err);
    process.exit();
  });

//ruta
app.get("/", (req, res) => {
    res.json({ message: "Bienvenido a Hai Music Aplication" });
});

require('./app/routers/auth.routes')(app);
require('./app/routers/user.routes')(app);

//Establecer puerto y escuchar solicitud
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`El servidor esta corriendo en el puerto: ${PORT}.`);
});

/* function initial() {
    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Role({
          name: "user"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'user' to roles collection");
        });
  
        new Role({
          name: "admin"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'admin' to roles collection");
        });
      }
    });
  } */
  
async function initial() {
    try {
        const count = await Role.estimatedDocumentCount();
        if (count === 0) {
            await Promise.all([
                new Role({ name: "user" }).save(),
                new Role({ name: "admin" }).save()
            ]);
            console.log("Roles activados e iniciados");
        }
    } catch (error) {
        console.error("error al iniciar los roles checalo", error);
    }
}
