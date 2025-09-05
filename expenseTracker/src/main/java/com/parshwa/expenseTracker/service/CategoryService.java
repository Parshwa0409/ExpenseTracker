package com.parshwa.expenseTracker.service;

import com.parshwa.expenseTracker.dto.CategoryWithBudgetDto;
import com.parshwa.expenseTracker.model.Budget;
import com.parshwa.expenseTracker.model.Category;
import com.parshwa.expenseTracker.repository.CategoryRepository;
import jakarta.transaction.Transactional;
import org.apache.coyote.BadRequestException;
import org.hibernate.query.IllegalQueryOperationException;
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
                .map(category -> new CategoryWithBudgetDto(
                        category,
                        budgetService.getLatestCategoryBudget(category, currentDate)
                ))
                .collect(Collectors.toList());
    }

    public CategoryWithBudgetDto getCategory(int id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + id));

        Budget latestBudget = budgetService.getLatestCategoryBudget(category, currentDate);

        return new CategoryWithBudgetDto(category, latestBudget);
    }

    public CategoryWithBudgetDto createCategory(CategoryWithBudgetDto dto) {
        Category category = new Category();
        category.setName(dto.getName());
        category.setEmoji(dto.getEmoji());
        category = categoryRepository.save(category);

        Budget budget = budgetService.createBudget(
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

        Budget b = budgetService.getLatestCategoryBudget(c, currentDate);
        LocalDate latestBudgetDate = b.getDateOfUpdation();

        b = (latestBudgetDate.getYear() == currentDate.getYear() && latestBudgetDate.getMonthValue() == currentDate.getMonthValue()) ?
        budgetService.updateBudget(b, categoryWithBudgetDto.getBudget(), currentDate) :
        budgetService.createBudget(c, categoryWithBudgetDto.getBudget(), currentDate);

        return new CategoryWithBudgetDto(c, b);
    }

    // A category cannot be deleted until all associated expenses are removed; if deletable, also delete its budgets.
    @Transactional
    public void deleteCategory(int id) throws BadRequestException {
        if (categoryRepository.countExpensesByCategoryId(id) > 0) {
            throw new BadRequestException("Category cannot be deleted because it has expenses.");
        }
        budgetService.deleteAllByCategoryId(id);
        categoryRepository.deleteById(id); // Cascade will handle budgets
    }
}
