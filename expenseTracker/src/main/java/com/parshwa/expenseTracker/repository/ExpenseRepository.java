package com.parshwa.expenseTracker.repository;

import com.parshwa.expenseTracker.dto.CategorySummaryDto;
import com.parshwa.expenseTracker.model.Expense;
import com.parshwa.expenseTracker.dto.MonthlyTrendDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Integer> {
    List<Expense> findByTitleContaining(String keyword);

    // This is JPQL (Java Persistence Query Language), not raw SQL. In JPQL, you use entity relationships instead of table joins.
    // If you don't use a constructor in JPQL query, the result is a List<Object[]>, so you must manually map each array to your DTO. This can lead to errors, boilerplate code, and type safety issues.
    // @Query("SELECT c.emoji, c.name AS category, SUM(e.amount) AS totalExpense, c.budget AS budget FROM Expense e JOIN e.category c WHERE YEAR(e.date) = :year AND MONTH(e.date) = :month GROUP BY c.id, c.name")

    //org.springframework.core.convert.ConverterNotFoundException: No converter found capable of converting from type [java.lang.String] to type [com.parshwa.expenseTracker.model.CategoryUtilizationDto] => Because of no constructor in dto class to convert the Object[] to CategoryUtilizationDto
    // A JPQL with constructor  (SELECT new ...) directly returns a list of DTOs by calling the matching constructor. This eliminates manual mapping, reduces errors, and makes your code cleaner and more maintainable.
    @Query("SELECT new com.parshwa.expenseTracker.dto.CategorySummaryDto(c.emoji, c.name, SUM(e.amount), c.budget) FROM Expense e JOIN e.category c WHERE YEAR(e.date) = :year AND MONTH(e.date) = :month GROUP BY c.id, c.name")
    List<CategorySummaryDto> getCategoryUtilization(@Param("year") int year, @Param("month") int month);

    // SELECT YEAR(date) AS year,MONTH(date) AS month, SUM(amount) AS total FROM expense GROUP BY YEAR(date), MONTH(date) ORDER BY YEAR(date), MONTH(date) ASC;
    @Query("SELECT new com.parshwa.expenseTracker.dto.MonthlyTrendDto(MONTH(e.date), SUM(e.amount), YEAR(e.date)) FROM Expense e GROUP BY YEAR(e.date), MONTH(e.date) ORDER BY YEAR(e.date) ASC, MONTH(e.date) ASC")
    List<MonthlyTrendDto> getMonthlyTrends();

    // @Query("SELECT new com.parshwa.expenseTracker.dto.MonthlyTrendDto(MONTH(e.date), SUM(e.amount), YEAR(e.date)) FROM Expense e WHERE YEAR(e.date) = :year GROUP BY MONTH(e.date), YEAR(e.date)")
    // List<MonthlyTrendDto> getMonthlyTrends(@Param("year") int year);

    // @Query("SELECT * FROM Expense WHERE ----- query -----")
    // List<Expense> filter();
}
