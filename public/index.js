contactos()

function contactos() {
    fetch("/usuarios")
      .then(function (res) {
        return res.json();
      })
      .then(function (datos) {
        let contactos = "";
        console.log(datos)
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
        
        document.getElementById("div1").innerHTML = contactos;
      });
  }
  

  