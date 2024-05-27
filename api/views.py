from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Categoria, Producto, Carro, CarroProducto, Pedido, PedidoProducto
from .serializer import CategoriaSerializer, ProductoSerializer, CarroSerializer, PedidoSerializer

class CategoriaView(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer

class ProductoView(viewsets.ModelViewSet):
    queryset = Producto.objects.filter(activo=True)
    serializer_class = ProductoSerializer

class CarroView(viewsets.ModelViewSet):
    queryset = Carro.objects.all()
    serializer_class = CarroSerializer

    @action(detail=True, methods=['post'])
    def agregar_producto(self, request, pk=None):
        carro = self.get_object()
        producto_id = request.data.get('producto_id')
        cantidad = request.data.get('cantidad', 1)
        producto = Producto.objects.get(id=producto_id)
        CarroProducto.objects.create(carro=carro, producto=producto, cantidad=cantidad)
        return Response({'status': 'producto agregado'}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'])
    def finalizar_pedido(self, request, pk=None):
        carro = self.get_object()
        productos = CarroProducto.objects.filter(carro=carro)
        total = sum([item.producto.precio * item.cantidad for item in productos])
        pedido = Pedido.objects.create(usuario=carro.usuario, total=total)
        for item in productos:
            PedidoProducto.objects.create(pedido=pedido, producto=item.producto, cantidad=item.cantidad)
        productos.delete()

        # Crear un nuevo carrito vacío después de finalizar el pedido
        nuevo_carro = Carro.objects.create(usuario=carro.usuario)
        
        return Response({'status': 'pedido finalizado', 'total': total, 'nuevo_carro_id': nuevo_carro.pk}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['put'])
    def update_carro(self, request, pk=None):
        carro = self.get_object()
        serializer = self.get_serializer(carro, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
