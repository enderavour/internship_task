# Course Progress Tracker Application

### 1. Run the project 
In order to download, build and run the project:
- Clone it from GitHub:
```cmd
git clone https://github.com/enderavour/internship_task.git && cd internship_task
```
- Navigate to backend and create .env:
```cmd
cd backend && cp .env.sample .env
```
- Run the application
```
cd .. && docker compose up --build
```
- Run initial Prisma migration (parallel terminal session, or the same if started Docker with -d flag)
```cmd
docker compose exec backend npx prisma migrate dev --name init
```
- Navigate to browser search bar and open 
```
http://localhost:3000/
```

### 2. Techologies used:
Backend:
- Express.js (backend framework)
- Prisma (ORM)
- Zod (data validation library)
- cors package for CORS
- dotenv package for reading .env files

Frontend:
- Emotion library
- Material UI
- React 
- Vite
- Redux Toolkit 
- RTK Query
- ESLint

### 3. API Endpoints
Courses: 
- GET /courses
- POST /courses
- DELETE /courses/:id

- GET /courses/:courseId/lessons
- POST /courses/:courseId/lessons
- PATCH /lessons/:id
- DELETE /lessons/:id

### 4. Database description
PostgreSQL DBMS was used as the main database, with Prisma ORM working on top of it in backend part. There are two relations in the database - courses and lessons. Each course can have multiple lessons, and lesson completion status is stored in the database. The name of the database: courses_db. PostgreSQL data is persisted using a Docker named volume.

### 5. Docker description
Docker Compose is configured to run the frontend, backend and PostgreSQL database as separate services. The frontend runs on port 3000, the backend on port 4000, and the PostgreSQL uses port 5432 inside the Docker container. A named Docker volume is used to persist database data. 

### 6. Completed 
Backend: 
- All mandatory REST API endpoints 
- Data validation on create/update operations
- Database models attribute conformance
- Recommended practices and instrumens used (e.g. Node.js, PostgreSQL)
- Recommended configurations used

Frontend:
- All UI requirements
- Progress formula (Frontend side)
- Docker integration

### 7. Not completed
Optional endpoints:
- GET    /courses/:id
- PATCH  /courses/:id<br>
Optional description in lesson

### 8. AI usage
AI was used to some extent in both frontend and backend, as well as suggestions for project structure and work with unexperienced language (Prisma language, schema.prisma). Additionally AI was used for faster error analysis and debugging of errors during backend setup. 

- AI tool used: ChatGPT
- Example promts: 
1. I wrote these CRUD operations: *code*. How do I perform entered data validation before executing these operations?
2. How do I setup the names for the tables in database in schema.prisma script?
3. Why does DELETE /courses/5 not work in this case? *I also provide DevConsole and backend logs information* 
- I manually rewrote Frontend into Material UI (instead of generated plain HTML), changed Prisma configuration according to documentation, was writing RTK Query queries and mutations according to documentations, manually wrote Zod schemas and partially wrote Controllers code (according to documentation, also used partially AI and checked if the AI code was conformant to Express.js documentation code)
- Difficulties were unifying backend and frontend after created them, fixing all errors that I encountered and ensuring that applications works properly.
