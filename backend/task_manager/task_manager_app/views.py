from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.exceptions import PermissionDenied

from .models import Task, Tag
from .serializers import TaskSerializer, TagSerializer


# Create your views here.
class TaskViewSet(viewsets.ViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def list(self, request):
        queryset = Task.objects.filter(owner=request.user)
        serializer = TaskSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        try:
            task = Task.objects.get(pk=pk)
        except Task.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = TaskSerializer(task)
        return Response(serializer.data)

    def create(self, request):
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(owner=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk=None):
        try:
            task = Task.objects.get(pk=pk)
        except Task.DoesNotExist:
            return Response({'detail': 'Task not found'}, status=status.HTTP_404_NOT_FOUND)
        if task.owner != request.user:
            raise PermissionDenied("You do not have permission to delete this task.")
        task.delete()
        return Response({'detail': 'Task deleted successfully'}, status=status.HTTP_204_NO_CONTENT)


class TagAutoFillView(viewsets.ViewSet):
    def list(self, request):
        query = request.query_params.get('q', '')
        if query:
            tags = Tag.objects.filter(name__icontains=query)
            serializer = TagSerializer(tags, many=True)
            return Response(serializer.data)
        return Response([])
