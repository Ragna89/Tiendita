from django.shortcuts import render, redirect
from .models import *
from django.conf import settings
from .forms import RegisterForm
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
import os
import json
from django.contrib import messages
from django.http import HttpResponse, JsonResponse

# Create your views here.
def cargarinicio(request):
    productos = Producto.objects.all()
    return render(request, "index.html", {"Prod": productos })

def cargaragregar(request):
    genero = Genero.objects.all()
    return render(request, "agregar.html", {"Gen": genero})

def cargareditar(request, id):
    genero = Genero.objects.all()
    productos = Producto.objects.get(p_id = id)
    gen_id = productos.id_c
    prodgen_id = Genero.objects.get(c_id = gen_id.c_id).c_id
    return render(request, "editarjuego.html", {"Prod": productos, "Gen": genero, "Gen_id": prodgen_id})

def cargarjuegoo(request, id):
    producto = Producto.objects.get(p_id = id)
    productos = Producto.objects.all()
    ultimosagr = Producto.objects.order_by('-p_fecha')[:5]
    genero = Genero.objects.all()
    gen_id = producto.id_c
    prodgen_id = Genero.objects.get(c_id = gen_id.c_id).c_id
    return render(request, "basejuego.html", {'Prod': producto, 'Gen': genero, 'Gen_id': prodgen_id, 'Produ': productos, 'Ultprod': ultimosagr})

def cargarlista(request):
    producto = Producto.objects.all()
    genero = Genero.objects.all()
    return render(request, "listaproducto.html", {'Prod': producto, 'Gen': genero})


def agregarprod(request):
    agr_titulo = request.POST['titulo']
    agr_precio = request.POST['precio']
    agr_stock = request.POST['stock']
    agr_genero = Genero.objects.get(c_id = request.POST['genero'])
    agr_desarrollador = request.POST['desarrollador']
    agr_descripcion = request.POST['descripcion']
    agr_imagen = request.FILES['imagen']

    id_cat = request.POST.get('genero')

    gen = Genero.objects.get(c_id = id_cat)
    conter = Producto.objects.filter(id_c = gen).count()
    agr_id = int(id_cat + '0' + str(conter + 1))

    Producto.objects.create(
        p_id = agr_id,
        p_titulo = agr_titulo,
        p_precio = agr_precio,
        id_c = agr_genero,
        p_stock = agr_stock,
        p_des = agr_desarrollador,
        p_desc = agr_descripcion,
        p_img = agr_imagen)
    
    return redirect('/jagregar')

def obInfProd(request):
    pro_id = request.GET.get('id')
    producto = Producto.objects.get(p_id=pro_id)

    producto_info = {
        'name': producto.p_titulo
    }
    return JsonResponse(producto_info)

def delProduct(request,id):
    product = Producto.objects.get(p_id = id)
    product.delete()
    img_rute  = os.path.join(settings.MEDIA_ROOT, str(product.p_img))
    os.remove(img_rute)

    messages.error(request, 'El Producto ha sido Eliminado Exitosamente.')

    return redirect('/listaproductos')

def editProd(request):
    ed_id = request.POST['SKU']
    BProduct = Producto.objects.get(p_id = ed_id)
    edit_titulo = request.POST['titulo']
    edit_precio = request.POST['precio']
    edit_stock = request.POST['stock']
    edit_genero = Genero.objects.get(c_id = request.POST['genero'])
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

def cUserlist(request):
    usuarios = User.objects.all()
    return render(request, "Userlist.html", {"Users": usuarios})

def obInfUser(request):
    use_id = request.GET.get('id')
    usuario = User.objects.get(username=use_id)

    user_info = {
        'name': usuario.username
    }
    return JsonResponse(user_info)


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


