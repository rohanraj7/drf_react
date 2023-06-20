


# Use an official Python runtime as the base image
FROM python:3.9.16-alpine

# Set the working directory in the container
WORKDIR /app


# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1


RUN pip install --upgrade pip 


COPY ./new-backend/requirements.txt .

RUN apk add --no-cache postgresql-dev
RUN pip install --no-cache-dir -r requirements.txt


COPY ./new-backend .
# Copy the requirements file to the container
# Install the Python dependencies
# RUN pip install --no-cache-dir -r requirements.txt
# RUN pip install django
# COPY ./backend/maintance .
# Copy the entire project directory to the container
EXPOSE 8000


# Set the entry point command for the container
# Expose the port that

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]