package com.parshwa.expenseTracker.controller;

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
    public Page<Expense> getProducts(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "7") int size) {
        return expenseService.getAllExpenses(page, size);
    }


    @GetMapping("api/expense/{id}")
    public Expense getExpense(@PathVariable int id){
        isValidPathVariable(id);
        return expenseService.getExpense(id);
    }

    @PostMapping("api/expense")
    public Expense createExpense(@Valid @RequestBody Expense expense){
        return expenseService.createExpense(expense);
    }

    @PutMapping("api/expense/{id}")
    public Expense updateExpense(@PathVariable int id,@Valid @RequestBody Expense expense){
        isValidPathVariable(id);
        return expenseService.updateExpense(id, expense);
    }

    @DeleteMapping("api/expense/{id}")
    public void deleteExpense(@PathVariable int id){
        isValidPathVariable(id);
        expenseService.deleteExpense(id);
    }


    // @GetMapping("api/expenses/search?keyword={keyword}") - wrong way to give endpoint, include the url & path-vars but then not the actual request param
     @GetMapping("api/expenses/search")
    public List<Expense> searchExpenses(@RequestParam String keyword){
         if (keyword == null || keyword.trim().isEmpty()) {
             throw new IllegalArgumentException("Search Keyword must not be null or empty");
         }

        return expenseService.searchExpenses(keyword);
    }

    @GetMapping("api/expenses/count")
    public long count() {
        return expenseService.count();
    }

    @GetMapping("api/expenses/filter")
    public List<Expense> filter(){
        return expenseService.filter();
    }
}
