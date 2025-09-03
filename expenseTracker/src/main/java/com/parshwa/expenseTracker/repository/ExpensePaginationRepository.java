package com.parshwa.expenseTracker.repository;

import com.parshwa.expenseTracker.model.Expense;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface ExpensePaginationRepository extends PagingAndSortingRepository<Expense, Integer> {

    @Override
    default Iterable<Expense> findAll(Sort sort) {
        return null;
    }

    @Override
    default Page<Expense> findAll(Pageable pageable) {
        return null;
    }
}
