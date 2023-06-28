function Apireloj(){
    fetch('http://worldtimeapi.org/api/timezone/America/Santiago')
        .then(response => response.json())
        .then(data =>{
            let hora = document.getElementById("hora");
            
            var reloj = data.datetime.substring(11, 19);

            hora.innerHTML = "Hora: " + reloj;
        })
}
function actualizaReloj(){
    Apireloj();
    setInterval(Apireloj, 1000);
}

$(function(){
    $("#loginform").validate({
        rules:{
            email:{
                required: true,
                email: true
            },
            password:{
                required:true,
                minlength: 8
            }
        },
        messages:{
            email:{
                required:"El Correo es Obligatorio.",
                email:"Formato correo no valido."
            },
            password:{
                required:"Debe Ingresar una Contraseña",
                minlength:"Debe contener al menos 8 Caracteres"
            }
        }
    })
})

var array_productos = [];

        if (localStorage.getItem('Productos')) {
            array_productos = JSON.parse(localStorage.getItem('Productos')) || [];
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
            llenar_carro();
        }

        function llenar_carro() {
            $('#carrito-producto').html('');   
            var texto = '';
            var total = 0;
            array_productos.forEach(producto => {
                texto = texto + `
                <tr>
                  <td><img src="${producto.img}" width="50px"></td>
                  <td>${producto.nombre}</td>
                  <td>$${producto.precio}</td>
                </tr>
                `;

                total += producto.precio;
            });

            $('#carrito-producto').append(texto);         
            $('#carrito-precio').html(total);       
            $('#carrito-precio1').append(total);    
        }

        function vaciarCarro(){
            localStorage.removeItem('Productos');
            toastbuy();
            comprar = document.getElementById('btncomprar')
            comprar.addEventListener('click', function(){
                comprar.href = '/'
            })
        }

function toastbuy(){
  var successbuyToast = document.getElementById('successbuyToast');
  var toast = new bootstrap.Toast(successbuyToast);
  toast.show();

  setTimeout(function() {
      var successbuyToast = document.getElementById('successbuyToast');

      if (successbuyToast) {
          var toast = new bootstrap.Toast(successbuyToast);
          successbuyToast.classList.add("d-none");
        }
  }, 1000);

}



function onLoad(){
    actualizaReloj()
    llenar_carro()
    var arrayData = JSON.parse(localStorage.getItem('Productos'));
    var arrayLength = arrayData.length;
    var spanElement = document.getElementById('carrospan');
    spanElement.textContent = arrayLength;
}


$(function(){
    $("#listSearch").on("keyup", function(){
        let val = $(this).val().toLowerCase();
        $("table tbody tr").filter(function(){
            let text = $(this).text().toLowerCase();
            let match = text.indexOf(val) > -1;
            if (match) {
                $(this).stop().fadeIn(200);
            } else {
                $(this).stop().fadeOut(200);
            }
        })
    })
})

var abrirModalBtn = document.querySelectorAll('.btn-abrir-modal');

abrirModalBtn.forEach(function(button) {
  button.addEventListener('click', function() {
    var productId = button.getAttribute('data-product-id');

    var modal = document.getElementById('pemodal');
    modal.setAttribute('data-product-id', productId);
    fetch("/obtenerproducto?id=" + productId)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        document.getElementById("modalbody").textContent = "¿Esta seguro que Desea Eliminar "+ data.name +"?";
      })
      .catch(function(error) {
        console.error("Error al obtener la información del producto:", error);
      });
      var delProd = document.getElementById('delBtn');
      delProd.href = '/borrarproducto/' + productId;
  });
});


$(document).ready(function() {
  if ($('.alert-success').length) {
      var successToast = document.getElementById('successToast');
      var toast = new bootstrap.Toast(successToast);
      toast.show();
  }
  setTimeout(function() {
      var successToast = document.getElementById('successToast');
      
      if (successToast) {
          var toast = new bootstrap.Toast(successToast);
          successToast.classList.add("d-none");
        }
  }, 1000);
});

  $(document).ready(function() {
    if ($('.alert-success').length) {
        var errorToast = document.getElementById('errorToast');
        var toast = new bootstrap.Toast(errorToast);
        toast.show();
    }
    setTimeout(function() {
        var errorToast = document.getElementById('errorToast');
        
        if (errorToast) {
            var toast = new bootstrap.Toast(errorToast);
            errorToast.classList.add("d-none");
          }
    }, 1000);
  });

  $(document).ready(function() {
    $('#searchInput').on('keyup', function() {
        var searchTerm = $(this).val();
        $.ajax({
            url: 'search/',
            type: 'GET',
            data: { 'q': searchTerm },
            success: function(response) {
                $('#resultadosCollapse .card').empty();
                $.each(response.results, function(index, result) {
                    var content = "";
                    if (result.img) {
                        content = '<a href="/producto/'+result.id+'" style="text-decoration: none; color: black;">'+
                        '<div class="col">'+
                        '<div class="row">'+
                        '<div class="col-4"><img src="' + result.img + '"></div>';
                        content += '<div class="col-8 d-flex align-items-center me-0"><h6>'+result.name+'</h6></div>'+
                        '</div>'+
                        '</div>'+
                        '</a>';
                    };

                    $('#resultadosCollapse .card').append(content);
                 });
            }
        });
    });
});

var abrirModalBtnul = document.querySelectorAll('.btn-abrir-modalul');



abrirModalBtnul.forEach(function(button) {
  button.addEventListener('click', function() {
    var userId = button.getAttribute('data-username');

    var modal = document.getElementById('uemodal');
    modal.setAttribute('data-username', userId);
    fetch("/obtainUser?id=" + userId)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        document.getElementById("modalbodyue").textContent = "¿Esta seguro que Desea Eliminar "+ data.name +"?";
      })
      .catch(function(error) {
        console.error("Error al obtener la información del Usuario:", error);
      });
      var delProdul = document.getElementById('delBtnul');
      delProdul.href = '/delUser/' + userId;
  });
});

document.getElementById("agregarBtn").addEventListener("click", function() {
    location.reload();
  });