package com.service;

import org.springframework.beans.factory.annotation.Autowired;

import com.entity.Product;
import com.repository.ClientRepository;
import com.repository.ProductRepository;

public class TransactionsImplementation implements Transactions{
	@Autowired
	ProductRepository productRepository;
	
	@Autowired
	ClientRepository clientRepository;
	
	
	@Override
	public Product deposit(Product from, Product to, int value) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Product withdraw(Product from, int value) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Product transfer(Product from, Product to, int value) {
		// TODO Auto-generated method stub
		return null;
	}

}
