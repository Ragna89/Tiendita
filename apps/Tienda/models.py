from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Genero(models.Model):
    c_id = models.IntegerField(primary_key=True, unique=True)
    c_genero = models.CharField(max_length=50, null=False)
    
    def __str__(self):
        txt = "{0}"
        return txt.format(self.c_genero)

class Producto(models.Model):
    p_id = models.IntegerField(primary_key=True, unique=True)
    p_titulo = models.CharField(max_length=100, null=False)
    p_precio = models.IntegerField(null=False)
    id_c = models.ForeignKey(Genero, on_delete=models.CASCADE)
    p_des = models.CharField(max_length=50, null=False)
    p_desc = models.CharField(max_length=1000, null=False)
    p_stock = models.IntegerField(null=False)
    p_img = models.ImageField(upload_to='img_prod')
    p_fecha = models.DateField(auto_now_add=True)

    def __str__(self):
        txt = "Codigo: {0} | Titulo: {1} | Genero: {2} | Stock: {3} | Fecha: {4}"
        return txt.format(self.p_id, self.p_titulo, self.id_c, self.p_stock, self.p_fecha)