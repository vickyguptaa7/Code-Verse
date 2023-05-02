FROM ubuntu:20.04

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update && \ 
    apt-get install -y build-essential build-essential gcc g++ python3 python3-pip openjdk-11-jdk nodejs npm && \
    rm -rf /var/lib/apt/lists/*


COPY . /app

WORKDIR /app

# Install Node.js dependencies
RUN npm install 

# Install TypeScript
RUN npm install -g typescript

# Build the app
RUN tsc -p .

# Expose port 6000
EXPOSE 6000

# Run the app in production mode
CMD ["npm", "run","prod"]