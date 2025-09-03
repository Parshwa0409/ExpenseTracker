# Expense Tracker Application

A full-stack expense tracking application built with Spring Boot backend and React frontend. This application helps users track their expenses, categorize them, and visualize spending patterns through various charts and analytics.

## Project Structure

```
ExpenseTracker/
├── expenseTracker/          # Spring Boot Backend
└── react-et/expenseTracker/ # React Frontend
```

## Features

- Expense tracking with categories
- Dashboard with visual analytics (Bar, Line, and Pie charts)
- Category management
- Pagination for expense lists
- Form validation
- Toast notifications for user feedback
- Global error handling
- Responsive design

## Prerequisites

Before you begin, ensure you have the following installed:
- Java 21 or higher
- Node.js (Latest LTS version)
- npm or yarn
- Maven

## Backend Setup (Spring Boot)

1. Navigate to the backend directory:
   ```bash
   cd expenseTracker
   ```

2. Build the project:
   ```bash
   ./mvnw clean install
   ```

3. Run the application:
   ```bash
   ./mvnw spring-boot:run
   ```

The backend server will start on `http://localhost:8080`

### Backend Configuration
- The application uses H2 in-memory database
- H2 Console is available at `http://localhost:8080/h2-console`
- Default H2 credentials:
  - JDBC URL: `jdbc:h2:mem:expenseTrackerDB`
  - Username: `sa`
  - Password: ` ` (empty)

## Frontend Setup (React)

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
