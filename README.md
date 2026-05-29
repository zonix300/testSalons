# Salon Directory Application

## Overview

This project is a full-stack web application for browsing and managing salon information. It integrates external data sources (Google Places API), stores enriched data in a PostgreSQL database, and provides a modern UI for viewing and editing salon details.

The system is split into:

* Backend: Spring Boot REST API
* Frontend: React + Vite application

---

## How to Run the Application

### Prerequisites

* Java 17+
* Node.js 18+
* PostgreSQL database
* Maven wrapper (included in backend)

---

### Backend (Spring Boot)

From the `backend/` directory:

```bash
./mvnw spring-boot:run
```

The backend will start on:

```
http://localhost:8080
```

Make sure to configure your database connection in:

```
backend/src/main/resources/application.properties
```

---

### Frontend (React + Vite)

From the `frontend/` directory:

```bash
npm install
npm run dev
```

The frontend will start on:

```
http://localhost:5173
```

---

## Technical Solution

### Backend

* **Spring Boot** – core backend framework for REST API
* **Java 17** – primary language
* **Maven** – build and dependency management
* **MapStruct** – object mapping between entities and DTOs
* **PostgreSQL** – persistent storage for salon data
* **Google Places API** – external data source for salon information

The backend is responsible for:

* Fetching and enriching salon data from external APIs
* Storing and managing salon records
* Exposing REST endpoints for frontend consumption

---

### Frontend

* **React (TypeScript)** – UI framework
* **Vite** – fast development build tool
* **shadcn/ui** – component library for consistent UI design
* **JavaScript / TypeScript** – application logic and typing

The frontend provides:

* Salon listing view
* Salon detail view
* Editable forms for salon data
* Basic UI structure for future filtering and search improvements

---

## What I Would Improve With More Time

If given more time, I would focus on the following improvements:

### Data Quality & Backend

* Improve data enrichment from Google Places API (deduplication, normalization, validation)
* Add caching layer for external API calls
* Improve error handling and resilience for external services
* Introduce pagination and advanced filtering (district, rating, services)

### Frontend

* Improve UI/UX consistency and responsiveness
* Add proper loading and skeleton states
* Add form validation (e.g. Zod or React Hook Form)
* Improve state management for complex editing flows

### Testing & Quality

* Add unit tests for service layer (JUnit + Mockito)
* Add integration tests for REST endpoints (Spring Boot Test / Testcontainers)
* Add frontend component tests (React Testing Library)

### Infrastructure

* Dockerize backend, frontend, and database for one-command startup
* Add CI pipeline (GitHub Actions)
* Environment-based configuration separation (dev / prod)

---

## Summary

This project demonstrates a full-stack architecture combining external API integration, backend data processing, and a modern React-based UI. The focus was on clean structure, extensibility, and realistic production-style layering.
