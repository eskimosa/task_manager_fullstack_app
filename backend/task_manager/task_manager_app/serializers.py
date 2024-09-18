from rest_framework import serializers
from .models import Task, Tag


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name', 'color']


class TaskSerializer(serializers.ModelSerializer):
    tag = TagSerializer(many=True, required=True)

    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'created_at', 'tag', 'completed']
        ordering = ['completed']

    def create(self, validated_data):
        tags_data = validated_data.pop('tag')  # extracts the tags data from validated_data and removes it from the
        # dictionary
        task = Task.objects.create(**validated_data)
        for data in tags_data:
            tag, created = Tag.objects.get_or_create(name=data['name'],
                                                     defaults={'color': data.get('color', '#FFFFFF')})
            task.tag.add(tag)
        return task
