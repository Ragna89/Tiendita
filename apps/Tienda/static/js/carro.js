
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
        $('#total_carrito').val(total);
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
  
var total_carro = document.getElementById('total_carrito');
btncomprar.addEventListener('click', function(){
    var arrayData = array_productos1;
    var arrayLength = arrayData.length;

    if (arrayLength == 0){
        alert("Debes Agregar Elementos al Carro");
    }else{
        var total = total_carro.value
        btncomprar.href = '/iniciar_pago/?total=' + total;
    }
    
});