package com.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.entity.Product;
import com.service.ProductService;
import com.service.TransactionsImplementation;

@RestController

@RequestMapping("/transactions")
public class TransactionController {
	
	
	@Autowired
	TransactionsImplementation transactionService;
	
	
	@PutMapping("/withdraw/{productNumber}/{value}")
	public ResponseEntity<Product> withdraw(@PathVariable("productNumber") long productNumber,@PathVariable("value") long value){
		try {
			Product productUpdated=transactionService.withdraw(productNumber, value);
			if (productUpdated == null) {
				return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
			}
			return new ResponseEntity<>(productUpdated,HttpStatus.OK);
		}catch(Exception e) {
			return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
		}
			
	}
	
	@PutMapping("/transfer/{productNumberFrom}/{productNumberTo}/{value}")
	public ResponseEntity<Product> transfer(@PathVariable("productNumberFrom") long productNumberFrom,@PathVariable("productNumberTo") long productNumberTo,@PathVariable("value") long value){
		try {
			Product productUpdated=transactionService.transfer(productNumberFrom,productNumberTo, value);
			if (productUpdated == null) {
				return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
			}
			return new ResponseEntity<>(productUpdated,HttpStatus.OK);
		}catch(Exception e) {
			return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
		}
			
	}
	
	@PutMapping("/deposit/{productNumberTo}/{value}")
	public ResponseEntity<Product> deposit(@PathVariable("productNumberTo") long productNumberTo,@PathVariable("value") long value){
		try {
			Product productUpdated=transactionService.deposit(productNumberTo, value);
			if (productUpdated == null) {
				return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
			}
			return new ResponseEntity<>(productUpdated,HttpStatus.OK);
		}catch(Exception e) {
			return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
		}
			
	}
	
	

}
