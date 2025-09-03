package com.parshwa.expenseTracker.dto;

import lombok.Getter;
import lombok.Setter;

// This will be used for pie-chart, progress-bar, category-summary
@Getter @Setter
public class CategorySummaryDto {
    private String emoji;
    private String name;
    private long totalExpense;
    private long budget;

    //org.springframework.core.convert.ConverterNotFoundException: No converter found capable of converting from type [java.lang.String] to type [com.parshwa.expenseTracker.model.CategoryUtilizationDto]
    public CategorySummaryDto(String emoji, String name, long totalExpense, long budget) {
        this.emoji = emoji;
        this.name = name;
        this.totalExpense = totalExpense;
        this.budget = budget;
    }

    // com.fasterxml.jackson.databind.exc.InvalidDefinitionException: No serializer found for class ...
    /*
    public String getEmoji() {
        return emoji;
    }

    public void setEmoji(String emoji) {
        this.emoji = emoji;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public long getTotalExpense() {
        return totalExpense;
    }

    public void setTotalExpense(long totalExpense) {
        this.totalExpense = totalExpense;
    }

    public long getBudget() {
        return budget;
    }

    public void setBudget(long budget) {
        this.budget = budget;
    }
    */
}
