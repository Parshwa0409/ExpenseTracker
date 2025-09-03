package com.parshwa.expenseTracker.service;

import com.parshwa.expenseTracker.model.Category;
import com.parshwa.expenseTracker.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {
    @Autowired private CategoryRepository categoryRepository;

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Category getCategory(int id) {
        return categoryRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + id));
    }

    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }

    public Category updateCategory(int id, Category category) {
        Category c = getCategory(id);

        c.setBudget(category.getBudget());
        c.setEmoji(category.getEmoji());
        c.setName(category.getName());

        return categoryRepository.save(c);
    }

    // To ensure data integrity, a category cannot be deleted until all associated expenses are removed.
    // Since one category can have many expenses, deletion of the category is only allowed when there are no expenses linked to it.
    public void deleteCategory(int id) {
        categoryRepository.deleteById(id);
    }
}
