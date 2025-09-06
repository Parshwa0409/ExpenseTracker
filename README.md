
# Expense Tracker Application

A full-stack expense tracking application built with Spring Boot (backend) and React (frontend). Track expenses, manage categories, and visualize spending patterns with interactive charts and analytics.

## Features

- Expense tracking with category assignment
- Dashboard with Bar, Line, and Pie charts
- Category management (add, edit, delete)
- Pagination for expense lists
- Form validation and toast notifications
- Global error handling
- Responsive Material-UI design
- Containerized backend with MySQL using Docker

## Technologies Used

**Backend:**
- Spring Boot 3.5.5
- Spring Data JPA
- MySQL (via Docker)
- Java 21

**Frontend:**
- React 19
- React Router DOM
- Material-UI
- Chart.js & React-Chartjs-2
- React Hook Form
- Axios
- React Toastify
- Vite

**DevOps:**
- Docker & Docker Compose
- Maven

## Project Structure

```
ExpenseTracker/
├── expenseTracker/          # Spring Boot Backend (with Docker)
└── react-et/expenseTracker/ # React Frontend
```

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Parshwa0409/ExpenseTracker.git
cd ExpenseTracker
```

### 2. Start MySQL Database with Docker

```bash
cd expenseTracker
docker compose up -d
```
- MySQL runs on port 3307 (host) → 3306 (container)
- Credentials:
   - Database: expense_tracker
   - User: app_user / app_pass_123
   - Root: root / root_pass_123

### 3. Backend Setup (Spring Boot)

```bash
cd expenseTracker
./mvnw clean install
./mvnw spring-boot:run
```
- The backend server starts at `http://localhost:8080`
- H2 Console (for dev): `http://localhost:8080/h2-console`
- MySQL is used for persistent storage (see `docker-compose.yml`)

### 4. Frontend Setup (React)

```bash
cd ../react-et/expenseTracker
npm install
npm run dev
```
- The frontend starts at `http://localhost:5173`

### 5. Database Initialization & Troubleshooting

If you need to reset the database:
```bash
docker compose down -v
docker compose up -d
```
To connect to MySQL container:
```bash
docker exec -it expense-tracker-db mysql -uroot -proot_pass_123
```

## API Endpoints

- `/api/categories` - Category CRUD
- `/api/expenses` - Expense CRUD & pagination
- `/api/dashboard` - Analytics data

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

1. Navigate to the frontend directory:
   ```bash
   cd react-et/expenseTracker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend application will start on `http://localhost:5173`

## Technologies Used

### Backend
- Spring Boot 3.5.5
- Spring Data JPA
- H2 Database
- Java 21

### Frontend
- React 19
- React Router DOM
- Material-UI
- Chart.js & React-Chartjs-2
- React Hook Form
- Axios
- React Toastify
- Vite

## API Endpoints

The backend provides RESTful APIs for:
- Categories management
- Expense tracking
- Dashboard analytics

## Development

### Backend Development
- The backend uses Spring Boot's standard project structure
- Database schema is automatically created using JPA
- Initial data is loaded from `data.sql`

### Frontend Development
- Uses Vite for fast development experience
- Implements component-based architecture
- Global state management for errors and notifications
- Responsive Material-UI components

## Building for Production

### Backend
```bash
cd expenseTracker
./mvnw clean package
```

### Frontend
```bash
cd react-et/expenseTracker
npm run build
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).
