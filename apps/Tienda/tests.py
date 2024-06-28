from django.test import TestCase
from apps.Tienda.models import Producto, Plataforma

# Create your tests here.
class PlataformaModelTest(TestCase):

    def setUp(self):
        self.plataforma = Plataforma.objects.create(c_id=1, c_plataforma="Plataforma de prueba")

    def test_crear_plataforma(self):
        plataforma = Plataforma.objects.get(c_id=1)
        self.assertEqual(plataforma.c_plataforma, "Plataforma de prueba")

    def test_str_plataforma(self):
        plataforma = Plataforma.objects.get(c_id=1)
        expected_str = "Plataforma de prueba"
        self.assertEqual(str(plataforma), expected_str)

class ProductoModelTest(TestCase):

    def setUp(self):
        self.plataforma = Plataforma.objects.create(c_id=1, c_plataforma="Plataforma de prueba")
        self.producto = Producto.objects.create(
            p_id=1,
            p_titulo="Producto de prueba",
            p_precio=1000,
            id_c=self.plataforma,
            p_des="Descripción corta de prueba",
            p_desc="Descripción larga de prueba",
            p_stock=10,
            p_img="img_prod/prueba.jpg"
        )

    def test_crear_producto(self):
        producto = Producto.objects.get(p_id=1)
        self.assertEqual(producto.p_titulo, "Producto de prueba")
        self.assertEqual(producto.p_precio, 1000)
        self.assertEqual(producto.id_c, self.plataforma)
        self.assertEqual(producto.p_des, "Descripción corta de prueba")
        self.assertEqual(producto.p_desc, "Descripción larga de prueba")
        self.assertEqual(producto.p_stock, 10)
        self.assertEqual(producto.p_img, "img_prod/prueba.jpg")

    def test_str_producto(self):
        producto = Producto.objects.get(p_id=1)
        expected_str = "Codigo: 1 | Titulo: Producto de prueba | Genero: Plataforma de prueba | Stock: 10 | Fecha: {0}".format(producto.p_fecha)
        self.assertEqual(str(producto), expected_str)
