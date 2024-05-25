from rest_framework import serializers
from .models import Task, Categoria, Producto, Precio, Pedido, PedidoProducto, ConversionDivisa

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        # fields = ('id', 'title', 'description', 'done')
        fields = '__all__'

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'

class ProductoSerializer(serializers.ModelSerializer):
    categoria = serializers.PrimaryKeyRelatedField(queryset=Categoria.objects.all())

    class Meta:
        model = Producto
        fields = '__all__'

class PrecioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Precio
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

class ConversionDivisaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConversionDivisa
        fields = '__all__'

