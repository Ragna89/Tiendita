var array_productos = [];

if (localStorage.getItem('Productos')) {
    array_productos = JSON.parse(localStorage.getItem('Productos')) || [];
}else{
    localStorage.setItem('Productos', JSON.stringify(array_productos));
}

function comprar(id) {
    var producto = $('#producto-' + id);

    var p = {
        id: id,
        img: producto.data('img'),
        nombre: producto.data('nombre'),
        precio: producto.data('precio')
    };

    array_productos.push(p);

    localStorage.setItem('Productos', JSON.stringify(array_productos));
    localStorage.setItem('Productos1', JSON.stringify(array_productos1));
    llenar_carro();
}

function llenar_carro() {
    var arrayData = JSON.parse(localStorage.getItem('Productos'));
    var arrayLength = arrayData.length;
    
    if (arrayLength == 0){
        $('#carrito-producto').html('');   
        var texto = '';
        texto += `
            <tr>
                <td></td>
                <td>Carro Vacio</td>
                <td></td>
            </tr>
            `;
        var total = 0;

        $('#carrito-producto').append(texto);         
        $('#carrito-precio').html(total);
        var spanElement = document.getElementById('carrospan');
        spanElement.textContent = 0;
    }else{
        $('#carrito-producto').html('');   
        var texto = '';
        var total = 0;
        array_productos.forEach((producto, index) => {
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

        $('#carrito-producto').append(texto);         
        $('#carrito-precio').html(total);
        
        
        $('.delete-button').click(function() {
            var index = $(this).data('index');
            eliminar_producto(index);
        });

        var spanElement = document.getElementById('carrospan');
        spanElement.textContent = arrayLength;
    }
}

function eliminar_producto(index) {
    array_productos.splice(index, 1);
    localStorage.setItem('Productos', JSON.stringify(array_productos));
    llenar_carro();
}


function vaciarCarro(){
    localStorage.removeItem('Productos');
}

function onLoad(){
    llenar_carro()
}

window.addEventListener('load', function() {
    onLoad();
  });