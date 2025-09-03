package com.parshwa.expenseTracker.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class MonthlyTrendDto {
    // The @Id and @GeneratedValue annotations are only meaningful for JPA entities, not DTOs.
    // For DTOs, generate IDs in the constructor or service layer as needed.
    // @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    // private int id;
    private int month;
    private long totalExpense;
    private int year;

    public MonthlyTrendDto(int month, long totalExpense, int year) {
        this.month = month;
        this.totalExpense = totalExpense;
        this.year = year;
    }
}
