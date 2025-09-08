package com.parshwa.expenseTracker.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter @Setter @NoArgsConstructor
public class PagedExpensesWithCountDto {
    List<ExpenseWithCategoryDto> allExpenses;
    long recordCount;
    long pageCount;

    public PagedExpensesWithCountDto(List<ExpenseWithCategoryDto> allExpenses, long recordCount, long pageCount) {
        this.allExpenses = allExpenses;
        this.recordCount = recordCount;
        this.pageCount = pageCount;
    }
}
