from rest_framework import serializers
from .models import Categoria, Producto, Carro, CarroProducto, Pedido, PedidoProducto

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'

class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = '__all__'

class CarroProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarroProducto
        fields = '__all__'

class CarroSerializer(serializers.ModelSerializer):
    productos = CarroProductoSerializer(many=True, read_only=True)

    class Meta:
        model = Carro
        fields = '__all__'

class PedidoProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PedidoProducto
        fields = '__all__'

class PedidoSerializer(serializers.ModelSerializer):
    productos = PedidoProductoSerializer(many=True, read_only=True)

    class Meta:
        model = Pedido
        fields = '__all__'
