

function registrar() {
  let nombre = document.getElementById("registroNombre").value;
  let sexo = document.getElementById("registroSexo").value;
  let edad = document.getElementById("registroEdad").value;
  let ciudad = document.getElementById("registroCiudad").value;
  let buscando = document.getElementById("registroBuscando").value;
  let aficiones = document.getElementById("registroAficiones").value;
  let foto = document.getElementById("registroFoto").value;
  let email = document.getElementById("registroEmail").value;
  

  fetch("/nuevousuario", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre: nombre,
      sexo: sexo,
      edad: edad,
      ciudad: ciudad,
      buscando: buscando,
      aficiones: aficiones,
      foto: foto,
      email: email,
    }),
  })
    .then(function (res) {
      return res.json();
    })
    .then(function (datos) {
      console.log(datos);
    });
}

function buscar() {
  let edadTop = parseInt(document.getElementById("edadTop").value)
  let edadDown = parseInt(document.getElementById("edadDown").value)
  let ciudad = document.getElementById("ciudad").value
  let aficiones = document.getElementById("aficiones").value
  let sexo = document.getElementById("sexo").value
  

  fetch("/buscar/usuarios", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      edadTop: edadTop,
      edadDown: edadDown,
      ciudad: ciudad,
      aficiones: aficiones,
      sexo: sexo,
    }),
  })
    .then(function (res) {
      return res.json();
    })
    .then(function (datos) {
      console.log(datos)
      let contactos = "";
      for (let i = 0; i < datos.length; i++) {
        contactos += `
                <div class="contacto">
                    <h3>Nombre: ${datos[i].nombre}</h3>
                    <p>Sexo: ${datos[i].sexo}</p>
                    <p>Edad: ${datos[i].edad}</p>
                    <p>Ciudad: ${datos[i].ciudad}</p>
                    <p>Buscando: ${datos[i].buscando}</p>
                    <p>Aficiones: ${datos[i].aficiones}</p>
                    <img src="${datos[i].foto}"/>
                    <button onclick="contactar('${datos[i].nombre}')">Contactar</button>
                </div>    
            `;
      }

      document.getElementById("div2").innerHTML = contactos;
    });
}

function contactar(nombre){
  fetch(`/contactar/${nombre}`)
  .then(function (res) {
    return res.json();
  })
  .then(function (datos) {
    console.log(datos)
    document.getElementById("contactoEnsenyar").innerHTML = `<a href="mailto://${datos[0].email}">${datos[0].email}</a>`
  })
}

function eliminar(){
let nombre = document.getElementById("borrarNombre").value;
fetch("/eliminarusuario", {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({nombre: nombre}),
})
  .then(function (res) {
    return res.json();
  })
  .then(function (datos) {
    document.getElementById("div3").innerHTML = `<h1>Usuario borrado</h1>`;
  });
}
