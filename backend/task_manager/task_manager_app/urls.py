from django.urls import path, include
from .views import TaskViewSet, TagAutoFillView, TagsViewSet

urlpatterns = [
    path('list_tasks/', TaskViewSet.as_view({'get': 'list'}), name='tasks'),
    path('get_task/<pk>/', TaskViewSet.as_view({'get': 'retrieve'}), name='retrieve_task'),
    path('add_task/', TaskViewSet.as_view({'post': 'create'}), name='create_task'),
    path('tags_autofill/', TagAutoFillView.as_view({'get': 'list'}), name='tag_autofill'),
    path('tags/', TagsViewSet.as_view({'get': 'list'}), name='tags'),
    # path('auth/', include('task_manager_app.authentication.urls')),
]