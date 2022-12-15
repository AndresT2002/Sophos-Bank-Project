package com.service;

import com.entity.Product;

public interface Transactions {
	Product deposit(long  from,long to, long value);
	Product withdraw(long from, long value);
	Product transfer(long from,long to, long value);
}
