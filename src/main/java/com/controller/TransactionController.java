package com.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.entity.Product;
import com.entity.Response;
import com.entity.TransactionHistory;
import com.service.ProductService;
import com.service.TransactionsImplementation;

@RestController

@RequestMapping("/transactions")
@CrossOrigin("*")
public class TransactionController {
	
	
	@Autowired
	TransactionsImplementation transactionService;
	
	
	@PutMapping("/withdraw/{modifiedby}/{productNumber}/{value}")
	public ResponseEntity<Response> withdraw(@PathVariable("productNumber") long productNumber,@PathVariable("value") long value,@PathVariable("modifiedby") String modifiedBy){
		try {
			Response productUpdated=transactionService.withdraw(productNumber, value,modifiedBy);
			if (productUpdated.getResponseCode() ==  "404") {
				return new ResponseEntity<>(productUpdated,HttpStatus.NOT_FOUND);
			}
			if (productUpdated.getResponseCode() ==  "400") {
				return new ResponseEntity<>(productUpdated,HttpStatus.BAD_REQUEST);
			}
			return new ResponseEntity<>(productUpdated,HttpStatus.OK);
		}catch(Exception e) {
			return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
		}
			
	}
	
	@PutMapping("/transfer/{modifiedby}/{productNumberFrom}/{productNumberTo}/{value}")
	public ResponseEntity<Response> transfer(@PathVariable("productNumberFrom") long productNumberFrom,@PathVariable("productNumberTo") long productNumberTo,@PathVariable("value") long value,@PathVariable("modifiedby") String modifiedBy){
		try {
			Response productUpdated=transactionService.transfer(productNumberFrom,productNumberTo, value,modifiedBy);
			if (productUpdated.getResponseCode() ==  "404") {
				return new ResponseEntity<>(productUpdated,HttpStatus.NOT_FOUND);
			}
			if (productUpdated.getResponseCode() ==  "400") {
				return new ResponseEntity<>(productUpdated,HttpStatus.BAD_REQUEST);
			}
			return new ResponseEntity<>(productUpdated,HttpStatus.OK);
		}catch(Exception e) {
			return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
		}
			
	}
	
	@PutMapping("/deposit/{modifiedby}/{productNumberTo}/{value}")
	public ResponseEntity<Response> deposit(@PathVariable("productNumberTo") long productNumberTo,@PathVariable("value") long value,@PathVariable("modifiedby") String modifiedBy){
		try {
			Response productUpdated=transactionService.deposit(productNumberTo, value,modifiedBy);
			if (productUpdated.getResponseCode().equals("404")) {
				return new ResponseEntity<>(productUpdated,HttpStatus.NOT_FOUND);
			}
			
			if (productUpdated.getResponseCode() ==  "400") {
				return new ResponseEntity<>(productUpdated,HttpStatus.BAD_REQUEST);
			}
			
			return new ResponseEntity<>(productUpdated,HttpStatus.OK);
		}catch(Exception e) {
			return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
		}
			
	}
	
	
	
	@GetMapping("/history/{productNumber}")
	public ResponseEntity<List<TransactionHistory>> transactionHistoryByNumber(@PathVariable("productNumber") long productNumber){

		List<TransactionHistory> historyObtained=transactionService.transactionHistoryByNumber(productNumber);
		
		if(historyObtained ==  null) {
			return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
		}
		
		return new ResponseEntity<>(historyObtained,HttpStatus.OK);
	}
	
	
	@PutMapping("/paydebt/{modifiedby}/{productNumberFrom}/{productNumberTo}/{value}")
	public ResponseEntity<Response> debtPaymen(@PathVariable("productNumberFrom") long productNumberFrom,@PathVariable("productNumberTo") long productNumberTo,@PathVariable("value") long value,@PathVariable("modifiedby") String modifiedBy){
		try {
			Response productUpdated=transactionService.payDebt(productNumberFrom,productNumberTo, value,modifiedBy);
			if (productUpdated.getResponseCode().equals("404")) {
				return new ResponseEntity<>(productUpdated,HttpStatus.NOT_FOUND);
			}
			
			if (productUpdated.getResponseCode() ==  "400") {
				return new ResponseEntity<>(productUpdated,HttpStatus.BAD_REQUEST);
			}
			return new ResponseEntity<>(productUpdated,HttpStatus.OK);
		}catch(Exception e) {
			return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
		}
			
	}
	

}
