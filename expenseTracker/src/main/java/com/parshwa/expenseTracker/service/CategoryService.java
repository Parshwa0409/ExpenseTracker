package com.parshwa.expenseTracker.service;

import com.parshwa.expenseTracker.dto.CategoryWithBudgetDto;
import com.parshwa.expenseTracker.model.Budget;
import com.parshwa.expenseTracker.model.Category;
import com.parshwa.expenseTracker.repository.BudgetRepository;
import com.parshwa.expenseTracker.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryService {
    @Autowired private CategoryRepository categoryRepository;
    @Autowired private BudgetService budgetService;

    private final LocalDate currentDate = LocalDate.now();

    public List<CategoryWithBudgetDto> getAllCategories() {
        return categoryRepository
                .findAll()
                .stream()
                .map(category -> new CategoryWithBudgetDto(category, category.getLatestBudget()))
                .collect(Collectors.toList());
    }

    public CategoryWithBudgetDto getCategory(int id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + id));

        Budget latestBudget = category.getLatestBudget();

        return new CategoryWithBudgetDto(category, latestBudget);
    }

    public CategoryWithBudgetDto createCategory(CategoryWithBudgetDto dto) {
        Category category = new Category();
        category.setName(dto.getName());
        category.setEmoji(dto.getEmoji());
        category = categoryRepository.save(category);

        Budget budget = budgetService.createInitialBudget(
                category,
                dto.getBudget(),
                currentDate
        );

        return new CategoryWithBudgetDto(category, budget);
    }

    public CategoryWithBudgetDto updateCategory(int id, CategoryWithBudgetDto categoryWithBudgetDto) {
        Category c = categoryRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + id));
        c.setEmoji(categoryWithBudgetDto.getEmoji());
        c.setName(categoryWithBudgetDto.getName());

        Budget b = c.getLatestBudget();

        LocalDate latestBudgetDate = b.getDateOfUpdation();
        if(latestBudgetDate.getYear() == currentDate.getYear() && latestBudgetDate.getMonthValue() == currentDate.getMonthValue()){
            b = budgetService.update(b, categoryWithBudgetDto.getBudget(), currentDate);
        }else{
            b = budgetService.createInitialBudget(c, categoryWithBudgetDto.getBudget(), currentDate);
        }
        return new CategoryWithBudgetDto(c, b);
    }

    // To ensure data integrity, a category cannot be deleted until all associated expenses are removed.
    // Since one category can have many expenses, deletion of the category is only allowed when there are no expenses linked to it.
    // But if a category can be deleted then we also delete the Budgets included with it.
    public void deleteCategory(int id) {
        categoryRepository.deleteById(id);
    }
}
