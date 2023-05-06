# Use Alpine Linux as the base image
FROM alpine:latest

# Install system dependencies
RUN apk update && \
    apk add --no-cache \
        gcc \
        g++ \
        python3 \
        python3-dev \
        py3-pip \
        openjdk11 \
        nodejs \
        npm \
        curl && \
    rm -rf /var/cache/apk/*

WORKDIR /app

# Copy package.json 
COPY package.json .

# Install Node.js dependencies
RUN npm install 

# Install TypeScript
RUN npm install -g typescript

# Copy the rest of the app's source code
COPY . .

# Build the app
RUN tsc -p .

# Expose port 6000
EXPOSE 6000

# Run the app in production mode
CMD ["npm", "run","prod"]