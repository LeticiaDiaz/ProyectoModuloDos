contactos();

function registrar() {
  const usuario = document.getElementById("registro").value;

  fetch("/nuevousuario", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  })
    .then(function (res) {
      return res.json();
    })
    .then(function (datos) {
      console.log(datos);
      libros();
    });
}

function buscar() {
  let edadTop = document.getElementById("edadTop").value
  let edadDown = document.getElementById("edadDown").value
  let ciudad = document.getElementById("ciudad").value
  let aficiones = document.getElementById("aficiones").value

  fetch("/buscar/usuarios", {
    method: "GET",
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
