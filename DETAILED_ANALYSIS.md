# Expense Tracker: Potential Breakpoints & Improvements

## Backend (Spring Boot)
- Database connection issues (container not running, wrong credentials)
- Data consistency (missing/incorrect schema.sql or data.sql)
- Unhandled exceptions in controllers/services
- DTO/entity mapping errors
- Pagination logic (out-of-bounds page numbers)
- No authentication/authorization
- Input validation missing
- Edge cases: deleting categories with expenses, large datasets, race conditions

## Frontend (React)
- API failure (backend down, error responses)
- Pagination UI breaks if pageCount is 0/negative
- State management issues (loading/submitting not reset)
- Form validation gaps
- Incorrect component props
- Network latency handling
- Dependency issues (npm packages)
- Edge cases: deleting last item on page, stale data, rapid clicking

## Docker & DevOps
- Container startup order (backend before DB)
- Port conflicts (8080, 3307)
- Volume persistence
- Environment variable issues

## General Recommendations
- Add authentication/authorization
- Add input validation (frontend & backend)
- Improve error messages/user feedback
- Add backend logging
- Write automated tests
- Use env vars for sensitive data
- Document API endpoints
- Monitor resource usage
