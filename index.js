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
    email: req.body.email,
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
  const nombre = req.body.nombre;
  let sexo = req.body.sexo;
  let edad = parseInt(req.body.edad);
  let ciudad = req.body.ciudad;
  let buscando = req.body.buscando;
  let aficiones = req.body.aficiones;
  let foto = req.body.foto;
  let email = req.body.email;

  db.collection("contactos").updateOne(
    { nombre: nombre },
    {
      $set: {
        sexo: sexo,
        edad: edad,
        ciudad: ciudad,
        buscando: buscando,
        aficiones: aficiones,
        foto: foto,
        email: email
      },
    },

    function (err, datos) {
      if (err !== null) {
        res.send(err);
      } else {
        res.send(datos);
      }
    }
  );
});

app.put("/buscar/usuarios", function (req, res) {
  console.log(req.body)
  db.collection("contactos")
    .find({
      $and: [
        {
          $and: [
            { edad: { $lte: req.body.edadTop } },
            { edad: { $gte: req.body.edadDown } },
          ],
        },
        {
          ciudad: req.body.ciudad
        },
        {
          aficiones: req.body.aficiones
        },
        {
          sexo: req.body.sexo
        },
      ],
    })
    .toArray(function (err, datos) {
      if (err != null) {
        res.send(err);
      } else {
        res.send(datos);
      }
    });
});

app.get("/contactar/:nombre", function(req, res){
  let nombre = req.params.nombre
  db.collection("contactos")
    .find({nombre: nombre})
    .toArray(function (err, datos) {
      if (err != null) {
        res.send(err);
      } else {
        res.send(datos);
      }
    });
})

app.listen(3000);

app.delete("/eliminarusuario", function (req, res) {
  const nombre = req.body.nombre;

  db.collection("contactos").deleteOne({ nombre: nombre }, function (
    err,
    datos
  ) {
    if (err !== null) {
      res.send(err);
    } else {
      res.send(datos);
    }
  });
});


