package com.parshwa.expenseTracker.service;

import com.parshwa.expenseTracker.dto.ExpenseWithCategoryDto;
import com.parshwa.expenseTracker.model.Category;
import com.parshwa.expenseTracker.model.Expense;
import com.parshwa.expenseTracker.repository.CategoryRepository;
import com.parshwa.expenseTracker.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExpenseService {
    @Autowired private ExpenseRepository expenseRepository;
    @Autowired private CategoryRepository categoryRepository;

    public List<ExpenseWithCategoryDto> getAllExpenses(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("date").descending());

        return expenseRepository.findAll(pageable).stream().map(
                ExpenseWithCategoryDto::new
        ).toList();
    }

    public ExpenseWithCategoryDto getExpense(int id) {
        Expense e = expenseRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Expense not found with id: " + id));
        return new ExpenseWithCategoryDto(e);
    }

    public ExpenseWithCategoryDto createExpense(ExpenseWithCategoryDto expenseWithCategoryDto) {
        int categoryId = expenseWithCategoryDto.getCategoryId();

        Category category = categoryRepository.findById(categoryId).orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + categoryId));
        Expense expense = new Expense();
        expense.setAmount(expenseWithCategoryDto.getAmount());
        expense.setCategory(category);
        expense.setDate(expenseWithCategoryDto.getDate());
        expense.setTitle(expenseWithCategoryDto.getTitle());

        expense = expenseRepository.save(expense);

        return new ExpenseWithCategoryDto(expense);
    }

    public ExpenseWithCategoryDto updateExpense(int id, ExpenseWithCategoryDto expenseWithCategoryDto) {
        int categoryId = expenseWithCategoryDto.getCategoryId();
        Category category = categoryRepository.findById(categoryId).orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + categoryId));

        Expense expense = expenseRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Expense not found with id: " + id));
        expense.setTitle(expenseWithCategoryDto.getTitle());
        expense.setDate(expenseWithCategoryDto.getDate());
        expense.setAmount(expenseWithCategoryDto.getAmount());
        expense.setCategory(category);
        expense = expenseRepository.save((expense));

        return new ExpenseWithCategoryDto(expense);
    }

    public void deleteExpense(int id) {
        expenseRepository.deleteById(id);
    }

    public List<ExpenseWithCategoryDto> searchExpenses(String keyword, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("date").descending());
        return expenseRepository.findByTitleContaining(keyword, pageable).stream().map(
                ExpenseWithCategoryDto::new
        ).toList();
    }
}
