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
            url: '/search/',
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

//Funcion Mostrar Modal Eliminar Producto
var abrirModalBtn = document.querySelectorAll('.btn-abrir-modal');
if(abrirModalBtn){
    abrirModalBtn.forEach(function(button) {
        button.addEventListener('click', function() {
            var productId = button.getAttribute('data-product-id');

            var modal = document.getElementById('pemodal');
            modal.style.display = 'flex';
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
            delProd.addEventListener('click', function(){
                modal.style.display = 'none';
            });
            var caBtn = document.getElementById('caBtn');
            caBtn.addEventListener('click', function(){
                modal.style.display = 'none';
            });
        });
    });
}
//Funcion Mostrar Modal Eliminar Usuario
var abrirModalBtnul = document.querySelectorAll('.btn-abrir-modalul');
if (abrirModalBtnul){
    abrirModalBtnul.forEach(function(button) {
        button.addEventListener('click', function() {
            var userId = button.getAttribute('data-username');

            var modal = document.getElementById('uemodal');
            modal.style.display = 'flex';
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
            delProdul.addEventListener('click', function(){
                modal.style.display = 'none';
            });
            var caBtn = document.getElementById('caBtn');
            caBtn.addEventListener('click', function(){
                modal.style.display = 'none';
            });
        });
    });
}
//Mostrar Modal Eliminar Plataforma
var abrirModalBtncl = document.querySelectorAll('.btn-abrir-modalep');
if (abrirModalBtncl){
    abrirModalBtncl.forEach(function(button) {
        button.addEventListener('click', function() {
        var categoryId = button.getAttribute('data-product-id');

        var modal = document.getElementById('epmodal');
        modal.style.display = 'flex';
        modal.setAttribute('data-product-id', categoryId);
        fetch("/obtenerinfplat?id=" + categoryId)
            .then(function(response) {
            return response.json();
            })
            .then(function(data) {
            document.getElementById("modalbodyep").textContent = "¿Esta seguro que Desea Eliminar la Plataforma "+ data.name +"?";
            })
        .catch(function(error) {
            console.error("Error al obtener la información de la Categoria:", error);
        });
        var delProdce = document.getElementById('delBtnep');
        delProdce.href = '/delplat/' + categoryId;
        delProdce.addEventListener('click', function(){
            modal.style.display = 'none';
        });
        var caBtn = document.getElementById('caBtn');
        caBtn.addEventListener('click', function(){
            modal.style.display = 'none';
        });
        });
    });
}