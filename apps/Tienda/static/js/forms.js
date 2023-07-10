var form = document.getElementById('agregarform');
if(form){
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        var txTitle = document.getElementById('titulo').value;
        var txAuthor = document.getElementById('desarrollador').value;
        var txPrice = document.getElementById('precio').value;
        var optCate = document.getElementById('genero').value;
        var txStock = document.getElementById('stock').value;
        var txDesc = document.getElementById('descripcion').value;
        var iptImg = document.getElementById('imagen').value;
      
        console.log(optCate)
      
        if (!txTitle || !txAuthor || !txPrice || !txStock || !txDesc || !iptImg) {
          $(function(){
            $("#agregarform").validate({
                rules:{
                    titulo:{
                        required: true,
                        minlength: 3
                    },
                    desarrollador:{
                        required: true,
                        minlength: 2
                    },
                    precio:{
                        required: true,
                        minlength: 2
                    },
                    stock:{
                        required:true,
                        minlength: 1
                    },
                    descripcion:{
                        required:true,
                        minlength: 10
                    },
                    genero:{
                        required:true,
                    },
                    imagen:{
                        required:true
                    }
                },
                messages:{
                    titulo:{
                        required:"Debe Ingresar El Titulo",
                        minlength:"Minimo 3 caracteres"
                    },
                    desarrollador:{
                        required:"Debe Ingresar El Desarrollador.",
                        minlength:"Minimo 2 caracteres"
                    },
                    precio:{
                        required:"Debe Ingresar El Precio",
                        minlength:"Minimo 2 caracteres"
                    },
                    stock:{
                        required:"Debe Ingresar El Stock Disponible",
                        minlength:"Minimo 1 caracteres"
                    },
                    descripcion:{
                        required:"Debe Ingresar Una Descripcion",
                        minlength:"Minimo 10 caracteres"
                    },
                    genero:{
                        required:"La Plataforma es Obligatoria"
                    },
                    imagen:{
                        required:"La Portada es Obligatoria"
                    },
                    
                }
            })
          })
          return;
        }
        if (optCate === "null" || optCate.value === "null"){
          $(function(){
              $("#agregarform").validate({
                  rules:{
                      genero:{
                          required:true,
                      }
                  },
                  messages:{
                      genero:{
                          required:"La Plataforma es Obligatoria"
                      } 
                  }
              })
            })
          return;
        }else {
          form.submit();
        }
      });
      
}

var forme = document.getElementById('editarform');
if(forme){
    forme.addEventListener('submit', function(event) {
        event.preventDefault();
        var txTitle = document.getElementById('titulo').value;
        var txAuthor = document.getElementById('desarrollador').value;
        var txPrice = document.getElementById('precio').value;
        var optCate = document.getElementById('genero').value;
        var txStock = document.getElementById('stock').value;
        var txDesc = document.getElementById('descripcion').value;
      
        console.log(optCate)
      
        if (!txTitle || !txAuthor || !txPrice || !txStock || !txDesc) {
          $(function(){
            $("#editarform").validate({
                rules:{
                    titulo:{
                        required: true,
                        minlength: 3
                    },
                    desarrollador:{
                        required: true,
                        minlength: 2
                    },
                    precio:{
                        required: true,
                        minlength: 2
                    },
                    stock:{
                        required:true,
                        minlength: 1
                    },
                    descripcion:{
                        required:true,
                        minlength: 10
                    },
                    genero:{
                        required:true,
                    }
                },
                messages:{
                    titulo:{
                        required:"Debe Ingresar El Titulo",
                        minlength:"Minimo 3 caracteres"
                    },
                    desarrollador:{
                        required:"Debe Ingresar El Desarrollador.",
                        minlength:"Minimo 2 caracteres"
                    },
                    precio:{
                        required:"Debe Ingresar El Precio",
                        minlength:"Minimo 2 caracteres"
                    },
                    stock:{
                        required:"Debe Ingresar El Stock Disponible",
                        minlength:"Minimo 1 caracteres"
                    },
                    descripcion:{
                        required:"Debe Ingresar Una Descripcion",
                        minlength:"Minimo 10 caracteres"
                    },
                    genero:{
                        required:"La Plataforma es Obligatoria"
                    }
                    
                }
            })
          })
          return;
        }
        if (optCate === "null" || optCate.value === "null"){
          $(function(){
              $("#editarform").validate({
                  rules:{
                      genero:{
                          required:true,
                      }
                  },
                  messages:{
                      genero:{
                          required:"La Plataforma es Obligatoria"
                      } 
                  }
              })
            })
          return;
        }else {
          forme.submit();
        }
      });
      
}

var formc = document.getElementById('agregarplat');
if(formc){
    formc.addEventListener('submit', function(event) {
        event.preventDefault();
        var nombre = document.getElementById('nombre').value;
      
        if (!nombre) {
          $(function(){
            $("#agregarplat").validate({
                rules:{
                    nombre:{
                        required: true,
                        minlength: 2
                    }
                },
                messages:{
                    nombre:{
                        required:"Nombre de la Plataforma es Obligatorio",
                        minlength:"Minimo 2 caracteres"
                    }
                }
            })
          })
          return;
        }
        else{
          formc.submit();
        } 
      });  
}


$(document).ready(function() {
    var formRe = document.getElementById('formEdUser');
    if (formRe) {
      $("#formEdUser").validate({
        rules: {
          username: {
            required: true,
            minlength: 4
          },
          password: {
            required: true,
            minlength: 8,
            validarContrasena: true 
          },
          newpassword: {
            required: true,
            minlength: 8,
            validarContrasena: true 
          },
          upassword: {
            required: false
          },
          admpassword: {
            required: true,
            minlength: 8,
          },
          email: {
            required: true,
            email: true,
            validarCorreo: true
          }
        },
        messages: {
          username: {
            required: "Debe ingresar un Nombre de Usuario",
            minlength: "Mínimo 4 caracteres"
          },
          newpassword: {
            required: "Debe ingresar una Contraseña",
            minlength: "Mínimo 8 caracteres",
            validarContrasena: "La Contraseña debe contener al menos una letra Mayúscula, una letra Minúscula y un Número."
          },
          password: {
            required: "Debe ingresar una Contraseña",
            minlength: "Mínimo 8 caracteres"
          },
          admpassword: {
            required: "Debe ingresar una Contraseña",
            minlength: "Mínimo 8 caracteres"
          },
          email: {
            required: "Debe ingresar un Email",
            email: "Por favor ingrese un Email válido",
            validarCorreo: "Ingrese un Dominio válido."
          }
        }
      });
    }
  });

$(document).ready(function() {
    var formReg = document.getElementById('registerform');
    if (formReg) {
      $("#registerform").validate({
        rules: {
          username: {
            required: true,
            minlength: 4
          },
          password: {
            required: true,
            minlength: 8,
            validarContrasena: true 
          },
          newpassword: {
            required: true,
            minlength: 8,
            validarContrasena: true 
          },
          email: {
            required: true,
            email: true,
            validarCorreo: true
          }
        },
        messages: {
          username: {
            required: "Debe ingresar un Nombre de Usuario",
            minlength: "Mínimo 4 caracteres"
          },
          password: {
            required: "Debe ingresar una Contraseña",
            minlength: "Mínimo 8 caracteres",
            validarContrasena: "La Contraseña debe contener al menos una letra Mayúscula, una letra Minúscula y un Número."
          },
          newpassword: {
            required: "Debe ingresar una Contraseña",
            minlength: "Mínimo 8 caracteres",
            validarContrasena: "La Contraseña debe contener al menos una letra Mayúscula, una letra Minúscula y un Número."
          },
          email: {
            required: "Debe ingresar un Email",
            email: "Por favor ingrese un Email válido",
            validarCorreo: "Ingrese un Dominio válido."
          }
        }
      });
    }
  });
  

$(document).ready(function() {
  var formLog = document.getElementById('loginform');
  if (formLog) {
    $("#loginform").validate({
      rules: {
        username: {
          required: true,
          minlength: 4
        },
        password: {
          required: true,
          minlength: 8,
          validarContrasena: true 
        },
      },
      messages: {
        username: {
          required: "Debe ingresar un Nombre de Usuario",
          minlength: "Mínimo 4 caracteres"
        },
        password: {
          required: "Debe ingresar una Contraseña",
          minlength: "Mínimo 8 caracteres"
        }
      }
    });
  }
});


$.validator.addMethod("validarContrasena", function(value, element) {
  return /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d.*-_]{8,}$/.test(value);
}, "La Contraseña debe contener al menos una letra Mayúscula, una letra Minúscula y un Número.");

$.validator.addMethod("validarCorreo", function(value, element) {
  return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
}, "Ingrese un Dominio válido.");