from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .serializer import TaskSerializer,CategoriaSerializer, ProductoSerializer, PrecioSerializer, PedidoSerializer, ConversionDivisaSerializer
from .models import Task, PedidoProducto, Categoria, Producto, Precio, Pedido, ConversionDivisa

# Create your views here.
class TaskView(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()

class CategoriaView(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer

class ProductoView(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

""" @action(detail=True, methods=['post'])
    def add_to_cart(self, request, pk=None):
        producto = self.get_object()
        # Suponiendo que el carro de compras está almacenado en la sesión del usuario
        carro_de_compras = request.session.get('carro_de_compras', [])
        carro_de_compras.append(producto.id)
        request.session['carro_de_compras'] = carro_de_compras
        return Response(status=status.HTTP_200_OK) """

class PrecioView(viewsets.ModelViewSet):
    queryset = Precio.objects.all()
    serializer_class = PrecioSerializer

class PedidoView(viewsets.ModelViewSet):
    queryset = Pedido.objects.all()
    serializer_class = PedidoSerializer

""" @action(detail=True, methods=['post'])
    def checkout(self, request, pk=None):
        pedido = self.get_object()
        carro_de_compras = request.session.get('carro_de_compras', [])
        productos = Producto.objects.filter(id__in=carro_de_compras)
        
        # Calcular el total del pedido
        total = sum([producto.precio for producto in productos])

        # Crear el pedido y asociar los productos
        nuevo_pedido = Pedido.objects.create(usuario=request.user, total=total)
        for producto in productos:
            cantidad = carro_de_compras.count(producto.pk)
            PedidoProducto.objects.create(pedido=nuevo_pedido, producto=producto, cantidad=cantidad, precio=producto.precio)

        # Limpiar el carro de compras
        del request.session['carro_de_compras']
 
        return Response(status=status.HTTP_200_OK)
    """

class ConversionDivisaView(viewsets.ModelViewSet):
    queryset = ConversionDivisa.objects.all()
    serializer_class = ConversionDivisaSerializer

