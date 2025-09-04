package com.parshwa.expenseTracker.service;

import com.parshwa.expenseTracker.model.Budget;
import com.parshwa.expenseTracker.model.Category;
import com.parshwa.expenseTracker.repository.BudgetRepository;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class BudgetService {
    @Autowired private BudgetRepository budgetRepository;

    public Budget createInitialBudget(Category category, int budget, LocalDate date){
        Budget b = new Budget();
        b.setCategory(category);
        b.setBudget(budget);
        b.setDateOfUpdation(date);
        b = budgetRepository.save(b);

        return b;
    }

    public Budget update(Budget b, int budget, LocalDate currentDate) {
        b.setBudget(budget);
        b.setDateOfUpdation(currentDate);
        return  budgetRepository.save(b);
    }
}
