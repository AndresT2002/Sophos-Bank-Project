package com.service;

import com.entity.Product;

public interface Transactions {
	Product deposit(Product from,Product to, int value);
	Product withdraw(Product from, int value);
	Product transfer(Product from,Product to, int value);
}
