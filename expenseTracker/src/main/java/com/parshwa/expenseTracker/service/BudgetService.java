package com.parshwa.expenseTracker.service;

import com.parshwa.expenseTracker.model.Budget;
import com.parshwa.expenseTracker.model.Category;
import com.parshwa.expenseTracker.repository.BudgetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class BudgetService {
    @Autowired private BudgetRepository budgetRepository;

    public Budget getLatestCategoryBudget(Category category, LocalDate date){
        return budgetRepository
                .findFirstByCategoryIdAndDateOfUpdationLessThanEqualOrderByDateOfUpdationDesc(category.getId(), date)
                .orElseThrow(() -> new ResourceNotFoundException("Budget not found for Category with id: " + category.getId())
            );
    }

    public Budget createBudget(Category category, int budget, LocalDate date){
        Budget b = new Budget();
        b.setCategory(category);
        b.setBudget(budget);
        b.setDateOfUpdation(date);
        b = budgetRepository.save(b);

        return b;
    }

    public Budget updateBudget(Budget b, int budget, LocalDate currentDate) {
        b.setBudget(budget);
        b.setDateOfUpdation(currentDate);
        return  budgetRepository.save(b);
    }

    public void deleteAllByCategoryId(int id) {
        List<Budget> budgets = budgetRepository.findAllByCategoryId(id);
        budgetRepository.deleteAll(budgets);
    }
}
