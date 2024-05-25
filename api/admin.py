from django.contrib import admin
from .models import Task, Producto, Categoria
# Register your models here.
admin.site.register(Task)
admin.site.register(Producto)
admin.site.register(Categoria)