package com.parshwa.expenseTracker.service;

import com.parshwa.expenseTracker.dto.CategorySummaryDto;
import com.parshwa.expenseTracker.dto.MonthlyTrendDto;
import com.parshwa.expenseTracker.repository.BudgetRepository;
import com.parshwa.expenseTracker.repository.CategoryRepository;
import com.parshwa.expenseTracker.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DashboardService {
    @Autowired ExpenseRepository expenseRepository;
    @Autowired BudgetRepository budgetRepository;

    public List<MonthlyTrendDto> getLastThreeYearsMonthlyTrends() {
        return expenseRepository.getMonthlyTrends();
    }

    public List<CategorySummaryDto> getCategoryUtilization(int year, int month) {
        java.time.YearMonth yearMonth = java.time.YearMonth.of(year, month);
        LocalDate maxDate = yearMonth.atEndOfMonth();

        List<CategorySummaryDto> dtos = expenseRepository.getCategoryUtilization(year, month);
        for (CategorySummaryDto dto : dtos) {
            budgetRepository
                .findFirstByCategoryIdAndDateOfUpdationLessThanEqualOrderByDateOfUpdationDesc(dto.getCategoryId(), maxDate)
                .ifPresentOrElse(
                    budget -> dto.setBudget(budget.getBudget()),
                    () -> { throw new ResourceNotFoundException("Budget not found for category with id: " + dto.getCategoryId()); }
                );
        }
        return dtos;
    }
}
