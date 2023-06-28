from django.urls import path
from . import views

urlpatterns = [
    path('', views.cargarinicio, name='inicio'),
    path('jagregar', views.cargaragregar),
    path('agregarprod', views.agregarprod),
    path('producto/<id>', views.cargarjuegoo),
    path('borrarproducto/<id>', views.delProduct),
    path('obtenerproducto', views.obInfProd),
    path('listaproductos', views.cargarlista),
    path('editarproducto/<id>',views.cargareditar),
    path('jeditar', views.editProd),
    path('search/', views.buscar_productos, name='buscar_productos'),
    path('login', views.cLogin, name='login'),
    path('register', views.cRegister),
    path('logout', views.logout_view),
    path('userlist', views.cUserlist, name="ListaUsuarios"),
    path('obtainUser', views.obInfUser),
    path('delUser/<username>', views.delUser),
]