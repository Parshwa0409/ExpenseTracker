package com.parshwa.expenseTracker.controller;

import com.parshwa.expenseTracker.dto.CategorySummaryDto;
import com.parshwa.expenseTracker.dto.MonthlyTrendDto;
import com.parshwa.expenseTracker.repository.BudgetRepository;
import com.parshwa.expenseTracker.repository.CategoryRepository;
import com.parshwa.expenseTracker.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class DashboardController {
    @Autowired private BudgetRepository budgetRepository;
    @Autowired private CategoryRepository categoryRepository;
    @Autowired private ExpenseRepository expenseRepository;

//    @GetMapping({"/api/dashboard/category-utilization", "/api/dashboard/category-distribution", "/api/dashboard/budget-utilization"})
//    public List<CategorySummaryDto> getCategoryUtilization(@RequestParam int year, @RequestParam int month){
//        return expenseRepository.getCategoryUtilization(year, month);
//    }
//
//    @GetMapping("/api/dashboard/monthly-expense-trend")
//    public List<MonthlyTrendDto> monthlyExpenseTrends(){
//        return expenseRepository.getMonthlyTrends();
//    }
}
