# Online Compiler Backend

A prototype backend for an online code execution platform built with **Express**, **Redis**, and **Bun**. The project follows a producer-consumer architecture where API servers enqueue code execution requests and worker processes consume and execute them asynchronously.

## Features

* Asynchronous code execution using Redis queues
* Worker-based architecture for scalable processing
* REST API built with Express
* Fast runtime using Bun
* Queue-based request handling to avoid blocking the API
* Designed to be extended with Docker-based sandboxing, multiple languages, authentication, and persistent storage

## Architecture

```text
            Client
               │
               ▼
        Express API Server
               │
        Push Job to Redis
               │
               ▼
         Redis Queue
               │
               ▼
          Worker Process
               │
      Execute Submitted Code
               │
               ▼
      Return Execution Result
```

## Tech Stack

* Bun
* Express
* Redis
* TypeScript

## Project Structure

```text
.
├── backend/        # Express API
├── worker/         # Worker process that consumes Redis jobs
├── .gitignore
└── README.md
```

## How It Works

1. The client submits source code through the API.
2. The API validates the request.
3. The request is pushed into a Redis queue.
4. A worker continuously listens for new jobs.
5. The worker executes the submitted code.
6. The execution result is returned to the client.

## Getting Started

### Clone the repository

```bash
git clone <https://github.com/SWASTIKpy/online-compiler/>
cd <online-compiler>
```

### Install dependencies

```bash
bun install
```

### Configure environment variables

Create a `.env` file:

```env
REDIS_URL=your_redis_connection_string
```

### Start the API

```bash
bun run backend/index.ts
```

### Start the Worker

```bash
bun run worker/index.ts
```

## Future Improvements

* Docker-based isolated execution
* Multiple programming language support
* Execution time and memory limits
* Secure sandboxing
* Persistent execution history
* Authentication and user accounts
* WebSocket support for real-time execution status
* Horizontal scaling with multiple workers (its too easy with a VPS)

## Disclaimer

This project is a learning prototype and is **not** intended for executing untrusted code in production. A production-ready online compiler should isolate execution using containers or virtual machines and enforce strict resource limits.
