package com.parshwa.expenseTracker.dto;

import com.parshwa.expenseTracker.model.Budget;
import com.parshwa.expenseTracker.model.Category;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter @Setter @NoArgsConstructor
public class CategoryWithBudgetDto implements Serializable {
    private int id;

    @NotBlank(message = "Emoji cannot be blank")
    @Size(max = 10, message = "Emoji must not exceed 10 characters")
    private String emoji;

    @NotBlank(message = "Category name cannot be blank")
    @Size(min = 2, max = 50, message = "Category name must be between 2 and 50 characters")
    private String name;

    @NotNull(message = "Budget cannot be null")
    @Min(value = 0, message = "Budget must be greater than or equal to 0")
    private int budget;

    public CategoryWithBudgetDto(Category c, Budget b) {
        this.id = c.getId();
        this.emoji = c.getEmoji();
        this.name = c.getName();
        this.budget = b.getBudget();
    }
}