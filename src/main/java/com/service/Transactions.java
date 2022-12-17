package com.service;

import java.sql.Date;

import com.entity.Product;
import com.entity.TransactionHistory;

public interface Transactions {
	Product deposit(long to, long value);
	Product withdraw(long from, long value);
	Product transfer(long from,long to, long value);
	TransactionHistory createTransaction(long amount, String movemenType,int clientId, Date transactionDate,String transactionType, long productNumber);
		
}
