package com.parshwa.expenseTracker.controller;

import com.parshwa.expenseTracker.dto.ExpenseWithCategoryDto;
import com.parshwa.expenseTracker.model.Expense;
import com.parshwa.expenseTracker.service.ExpenseService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class ExpenseController {
    @Autowired private ExpenseService expenseService;

    public void isValidPathVariable(int id){
        if(id <= 0){
            throw new IllegalArgumentException("Path variable 'id' must be a positive integer.");
        }
    }

    @GetMapping("api/expenses")
    public List<ExpenseWithCategoryDto> getExpenses(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "7") int size) {
        return expenseService.getAllExpenses(page, size);
    }

    @GetMapping("api/expenses/{id}")
    public ExpenseWithCategoryDto getExpense(@PathVariable int id){
        isValidPathVariable(id);
        return expenseService.getExpense(id);
    }

    @PostMapping("api/expenses")
    public ExpenseWithCategoryDto createExpense(@Valid @RequestBody ExpenseWithCategoryDto expenseWithCategoryDto){
        return expenseService.createExpense(expenseWithCategoryDto);
    }

    @PutMapping("api/expenses/{id}")
    public ExpenseWithCategoryDto updateExpense(@PathVariable int id,@Valid @RequestBody ExpenseWithCategoryDto expenseWithCategoryDto){
        isValidPathVariable(id);
        return expenseService.updateExpense(id, expenseWithCategoryDto);
    }

    @DeleteMapping("api/expenses/{id}")
    public void deleteExpense(@PathVariable int id){
        isValidPathVariable(id);
        expenseService.deleteExpense(id);
    }

     @GetMapping("api/expenses/search")
    public List<ExpenseWithCategoryDto> searchExpenses(@RequestParam String keyword, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "7") int size){
         if (keyword == null || keyword.trim().isEmpty()) {
             throw new IllegalArgumentException("Search Keyword must not be null or empty");
         }

        return expenseService.searchExpenses(keyword, page, size);
    }
}
