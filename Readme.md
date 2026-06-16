# Distributed Job Execution System

## Overview

A distributed job processing platform built using:

* Next.js
* Express.js
* PostgreSQL (Supabase)
* Redis
* BullMQ
* Docker

The system supports job queueing, worker monitoring, automatic recovery, checkpoint-based execution, and retry handling.

---

## Features

* Job creation and monitoring
* Worker registration
* Heartbeat tracking
* Worker crash detection
* Automatic job recovery
* Checkpoint resume
* Retry mechanism
* Priority-based scheduling
* Execution history
* Docker deployment

---

## Tech Stack

| Layer        | Technology                   |
| ------------ | ---------------------------- |
| Frontend     | Next.js, React, Tailwind CSS |
| Backend      | Node.js, Express.js          |
| Database     | PostgreSQL (Supabase)        |
| Queue System | Redis, BullMQ                |
| Deployment   | Docker                       |

---

## Project Structure

frontend/
backend/
docker-compose.yaml

backend/src
backend/worker

---

## Environment Configuration

Create a `.env` file inside backend:

```env
PORT=5000

DATABASE_URL=YOUR_SUPABASE_CONNECTION_STRING

REDIS_HOST=redis
REDIS_PORT=6379

API_URL=http://backend:5000
```

For local development:

```env
API_URL=http://localhost:5000
```

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd project
```

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd frontend
npm install
```

---

## Running Locally

### Start Redis

```bash
docker run -p 6379:6379 redis
```

### Start Backend

```bash
npm start
```

### Start Worker

```bash
npm run worker
```

### Start Frontend

```bash
npm run dev
```

---

## Running with Docker

From project root:

```bash
docker compose up --build
```

Application URLs:

Frontend:
http://localhost:3000

Backend:
http://localhost:5000

---

## Testing Recovery

1. Create a job.
2. Wait until execution starts.
3. Stop worker.
4. Heartbeat monitor detects failure.
5. Job is re-queued.
6. Restart worker.
7. Job resumes from saved checkpoint.

---

## Assumptions

* Redis is available before workers start.
* PostgreSQL is reachable by backend and workers.
* Jobs are idempotent for retry execution.
* Heartbeats are sent periodically.
* Workers can be restarted independently.

---

## API Endpoints

### Jobs

| Method | Endpoint        | Description                           |
| ------ | --------------- | ------------------------------------- |
| POST   | `/api/jobs`     | Create a new job                      |
| GET    | `/api/jobs`     | Get all jobs                          |
| GET    | `/api/jobs/:id` | Get job details and execution history |

### Workers

| Method | Endpoint                 | Description             |
| ------ | ------------------------ | ----------------------- |
| POST   | `/api/workers/register`  | Register a worker       |
| POST   | `/api/workers/heartbeat` | Update worker heartbeat |
| GET    | `/api/workers`           | Get all workers         |


---

## Author

Raktimava Bhattacharyya
