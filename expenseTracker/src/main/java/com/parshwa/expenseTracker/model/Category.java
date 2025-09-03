package com.parshwa.expenseTracker.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Category {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @NotBlank(message = "Category Name cannot be empty")
    private String name;
    @NotBlank(message = "Category Emoji cannot be empty")
    private String emoji;
    @Min(value = 0, message = "Amount cannot be negative")
    private int budget;

    // I can have the list of expenses here if needed, but I do not want to burden the category object with all the expenses of that category
    // Whenever I need it I can always fetch it from the expense repository, with a method like findByCategory(Category category)
}
