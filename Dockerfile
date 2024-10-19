# Use the official Node.js image.
FROM node:20

# Set the working directory in the container.
WORKDIR /app

# Copy package.json and package-lock.json.
COPY package*.json ./

# Install dependencies.
RUN npm install

# Copy the rest of the application code.
COPY . .

# Expose the port your app runs on.
EXPOSE 5001
EXPOSE 5002

# Delay the start by 10 seconds, wait for the database to be ready
CMD sh -c "sleep 10 && npm start"