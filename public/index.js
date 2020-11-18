

function registrar() {
  let nombre = document.getElementById("registroNombre").value;
  let sexo = document.getElementById("registroSexo").value;
  let edad = document.getElementById("registroEdad").value;
  let ciudad = document.getElementById("registroCiudad").value;
  let buscando = document.getElementById("registroBuscando").value;
  let aficiones = document.getElementById("registroAficiones").value;
  let foto = document.getElementById("registroFoto").value;
  

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
  let edadTop = document.getElementById("edadTop").value
  let edadDown = document.getElementById("edadDown").value
  let ciudad = document.getElementById("ciudad").value
  let aficiones = document.getElementById("aficiones").value
  let sexo = document.getElementById("sexo ").value
  

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
    }),
  })
    .then(function (res) {
      return res.json();
    })
    .then(function (datos) {
      let contactos = "";
      for (let i = 0; i < datos.length; i++) {
        contactos += `
                <div>
                    <h3>Nombre: ${datos[i].nombre}</h3>
                    <p>Sexo: ${datos[i].sexo}</p>
                    <p>Edad: ${datos[i].edad}</p>
                    <p>Ciudad: ${datos[i].ciudad}</p>
                    <p>Buscando: ${datos[i].buscando}</p>
                    <p>Aficiones: ${datos[i].aficiones}</p>
                    <img src="${datos[i].foto}"/>
                </div>    
            `;
      }

      document.getElementById("div2").innerHTML = contactos;
    });
}

