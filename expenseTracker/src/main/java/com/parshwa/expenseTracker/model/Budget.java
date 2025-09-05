package com.parshwa.expenseTracker.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Budget {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotNull(message = "Budget amount cannot be null or Zero")
    @Min(value = 1, message = "Budget must be greater than 0")
    private int budget;

    @NotNull(message = "Date cannot be null")
    @Column(name = "date_of_updation")
    private LocalDate dateOfUpdation;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;
}