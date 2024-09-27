from rest_framework import serializers
from .models import Task, Tag


class TagSerializer(serializers.ModelSerializer):
    COLOR_NAME_TO_HEX = {
        'Red': '#FF0000',
        'Green': '#00FF00',
        'Blue': '#0000FF',
        'Yellow': '#FFFF00',
        'Orange': '#FFA500',
        'White': '#FFFFFF',
    }

    class Meta:
        model = Tag
        fields = ['name', 'color']

    def validate_color(self, value):
        if value in self.COLOR_NAME_TO_HEX:
            return self.COLOR_NAME_TO_HEX[value]
        if value.startswith('#') and len(value) == 7:
            return value
        raise serializers.ValidationError("Invalid color. Please provide a valid code or a known color name.")

    def create(self, validated_data):
        color = validated_data.get('color')
        if color in self.COLOR_NAME_TO_HEX:
            validated_data['color'] = self.COLOR_NAME_TO_HEX[color]
        return super().create(validated_data)


class TaskSerializer(serializers.ModelSerializer):
    tag = TagSerializer(many=True, required=True)

    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'created_at', 'tag', 'completed', 'owner']
        ordering = ['completed']
        read_only_fields = ['owner']

    def create(self, validated_data):
        tags_data = validated_data.pop('tag')  # extracts the tags data from validated_data and removes it from the
        # dictionary
        task = Task.objects.create(**validated_data)
        for data in tags_data:
            color = data.get('color')
            if color in TagSerializer.COLOR_NAME_TO_HEX:
                color = TagSerializer.COLOR_NAME_TO_HEX[color]
            tag, created = Tag.objects.get_or_create(name=data['name'],
                                                     defaults={'color': color})
            task.tag.add(tag)
        return task
