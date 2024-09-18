FROM python:latest

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

RUN apt-get update \
    && apt-get install -y --no-install-recommends gcc

COPY ./backend/task_manager/requirements/requirements.prod.txt .
RUN pip install --no-cache-dir -r requirements.prod.txt

COPY ./backend/task_manager .

RUN python manage.py collectstatic --noinput

EXPOSE 8000

CMD ["python3", "manage.py", "runserver"]