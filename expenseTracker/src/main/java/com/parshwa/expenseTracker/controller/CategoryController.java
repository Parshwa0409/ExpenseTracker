package com.parshwa.expenseTracker.controller;

import com.parshwa.expenseTracker.model.Category;
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
    public List<Category> getAllCategories(){
        return categoryService.getAllCategories();
    }

    @GetMapping("api/category/{id}")
    public Category getCategory(@PathVariable int id){
        isValidPathVariable(id);
        return categoryService.getCategory(id);
    }

    @PostMapping("api/category")
    public Category createCategory(@Valid @RequestBody Category category){
        return categoryService.createCategory(category);
    }

    @PutMapping("api/category/{id}")
    public Category updateCategory(@PathVariable int id,@Valid @RequestBody Category category){
        isValidPathVariable(id);
        return categoryService.updateCategory(id, category);
    }

    @DeleteMapping("api/category/{id}")
    public void deleteCategory(@PathVariable int id){
        isValidPathVariable(id);
        categoryService.deleteCategory(id);
    }
}
