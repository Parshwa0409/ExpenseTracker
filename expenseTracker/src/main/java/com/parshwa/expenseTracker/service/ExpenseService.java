package com.parshwa.expenseTracker.service;

import com.parshwa.expenseTracker.model.Category;
import com.parshwa.expenseTracker.model.Expense;
import com.parshwa.expenseTracker.repository.CategoryRepository;
import com.parshwa.expenseTracker.repository.ExpensePaginationRepository;
import com.parshwa.expenseTracker.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.OptionalInt;

@Service
public class ExpenseService {
    @Autowired private ExpenseRepository expenseRepository;
    @Autowired private ExpensePaginationRepository expensePaginationRepository;
    @Autowired private CategoryRepository categoryRepository;

    public Page<Expense> getAllExpenses(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("date").descending());
        return expenseRepository.findAll(pageable);
    }

    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }

    public Expense getExpense(int id) {
        // Find the EXPENSE by :id, or else throw ResourceNotFoundException
        return expenseRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Expense not found with id: " + id));
    }

    public Expense createExpense(Expense expense) {
        // Extract the categoryID, then find the CATEGORY with the categoryID & update the EXPENSE to include that CATEGORY
        int categoryId = expense.getCategory().getId();
        Category category = categoryRepository.findById(categoryId).orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + categoryId));
        expense.setCategory(category);
        return expenseRepository.save(expense);
    }

    public Expense updateExpense(int id, Expense expense) {
        int categoryId = expense.getCategory().getId();
        Category category = categoryRepository.findById(categoryId).orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + categoryId));

        Expense expense1 = expenseRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Expense not found with id: " + id));
        expense1.setTitle(expense.getTitle());
        expense1.setDate(expense.getDate());
        expense1.setAmount(expense.getAmount());
        expense1.setCategory(category);

        return expenseRepository.save((expense1));
    }

    public void deleteExpense(int id) {
        expenseRepository.deleteById(id);
    }

    public List<Expense> searchExpenses(String keyword) {
        return expenseRepository.findByTitleContaining(keyword);
    }

    public long count() {
        return expenseRepository.count();
    }

    public List<Expense> filter() {
        return null;
        // return expenseRepository.filter();
    }
}


/*
In `src/main/java/com/parshwa/expenseTracker/service/ExpenseService.java`, exceptions or errors could occur at the following places:

1. **Entity Not Found**
   - `expenseRepository.findById(id).orElseThrow(...)` in `getExpense` and `updateExpense`
   - `categoryRepository.findById(categoryId).orElseThrow(...)` in `createExpense` and `updateExpense`
   These throw `ResourceNotFoundException` if the entity is missing.

2. **Null Pointer Exception**
   - If `expense.getCategory()` is `null` in `createExpense` or `updateExpense`, calling `.getId()` will throw a `NullPointerException`.

3. **Repository Save/Delete Errors**
   - `expenseRepository.save(...)` and `expenseRepository.deleteById(id)` could throw exceptions if there are database issues or constraints violations.

4. **Search Method**
   - `expenseRepository.findByTitleContaining(keyword)` could throw exceptions if the repository method is not implemented or if `keyword` is `null`.

5. **Unimplemented Method**
   - `filter()` currently returns `null`, which may cause issues if used elsewhere.

All other methods are straightforward and rely on repository methods, which may throw runtime exceptions if there are issues with the database or data integrity.
 */