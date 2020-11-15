const express = require("express");
const app = express();
const mongodb = require("mongodb");
let MongoClient = mongodb.MongoClient;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
let db;

MongoClient.connect("mongodb://127.0.0.1:27017", function (err, client) {
  if (err !== null) {
    console.log(err);
  } else {
    db = client.db("contactos");
  }
});

app.get("/usuarios", function (req, res) {
  db.collection("contactos")
    .find()
    .toArray(function (err, datos) {
      if (err != null) {
        res.send(err);
      } else {
        res.send(datos);
      }
    });
});

app.post("/nuevousuario", function (req, res) {
  let usuario = {
    nombre: req.body.nombre,
    sexo: req.body.sexo,
    edad: parseInt(req.body.edad),
    ciudad: req.body.ciudad,
    buscando: req.body.buscando,
    aficiones: req.body.aficiones,
    foto: req.body.foto,
  };

  db.collection("contactos").insertOne(usuario, function (err, datos) {
    if (err !== null) {
      res.send(err);
    } else {
      res.send(datos);
    }
  });
});

app.put("/modificarusuario", function (req, res) {
  let nombre = req.params.nombre;
  let sexo = req.params.sexo;
  let edad = parseInt(req.params.edad);
  let ciudad = req.params.ciudad;
  let buscando = req.params.buscando;
  let aficiones = req.params.aficiones;
  let foto = req.params.foto;

  db.collection("contactos").updateMany(
    {nombre : nombre},
    { sexo: sexo },
    { edad: edad },
    { ciudad: ciudad },
    { buscando: buscando },
    { aficiones: aficiones },
    { foto: foto },

    function (err, datos) {
      if (err !== null) {
        res.send(err);
      } else {
        res.send(datos);
      }
    }
  );
});

app.delete("/eliminarusuario", function (req, res) {
    let nombre = req.params.nombre;
  console.log(nombre)
    db.collection("contactos").deleteOne({ nombre: nombre }, function (err, datos) {
      if (err !== null) {
        res.send(err);
      } else {
        res.send(datos);
      }
    });
  });

app.listen(3000);
