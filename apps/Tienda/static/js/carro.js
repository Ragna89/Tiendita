
var array_productos1 = [];

if (localStorage.getItem('Productos1')) {
    array_productos = JSON.parse(localStorage.getItem('Productos')) || [];
    var array_productos1 = array_productos1.concat(array_productos);
    localStorage.setItem('Productos1', JSON.stringify(array_productos1));
}else{
    array_productos = JSON.parse(localStorage.getItem('Productos')) || [];
    var array_productos1 = array_productos1.concat(array_productos);
    localStorage.setItem('Productos1', JSON.stringify(array_productos1));
}



function llenar_carroc() {
    var arrayData = array_productos1;
    var arrayLength = arrayData.length;
    
    if (arrayLength == 0){
        $('#carrito-producto1').html('');   
        var texto = '';
        texto += `
            <tr>
                <td></td>
                <td>Carro Vacio</td>
                <td></td>
            </tr>
            `;
        var total = 0;

        $('#carrito-producto1').append(texto);         
        $('#carrito-precio1').html(total);
        var spanElement = document.getElementById('carrospan');
        spanElement.textContent = 0;
    }else{
        $('#carrito-producto1').html('');   
        var texto = '';
        var total = 0;
        array_productos1.forEach((producto, index) => {
            texto += `
            <tr>
                <td><img src="${producto.img}" width="50px"></td>
                <td>${producto.nombre}</td>
                <td>$${producto.precio}</td>
                <td>
                    <button class="btn delete-button" data-index="${index}"><img src="../static/img/delete.png" height="25px"></button>
                </td>
            </tr>
            `;
            total += producto.precio;
        });

        $('#carrito-producto1').append(texto);         
        $('#carrito-precio1').html(total);
        
        
        $('.delete-button').click(function() {
            var index = $(this).data('index');
            eliminar_productoc(index);
        });

        var spanElement = document.getElementById('carrospan');
        spanElement.textContent = arrayLength;
    }
}

function eliminar_productoc(index) {
    array_productos1.splice(index, 1);
    localStorage.setItem('Productos', JSON.stringify(array_productos1));
    llenar_carroc();
}


function vaciarCarroc(){
    localStorage.removeItem('Productos');
}

function onLoadc(){
    llenar_carroc()
}

window.addEventListener('load', function() {
    onLoadc();
  });

var btncomprar = document.getElementById('btncomprar');

function boleta() {
    var contenido = document.getElementById("bodycart").cloneNode(true);
    var elementos = contenido.querySelectorAll(".eboleta");
    var spantotal = document.getElementById("carrito-precio1");
    var total = spantotal.textContent;
    
    document.body.innerHTML = "";
    document.title = "Boleta";
  
    var titulo = document.createElement("h2");
    titulo.classList.add("d-flex","justify-content-center", "mt-5", "mb-3");
    titulo.textContent = "Boleta de Compra";
    document.body.appendChild(titulo);

    var texto2 = document.createElement("p");
    texto2.classList.add("d-flex","justify-content-center","mb-1");
    texto2.textContent = "Casa Matriz: Av. Juanito Perez #348, Providencia";
    document.body.appendChild(texto2);

    var texto3 = document.createElement("p");
    texto3.classList.add("d-flex","justify-content-center","mb-1");
    texto3.textContent = "Fono Contacto: 2 22322122";
    document.body.appendChild(texto3);

    var fecha = document.createElement("p");
    fecha.classList.add("d-flex","justify-content-center","mb-1");
    fecha.textContent = "Fecha: " + obtenerFechaActual() + "- Hora:" + obtenerHora();
    document.body.appendChild(fecha);
  
    var tabla = document.createElement("table");
    tabla.classList.add("tabla-espaciada","mx-auto");

    var filaActual;

    elementos.forEach(function(elemento, index) {
    if (index % 2 === 0) {
        filaActual = document.createElement("tr");
    }

    var celda = document.createElement("td");
    celda.appendChild(elemento.cloneNode(true));

    filaActual.appendChild(celda);

    if (index % 2 === 1 || index === elementos.length - 1) {
        tabla.appendChild(filaActual);
    }
    });
    var filaTotal = document.createElement("tr");

    var celdaTotal = document.createElement("td");
    celdaTotal.classList.add("center-row");
    celdaTotal.colSpan = 2;
    celdaTotal.textContent = "Total: $"+ total;

    filaTotal.appendChild(celdaTotal);

    tabla.appendChild(filaTotal);
    document.body.appendChild(tabla);
    document.body.appendChild(document.createElement("br"));

    
  
    window.print();
  
    location.reload();
  }

  function obtenerHora(){
    var fecha = new Date();
    var hora = fecha.getHours();
    var minutos = fecha.getMinutes();
    var segundos = fecha.getSeconds();
    return hora + ":" + minutos + ":" + segundos;
  }
  
  function obtenerFechaActual() {
    var fecha = new Date();
    var dia = fecha.getDate();
    var mes = fecha.getMonth() + 1;
    var anio = fecha.getFullYear();
    return dia + "/" + mes + "/" + anio;
  }
  

btncomprar.addEventListener('click', function(){
    var arrayData = array_productos1;
    var arrayLength = arrayData.length;

    if (arrayLength == 0){
        alert("Debes Agregar Elementos al Carro");
    }else{
        boleta();
    }
    
});