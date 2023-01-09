package com.service;

import java.sql.Date;
import java.util.List;

import com.entity.Product;
import com.entity.Response;
import com.entity.TransactionHistory;

public interface Transactions {
	Response deposit(long to, long value, String modifiedBy);
	Response withdraw(long from, long value, String modifiedBy);
	Response transfer(long from,long to, long value, String modifiedBy);
	TransactionHistory createTransaction(long amount, String movemenType,int clientId, Date transactionDate,String transactionType, long productNumber, long productBalance, long productAvailable);
	List<TransactionHistory> transactionHistoryByNumber(long productNumber);
	Response payDebt(long payProduct,long fromProduct,long amount, String modifiedBy);

	
}




