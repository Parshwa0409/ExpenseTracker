package com.parshwa.expenseTracker.controller;

import com.parshwa.expenseTracker.dto.CategoryWithBudgetDto;
import com.parshwa.expenseTracker.service.CategoryService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class CategoryController {
    @Autowired private CategoryService categoryService;

    public void isValidPathVariable(int id){
        if(id <= 0){
            throw new IllegalArgumentException("Path variable 'id' must be a positive integer.");
        }
    }

    @GetMapping("api/categories")
    public List<CategoryWithBudgetDto> getAllCategories(){
        return categoryService.getAllCategories();
    }

    @GetMapping("api/categories/{id}")
    public CategoryWithBudgetDto getCategory(@PathVariable int id){
        isValidPathVariable(id);
        return categoryService.getCategory(id);
    }

    @PostMapping("api/categories")
    public CategoryWithBudgetDto createCategory(@Valid @RequestBody CategoryWithBudgetDto categoryWithBudgetDto){
        return categoryService.createCategory(categoryWithBudgetDto);
    }

    @PutMapping("api/categories/{id}")
    public CategoryWithBudgetDto updateCategory(@PathVariable int id, @Valid @RequestBody CategoryWithBudgetDto categoryWithBudgetDto){
        isValidPathVariable(id);
        return categoryService.updateCategory(id, categoryWithBudgetDto);
    }

    @DeleteMapping("api/categories/{id}")
    public void deleteCategory(@PathVariable int id){
        isValidPathVariable(id);
        categoryService.deleteCategory(id);
    }
}
