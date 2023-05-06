FROM ubuntu:20.04

# Install noninteractive mode
ENV DEBIAN_FRONTEND noninteractive

# Install system dependencies
RUN apt-get update && \ 
    apt-get install -y gcc python3 python3-pip openjdk-11-jdk nodejs npm curl && \
    rm -rf /var/lib/apt/lists/*

# Install Node Version Manager and Node.js version 18.16.0
ENV NODE_VERSION=18.16.0
RUN curl https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"

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