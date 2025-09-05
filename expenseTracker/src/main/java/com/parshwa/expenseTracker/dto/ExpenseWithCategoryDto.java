package com.parshwa.expenseTracker.dto;

import com.parshwa.expenseTracker.model.Category;
import com.parshwa.expenseTracker.model.Expense;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter @Setter @NoArgsConstructor
public class ExpenseWithCategoryDto {
    private int id;

    @NotBlank(message = "Title is required")
    private String title;

    @Min(value = 0, message = "Expense cannot be negative")
    private int amount;

    @NotNull(message = "Date of Expense cannot be null")
    private LocalDate date;

    @NotNull(message = "Expense must have a Category")
    private Category category;

    public ExpenseWithCategoryDto(Expense expense) {
        this.id = expense.getId();
        this.title = expense.getTitle();
        this.amount = expense.getAmount();
        this.date = expense.getDate();
        this.category = expense.getCategory();
    }
}
