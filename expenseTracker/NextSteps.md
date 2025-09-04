# Next Steps for Expense Tracker Project

## 2. Add Validation
- Use `@Valid` and validation annotations (e.g., `@NotNull`, `@Size`) in DTOs to ensure incoming data is correct.

## 3. Handle Nulls and Errors Gracefully
- Throw a custom exception and handle it with `@ControllerAdvice` for better error responses.

## 9. Add Unit and Integration Tests
- Expand beyond the basic test class (`ExpenseTrackerApplicationTests.java`).
- Add more tests for services and controllers.

## 10. Document Your API
- Use Swagger/OpenAPI (`springdoc-openapi`) to auto-generate API documentation.

## Budget Implementation
- Each budget is linked to a category and stores month and year for historical tracking.
- When editing a budget for a category, update the current month’s budget if it exists; otherwise, create a new one for the current month.
- When loading categories, always select the latest budget for each category using a query: where year and month <= current year/month, order by year/month desc, limit 1.
- Users cannot edit old budgets, only the current month’s budget.
- This approach supports clear monthly analytics and budget utilization.
- DTOs are used to keep API responses compatible with the existing frontend.