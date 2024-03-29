const express = require('express');
const cors = require('cors');

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
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
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

//Establecer puerto y escuchar solicitud
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`El servidor esta corriendo en el puerto: ${PORT}.`);
});

function initial() {
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
  }