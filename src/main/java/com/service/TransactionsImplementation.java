package com.service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.entity.Product;
import com.entity.TransactionHistory;
import com.repository.ClientRepository;
import com.repository.ProductRepository;
import com.repository.TransactionHistoryRepository;


@Service
public class TransactionsImplementation implements Transactions{
	@Autowired
	ProductRepository productRepository;
	
	@Autowired
	ClientRepository clientRepository;
	
	@Autowired
	TransactionHistoryRepository transactionHistoryRepository;
	
	

	@Override
	public Product deposit(long from, long to, long value) {
		
		
		
		return null;
	}
	
	//Sobrecarga de deposit para ingresar dinero a mi misma cuenta
	public Product deposit(long to, long value) {
		// TODO Auto-generated method stub
		return null;
	}
	

	@Override
	public Product withdraw(long from, long value) {
		Optional<Product> product= productRepository.findByProductNumber(from);
		if (!product.isPresent()) {
			return null;
		}
		
		
		Product productFinded=product.get();
		long valueGmf;
		
		
		
		if(productFinded.getGmf().equals("Yes")) {
			 valueGmf=value;
		}else {
			 valueGmf=value+((value*4)/1000);
		}
		
		//Si al retirar queda saldo negativo o está inactivo retorno
		if((productFinded.getProductAvailable()-valueGmf< 0) || (productFinded.getStatus().equals("Inactive"))) {
			
			return null;
		}
		
		productFinded.setProductBalance((productFinded.getProductBalance()-valueGmf));
		productFinded.setProductAvailable((productFinded.getProductBalance())-((productFinded.getProductBalance()*4)/1000)	);
		ZonedDateTime zonedDateTime = ZonedDateTime.now(ZoneId.of("America/Bogota"));
		LocalDate localDate = zonedDateTime.toLocalDate();
		java.sql.Date sqlDate = java.sql.Date.valueOf(localDate);
		productFinded.setModifiedAt(sqlDate);
		
		
		TransactionHistory newTransaction= new TransactionHistory();
		newTransaction.setAmount(valueGmf);
		newTransaction.setMovementType("Debit");
		newTransaction.setClientId(productFinded.getBelongsTo().getId());
		newTransaction.setTransactionDate(sqlDate);
		newTransaction.setTransactionType("Withdraw");
		newTransaction.setProductNumber(productFinded.getProductNumber());
		
		transactionHistoryRepository.save(newTransaction);
		
		return productRepository.save(productFinded);
	}

	@Override
	public Product transfer(long from, long to, long value) {
		// TODO Auto-generated method stub
		return null;
	}

}
