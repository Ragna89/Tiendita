var form = document.getElementById('formAddProduct');

form.addEventListener('submit', function(event) {
  event.preventDefault();
  var txTitle = document.getElementById('txTitle').value;
  var txAuthor = document.getElementById('txAuthor').value;
  var txPrice = document.getElementById('txPrice').value;
  var optCate = document.getElementById('optCate').value;
  var txStock = document.getElementById('txStock').value;
  var txDesc = document.getElementById('txDesc').value;
  var iptImg = document.getElementById('iptImg').value;

  console.log(optCate)

  if (!txTitle || !txAuthor || !txPrice || !txStock || !txDesc || !iptImg) {
    $(function(){
      $("#formAddProduct").validate({
          rules:{
              txTitle:{
                  required: true,
                  minlength: 3
              },
              txAuthor:{
                  required: true,
                  minlength: 2
              },
              txPrice:{
                  required: true,
                  minlength: 2
              },
              txStock:{
                  required:true,
                  minlength: 1
              },
              txDesc:{
                  required:true,
                  minlength: 10
              },
              optCate:{
                  required:true,
              },
              iptImg:{
                  required:true
              }
          },
          messages:{
              txTitle:{
                  required:"Debe Ingresar El Titulo",
                  minlength:"Minimo 3 caracteres"
              },
              txAuthor:{
                  required:"Debe Ingresar El Autor.",
                  minlength:"Minimo 2 caracteres"
              },
              txPrice:{
                  required:"Debe Ingresar El Precio",
                  minlength:"Minimo 2 caracteres"
              },
              txStock:{
                  required:"Debe Ingresar El Stock Disponible",
                  minlength:"Minimo 1 caracteres"
              },
              txDesc:{
                  required:"Debe Ingresar Una Descripcion",
                  minlength:"Minimo 10 caracteres"
              },
              optCate:{
                  required:"La Categoria es Obligatoria"
              },
              iptImg:{
                  required:"La Portada es Obligatoria"
              },
              
          }
      })
    })
    return;
  }
  if (optCate === "null" || optCate.value === "null"){
    $(function(){
        $("#formAddProduct").validate({
            rules:{
                optCate:{
                    required:true,
                }
            },
            messages:{
                optCate:{
                    required:"La Categoria es Obligatoria"
                } 
            }
        })
      })
    return;
  }else {
    form.submit();
  }
});



var formRe = document.getElementById('registerform');

formRe.addEventListener('submit', function(event) {
  event.preventDefault();
  var user = document.getElementById('r_username').value;
  var pass = document.getElementById('r_password').value;
  var mail = document.getElementById('r_email').value;

  console.log(user)

  if (!user || !pass || !mail) {
    $(function(){
      $("#registerform").validate({
          rules:{
              user:{
                  required: true,
                  minlength: 3
              },
              pass:{
                  required: true,
                  minlength: 8
              },
              mail:{
                  required: true,
                  email: true
              }
          },
          messages:{
              user:{
                  required:"Debe Ingresar un Nombre de Usuario",
                  minlength:"Minimo 3 caracteres"
              },
              pass:{
                  required:"Debe Ingresar Una Contraseña.",
                  minlength:"Minimo 8 caracteres, Alfa numerica"
              },
              mail:{
                  required:"Debe Ingresar Un Email",
                  email:"Porfavor Ingrese un Email Valido"
              }
          }
      })
    })
    return;
  }else {
    formRe.submit();
  }
});
