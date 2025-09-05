package com.parshwa.expenseTracker.dto;

import lombok.Getter;
import lombok.Setter;

// This will be used for pie-chart, progress-bar, category-summary
@Getter @Setter
public class CategorySummaryDto {
    int categoryId;
    private String emoji;
    private String name;
    private long totalExpense;
    private long budget;

    public CategorySummaryDto(int categoryId, String emoji, String name, long totalExpense) {
        this.categoryId = categoryId;
        this.emoji = emoji;
        this.name = name;
        this.totalExpense = totalExpense;
    }
}
