from django.urls import include, path
from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from api import views

router = routers.DefaultRouter()
router.register(r"tasks", views.TaskView, "tasks")
router.register(r'productos', views.ProductoView, "productos")
router.register(r'categorias', views.CategoriaView, 'categorias')
router.register(r'precios', views.PrecioView, 'precios')
router.register(r'pedidos', views.PedidoView, 'pedidos')
router.register(r'conversiones-divisa', views.ConversionDivisaView, 'conversiones-divisa')


urlpatterns = [
    path("api/v1/", include(router.urls)),
    path('docs/', include_docs_urls(title='Ferremas API')),
]