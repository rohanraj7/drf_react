FROM node:14-alpine

# Set the working directory for project 1
WORKDIR /app/users

# Copy project 1 files and install dependencies
COPY userApp ./
RUN npm install -g serve
CMD ["serve", "-s"]

RUN echo "successfully transferred and started!" > greetings.txt
# Set the default command to start both projects
EXPOSE 3000
