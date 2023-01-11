package com.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import com.entity.TransactionHistory;


@Repository
public interface TransactionHistoryRepository extends JpaRepository<TransactionHistory,Integer>{

	
	List <TransactionHistory> findByProductNumber(long productNumber);
	
	
	
}
