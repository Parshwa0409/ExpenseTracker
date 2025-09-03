# Next Steps for Expense Tracker Project

## 1. Use DTOs for API Requests/Responses
- Avoid using entities like `Expense` and `Category` directly in controllers.
- Use DTOs for request/response payloads to decouple your API from the database model and simplify validation.
- Refer to `DTO.md` for examples.

## 2. Add Validation
- Use `@Valid` and validation annotations (e.g., `@NotNull`, `@Size`) in DTOs to ensure incoming data is correct.

## 3. Handle Nulls and Errors Gracefully
- Do not return `null` when an entity is not found.
- Throw a custom exception and handle it with `@ControllerAdvice` for better error responses.

## 4. Use Optional in Repository Methods
- Prefer returning `Optional<Category>` instead of `findById(id).orElse(null)`.
- Handle missing entities properly.

## 5. Avoid Repeated Database Calls
- In `ExpenseService`, avoid fetching the category twice in `updateExpense`.
- Fetch once and reuse.

## 6. Use Lombok for DTOs
- Add Lombok annotations (`@Getter`, `@Setter`, constructors) to DTOs like `CategorySummaryDto` to reduce boilerplate.

## 7. Consistent API Naming
- Use plural nouns for REST endpoints (e.g., `/api/categories`, `/api/expenses`).

## 8. Pagination for Large Lists
- Add pagination support using Spring Data's `Pageable` for endpoints returning lists (e.g., all expenses).

## 9. Add Unit and Integration Tests
- Expand beyond the basic test class (`ExpenseTrackerApplicationTests.java`).
- Add more tests for services and controllers.

## 10. Document Your API
- Use Swagger/OpenAPI (`springdoc-openapi`) to auto-generate API documentation.