FROM ubuntu:20.04

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update && \ 
    apt-get install -y build-essential build-essential gcc g++ python3 python3-pip openjdk-11-jdk nodejs npm && \
    rm -rf /var/lib/apt/lists/*


COPY . /app
WORKDIR /app

RUN npm install 

EXPOSE 6000

CMD ["npm", "run","dev"]