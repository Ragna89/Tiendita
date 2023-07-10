from django.shortcuts import render, redirect
from .models import *
from django.conf import settings
from .forms import RegisterForm
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.admin.views.decorators import staff_member_required
import os
import json
from django.contrib import messages
from django.http import HttpResponse, JsonResponse

# Create your views here.
def cargarinicio(request):
    plataforma = Plataforma.objects.all()
    productos = Producto.objects.order_by('-p_fecha')[:7]
    return render(request, "index.html", {"Prod": productos, "Gen": plataforma })

@staff_member_required(login_url='login')
def cargaragregar(request):
    plataforma = Plataforma.objects.all()
    return render(request, "agregar.html", {"Gen": plataforma})

@staff_member_required(login_url='login')
def cargareditar(request, id):
    plataforma = Plataforma.objects.all()
    productos = Producto.objects.get(p_id = id)
    gen_id = productos.id_c
    prodgen_id = Plataforma.objects.get(c_id = gen_id.c_id).c_id
    return render(request, "editarjuego.html", {"Prod": productos, "Gen": plataforma, "Gen_id": prodgen_id})

def cargarjuegoo(request, id):
    producto = Producto.objects.get(p_id = id)
    productos = Producto.objects.all()
    ultimosagr = Producto.objects.order_by('-p_fecha')[:5]
    plataforma = Plataforma.objects.all()
    gen_id = producto.id_c
    prodgen_id = Plataforma.objects.get(c_id = gen_id.c_id).c_id
    return render(request, "basejuego.html", {'Prod': producto, 'Gen': plataforma, 'Gen_id': prodgen_id, 'Produ': productos, 'Ultprod': ultimosagr})

@staff_member_required(login_url='login')
def cargarlista(request):
    producto = Producto.objects.all()
    plataforma = Plataforma.objects.all()
    return render(request, "listaproducto.html", {'Prod': producto, 'Gen': plataforma})

@staff_member_required(login_url='login')
def cargaragrplat(request):
    return render(request, 'agrplataforma.html')

def cargarplataforma(request, id):
    plataforma = Plataforma.objects.get(c_id = id)
    producto = Producto.objects.filter(id_c = id)
    todas_plat = Plataforma.objects.all() 
    return render(request, "plataforma.html", {"Prod": producto, "Plat": plataforma, "Gen": todas_plat})

@staff_member_required(login_url='login')
def admplataforma(request):
    plataforma = Plataforma.objects.all()
    return render(request, "admplataforma.html", {'Gen': plataforma})

@staff_member_required(login_url='login')
def agregarplat(request):
    agr_nombre = request.POST['nombre']

    conter = 1
    agr_id = int(conter)
    while Plataforma.objects.filter(c_id = agr_id).exists():
        conter += 1
        agr_id = int(conter)

    Plataforma.objects.create(
        c_id = agr_id,
        c_plataforma = agr_nombre)
    messages.success(request, 'La Plataforma ha sido Agregada Exitosamente.')
    return redirect('/admplataforma')

def obtenerinfplat (request):
    plat_id = request.GET.get('id')
    plataforma = Plataforma.objects.get(c_id = plat_id)

    plat_info = {
        'name': plataforma.c_plataforma
    }
    return JsonResponse(plat_info)

@staff_member_required(login_url='login')
def eliminarplat(request, id):
    plataforma = Plataforma.objects.get(c_id = id)
    plataforma.delete()

    messages.error(request, 'La plataforma ha sido Eliminada Exitosamente')

    return redirect('/admplataforma')

@staff_member_required(login_url='login')
def agregarprod(request):
    agr_titulo = request.POST['titulo']
    agr_precio = request.POST['precio']
    agr_stock = request.POST['stock']
    agr_plataforma = Plataforma.objects.get(c_id = request.POST['genero'])
    agr_desarrollador = request.POST['desarrollador']
    agr_descripcion = request.POST['descripcion']
    agr_imagen = request.FILES['imagen']

    id_cat = request.POST.get('genero')

    conter = 0
    agr_id = int(id_cat + '0' + str(conter))
    while Producto.objects.filter(p_id = agr_id).exists():
        conter += 1
        agr_id = int(id_cat + '0' + str(conter))

    Producto.objects.create(
        p_id = agr_id,
        p_titulo = agr_titulo,
        p_precio = agr_precio,
        id_c = agr_plataforma,
        p_stock = agr_stock,
        p_des = agr_desarrollador,
        p_desc = agr_descripcion,
        p_img = agr_imagen)
    messages.success(request, 'El Producto ha sido Agregado Exitosamente.')
    return redirect('/listaproductos')

def obInfProd(request):
    pro_id = request.GET.get('id')
    producto = Producto.objects.get(p_id=pro_id)

    producto_info = {
        'name': producto.p_titulo
    }
    return JsonResponse(producto_info)

@staff_member_required(login_url='login')
def delProduct(request,id):
    product = Producto.objects.get(p_id = id)
    product.delete()
    img_rute  = os.path.join(settings.MEDIA_ROOT, str(product.p_img))
    os.remove(img_rute)

    messages.error(request, 'El Producto ha sido Eliminado Exitosamente.')

    return redirect('/listaproductos')

@staff_member_required(login_url='login')
def editProd(request):
    ed_id = request.POST['SKU']
    BProduct = Producto.objects.get(p_id = ed_id)
    edit_titulo = request.POST['titulo']
    edit_precio = request.POST['precio']
    edit_stock = request.POST['stock']
    edit_genero = Plataforma.objects.get(c_id = request.POST['genero'])
    edit_desarrollador = request.POST['desarrollador']
    edit_descripcion = request.POST['descripcion']
    
    
    try:
        edit_img = request.FILES['imagen']
        img_rute  = os.path.join(settings.MEDIA_ROOT, str(BProduct.p_img))
        os.remove(img_rute)
    except:
        edit_img = BProduct.p_img

    BProduct.p_titulo = edit_titulo
    BProduct.p_precio = edit_precio
    BProduct.p_stock = edit_stock
    BProduct.p_des =  edit_desarrollador
    BProduct.p_desc = edit_descripcion
    BProduct.id_c = edit_genero
    BProduct.p_img = edit_img

    BProduct.save()

    messages.success(request, 'El Producto ha sido Editado Exitosamente.')

    return redirect('/listaproductos')

def buscar_productos(request):
    query = request.GET.get('q') 
    result = []
    if query:
        result = Producto.objects.filter(p_titulo__icontains=query)[:4]

    results = [{'id':product.p_id,'name':product.p_titulo,'img':product.p_img.url if product.p_img else None} for product in result]

    return JsonResponse({'results': results})

def cLogin(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(request, username=username, password=password)


        if user is not None:
            login(request, user)

            if user.is_staff:
                messages.success(request, 'Bienvenido Administrador.')
                return redirect('inicio')
            else:
                messages.success(request, 'Bienvenido Usuario.')
                return redirect('inicio')
        else:
            messages.error(request, 'Los Datos Ingresados son Incorrectos.')

    return render(request, "login.html")

def logout_view(request):
    logout(request)
    return redirect('inicio')

def cRegister(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        email = request.POST.get('email')

        if User.objects.filter(username=username).exists():
            messages.error(request, 'El Nombre de Usuario ya está en uso.')
            return render(request, 'register.html')

        if User.objects.filter(email=email).exists():
            messages.error(request, 'El Email ya está en Uso.')
            return render(request, 'register.html')

        form = RegisterForm(request.POST)
        if form.is_valid():
            user = User.objects.create_user(username=username, password=password, email=email)

            messages.success(request, 'Usuario creado con Exito.')
            return redirect('login')
        else:
            messages.error(request, 'Por favor, Ingrese los Datos Solicitados de Manera Correcta.')

    else:
        form = RegisterForm()

    return render(request, 'register.html', {'form': form})

@staff_member_required(login_url='login')
def cUserlist(request):
    usuarios = User.objects.all()
    plataforma = Plataforma.objects.all()
    return render(request, "Userlist.html", {"Users": usuarios, "Gen": plataforma})

def obInfUser(request):
    use_id = request.GET.get('id')
    usuario = User.objects.get(username=use_id)

    user_info = {
        'name': usuario.username
    }
    return JsonResponse(user_info)

@staff_member_required(login_url='login')
def cedUser(request, username):
    user = User.objects.get(username=username)
    return render(request, 'edUser.html', {'User': user})

@staff_member_required(login_url='login')
def editUser(request):
    usernamel = request.user.username
    username = request.POST['usernameo']
    usern = request.POST['username']
    emailo = request.POST['emailo']
    emailn = request.POST['email']
    staffcb = request.POST.get('txStaff') == 'on'
    npass = request.POST['upassword']
    admpass = request.POST['admpassword']

    user = authenticate(request, username=usernamel, password=admpass)

    if(usern != username):
        if User.objects.filter(username=usern).exists():
            messages.error(request, 'El Nombre de Usuario ya esta en uso')
            return redirect('/edUser/'+username)
    if(emailn != emailo):
        if User.objects.filter(email=emailn).exists():
            messages.error(request, 'El Email ya esta en uso')
            return redirect('/edUser/'+username)
    if user is not None:
        user = User.objects.get(username=username)
        user.username = usern
        user.email = emailn
        user.is_staff = staffcb
        if(npass != ''):
            user.set_password(npass)
        user.save()
        messages.success(request, 'El Usuario se ha Editado Exitosamente')
        return redirect('/userlist')
    else:
        messages.error(request, 'La Contraseña es Incorrecta')
        return redirect('/edUser/'+username)

@staff_member_required(login_url='login')
def delUser(request,username):

    if User.objects.filter(username=username).exists():
        user = User.objects.get(username=username)
        if user.is_staff:
            messages.error(request, 'No se puede eliminar a un Administrador')
            return redirect('/userlist')
        else:
            user.delete()
            messages.error(request, 'El Usuario ha sido Eliminado Exitosamente.')
    else:
        messages.error(request, 'Usuario no Existe.')

    return redirect('/userlist')

@login_required(login_url='login')
def cmicuenta(request):
    plat = Plataforma.objects.all()
    return render(request, 'micuenta.html', {'Gen': plat})

@login_required(login_url='login')
def cedDatos(request, username):
    plat = Plataforma.objects.all()
    user = User.objects.get(username=username)
    return render(request, 'edDatos.html', {'Gen': plat, 'User': user})

@login_required(login_url='login')
def edDatos(request):
    usernamel = request.user.username
    username = request.POST['usernameo']
    usern = request.POST['username']
    emailo = request.POST['emailo']
    emailn = request.POST['email']
    npass = request.POST['password']

    user = authenticate(request, username=usernamel, password=npass)

    if(usern != username):
        if User.objects.filter(username=usern).exists():
            messages.error(request, 'El Nombre de Usuario ya esta en uso')
            return redirect('/edDatos/'+username)
    if(emailn != emailo):
        if User.objects.filter(email=emailn).exists():
            messages.error(request, 'El Email ya esta en uso')
            return redirect('/edDatos/'+username)
    if user is not None:
        user = User.objects.get(username=username)
        user.username = usern
        user.email = emailn
        user.save()
        messages.success(request, 'El Usuario se ha Editado Exitosamente')
        return redirect('/cargarcuenta')
    else:
        messages.error(request, 'La Contraseña es Incorrecta')
        return redirect('/edDatos/'+username)
    
def cnewpass(request, username):
    plat = Plataforma.objects.all()
    user = User.objects.get(username=username)
    return render(request, 'contraseña.html', {'Gen': plat, 'User': user})

def newpass(request):
    usernamel = request.user.username
    npass = request.POST['password']
    newpass = request.POST['newpassword']

    user = authenticate(request, username=usernamel, password=npass)

    if user is not None:
        user = User.objects.get(username=usernamel)
        user.set_password(newpass)
        user.save()
        messages.success(request, 'La Contraseña se ha Cambiado Exitosamente')
        return redirect('/cargarcuenta')
    else:
        messages.error(request, 'La Contraseña es Incorrecta')
        return redirect('/cnewpass/'+usernamel)
    
@login_required(login_url='login')
def cdelAcc(request, username):
    plat = Plataforma.objects.all()
    user = User.objects.get(username=username)
    return render(request, 'borrarcuenta.html', {'Gen': plat, 'User': user})

@login_required(login_url='login')
def delAcc(request):
    username = request.user.username
    passw = request.POST['password']

    user = authenticate(request, username=username, password=passw)

    if user is not None:
        if User.objects.filter(username=username).exists():
            user = User.objects.get(username=username)
            user.delete()
            messages.error(request, 'El Usuario ha sido Eliminado Exitosamente.')
            return redirect('login')
        else:
            messages.error(request, 'Usuario no Existe.')
            return redirect('login')
    else:
        messages.error(request, 'La Contraseña Ingresada es Incorrecta')
        return redirect('/cdelAcc/'+ username)
    
@login_required(login_url='login')
def cCarrito(request):
    prod = Producto.objects.all()
    cate = Plataforma.objects.all()
    return render(request, 'carro.html', {'Prod': prod, 'Gen': cate})