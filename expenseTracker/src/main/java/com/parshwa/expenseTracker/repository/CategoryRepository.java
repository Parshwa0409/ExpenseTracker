package com.parshwa.expenseTracker.repository;

import com.parshwa.expenseTracker.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
    // Custom query methods can be added here if needed
    @Query("SELECT COUNT(e) FROM Expense e WHERE e.category.id = :categoryId")
    long countExpensesByCategoryId(int categoryId);
}
