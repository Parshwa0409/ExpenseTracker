package com.parshwa.expenseTracker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class ExpenseTrackerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ExpenseTrackerApplication.class, args);

		// Quick Test Run
		// ApplicationContext context = SpringApplication.run(ExpenseTrackerApplication.class, args);
		// CategoryRepository categoryRepository = context.getBean(CategoryRepository.class);
		// System.out.println(categoryRepository.findAll());
	}

}
