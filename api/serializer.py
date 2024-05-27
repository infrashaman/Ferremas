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

class CarroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Carro
        fields = '__all__'

class CarroProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarroProducto
        fields = '__all__'

class PedidoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pedido
        fields = '__all__'

class PedidoProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PedidoProducto
        fields = '__all__'
