FROM node:14-alpine

# Set the working directory for project 1
WORKDIR /app/admin

# Copy project 2 files and install dependencies
COPY adminApps ./
RUN npm install
CMD ["npm", "start"]



RUN echo "successfully transferred and started!" > greetings.txt
# Set the default command to start both projects
EXPOSE 4000