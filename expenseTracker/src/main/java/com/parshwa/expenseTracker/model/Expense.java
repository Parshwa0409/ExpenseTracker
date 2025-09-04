package com.parshwa.expenseTracker.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Expense {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotBlank(message = "Title is required")
    private String title;

    @Min(value = 0, message = "Expense cannot be negative")
    private int amount;

    @NotNull(message = "Date of Expense cannot be null")
    private LocalDate date;
    @ManyToOne(fetch = FetchType.EAGER)
    private Category category;
}
