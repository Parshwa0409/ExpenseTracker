package com.parshwa.expenseTracker.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Category {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotBlank(message = "Category Name cannot be empty")
    private String name;

    @NotBlank(message = "Category Emoji cannot be empty")
    private String emoji;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("category")
    private List<Budget> budgets;

    public Budget getLatestBudget() {
        if (budgets == null || budgets.isEmpty()) {
            return null;
        }
        return budgets.stream()
                .filter(b -> b.getDateOfUpdation().isEqual(LocalDate.now()) || b.getDateOfUpdation().isBefore(LocalDate.now()))
                .max(Comparator.comparing(Budget::getDateOfUpdation))
                .orElse(null);
    }
}
