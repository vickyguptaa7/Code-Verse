# Use Alpine Linux as the base image
FROM alpine:latest

# Install system dependencies
RUN apk update && \
    apk add --no-cache \
        gcc \
        g++ \
        python3 \
        openjdk17 \
        nodejs \
        npm \
        curl && \
    rm -rf /var/cache/apk/*

WORKDIR /app

# Copy package.json 
COPY package.json .

# Install Node.js dependencies
RUN npm install --only=production

# Copy the rest of the app's source code
COPY . .

# Expose port 6000
EXPOSE 6000

# Run the app in production mode
CMD ["npm", "run","prod"]