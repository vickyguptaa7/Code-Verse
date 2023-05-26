# Code Verse Backend

Welcome to the Code Verse Backend! This backend application is responsible for executing code and returning the output to the Code Verse Code Editor. It provides a secure and isolated environment for running code snippets submitted by users.

## Features

- **Docker Containerization**: The backend is containerized using Docker, providing a lightweight and isolated runtime environment.

- **Non-root Execution**: The child processes responsible for executing user code run in a non-root context. This helps mitigate the impact of any potential vulnerabilities or exploits within the executed code.

- **Rate Limiter**: A rate limiter is in place to prevent excessive requests from a single client or IP address, protecting against abuse and potential Denial of Service (DoS) attacks.

- **Speed Limiter**: To prevent abuse and resource exhaustion, a speed limiter restricts the rate at which code executions can occur. This helps maintain optimal performance and ensures fair resource allocation.

## Prerequisites

Before proceeding with the Docker setup, make sure you have the following prerequisites installed on your system:

- Docker - Version 19.03 or higher

## Docker Setup

To set up the Code Verse Backend using Docker, follow these steps:

1. Clone the Code Verse repository

```bash
git clone <repository_url>
```

2. Change to the `back-end` directory:

   ```bash
   cd Code-Verse/back-end
   ```

3. Build the Docker image:

   ```bash
   docker build -t code-verse-backend .
   ```

This command builds the Docker image using the provided `Dockerfile`. The `-t` flag assigns a tag (name) to the image, in this case, `code-verse-backend`.

4. Build the Docker image:

   ```bash
   docker run -p 3000:3000 -d code-verse-backend
   ```

   This command starts a new Docker container based on the previously built image. The `-p` flag maps port `3000` of the host system to port `3000` of the container. The `-d` flag runs the container in detached mode.

Now, the Code Verse Backend is up and running inside a Docker container.

5. Access the Code Verse Backend:
   You can now access the Code Verse Backend API using the following URL:

   ```bash
   docker run -p 3000:3000 -d code-verse-backend
   ```

   The backend is listening on port `3000` of your local machine.

## Stopping the Container

To stop the Code Verse Backend container, use the following command:

    docker stop <container_id>

Replace `<container_id>` with the actual container ID or container name. You can find the container ID or name by running `docker ps` and looking for the corresponding Code Verse Backend container.

## API Endpoints

The Code Verse Backend exposes the following API endpoints:

- `POST /api/execute`: Executes a code snippet and returns the output.

  Request header (JSON):

  ```json
  {
    "Content-Type": "application/json",
    "x-api-key": "YOUR_API_KEY"
  }
  ```

  Request body (JSON):

  ```json
  {
    "language": "<code language>",
    "code": "<code snippet>",
    "input": "<code input>"
  }
  ```

  Response body (JSON):

  ```json
  {
    "output": "<output of the code snippet>",
    "error": "<error if any occured>",
    "executionTime": "<code execution time>"
  }
  ```

Javascript example of making an API call

```javascript
const fetchAPI = async () => {
  const code = JSON.stringify({
    language: "javascript",
    code: 'console.log("Hello, Code Verse!");',
    input: "",
  });

  const headers = {
    "Content-Type": "application/json",
    "x-api-key": "YOUR_API_KEY",
  };

  try {
    const response = await fetch("https://api.example.com/api/execute", {
      method: "POST",
      headers: headers,
      body: code,
    });

    if (!response.ok) {
      throw new Error("Request failed with status " + response.status);
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};
fetchAPI();
```
