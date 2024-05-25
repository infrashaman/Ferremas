from django.db import models
from django.contrib.auth.models import User

#Modelo Tarea
class Task(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    done = models.BooleanField(default=False)

    def __str__(self):
        return self.title
    
#Modelo Producto
class Categoria(models.Model):
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre

class Producto(models.Model):
    codigo = models.CharField(max_length=50, unique=True)
    nombre = models.CharField(max_length=200)
    descripcion = models.TextField()
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE, related_name='productos')
    marca = models.CharField(max_length=100)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.nombre} - {self.marca}"
    
#Modelo Precio
class Precio(models.Model):
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE, related_name='precios')
    fecha = models.DateTimeField(auto_now_add=True)
    valor = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.producto.nombre} - {self.valor}"

#Modelo Pedido
class Pedido(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    productos = models.ManyToManyField(Producto, through='PedidoProducto')
    fecha = models.DateTimeField(auto_now_add=True)
    total = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Pedido {self.pk} - {self.usuario.username}"

#Modelo PedidoProducto
class PedidoProducto(models.Model):
    pedido = models.ForeignKey(Pedido, on_delete=models.CASCADE)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.PositiveIntegerField()
    precio = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.producto.nombre} - {self.cantidad} unidades"

#Modelo Conversion de Divisas
class ConversionDivisa(models.Model):
    fecha = models.DateTimeField(auto_now_add=True)
    moneda_origen = models.CharField(max_length=3)
    moneda_destino = models.CharField(max_length=3)
    tasa_conversion = models.DecimalField(max_digits=10, decimal_places=4)

    def __str__(self):
        return f"{self.moneda_origen} a {self.moneda_destino} - {self.tasa_conversion}"
