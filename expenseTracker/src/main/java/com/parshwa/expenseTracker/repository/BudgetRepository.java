package com.parshwa.expenseTracker.repository;

import com.parshwa.expenseTracker.model.Budget;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Optional;
import java.util.List;

public interface BudgetRepository extends JpaRepository<Budget, Integer> {
    List<Budget> findAllByCategoryId(Integer categoryId);

    Optional<Budget> findFirstByCategoryIdAndDateOfUpdationLessThanEqualOrderByDateOfUpdationDesc(Integer categoryId, LocalDate date);

    // @Query("SELECT b FROM Budget b WHERE b.dateOfUpdation <= :date AND b.category.id = :categoryId ORDER BY b.dateOfUpdation DESC")
    // @QueryHint(name = org.hibernate.jpa.QueryHints.HINT_FETCH_SIZE, value = "1")
    // Optional<Budget> findLatestByCategoryId(@Param("categoryId") Integer categoryId, @Param("date") Date date);
}
