package com.service;

import java.sql.Date;
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
	public Product transfer(long from, long to, long value) {
		Optional<Product> productTo= productRepository.findByProductNumber(to);
		Optional<Product> productFrom= productRepository.findByProductNumber(from);
		
		if (!productTo.isPresent() || !productFrom.isPresent()) {
			return null;
		}
		
		
		long valueGmf;
		long gmf;
		
		
		Product productToFinded=productTo.get();
		Product productFromFinded=productFrom.get();
		
		//Valido si está exento de GMF o no. Calculo el valor total a debitar
		if(productFromFinded.getGmf().equals("Yes")) {
			
			 valueGmf=value;
		}else {
			 gmf=(long) Math.round((float) productFromFinded.getProductBalance()*4/1000);
			 valueGmf=value+(gmf);
			 System.out.print( (float) value*4/1000);
			 System.out.print( Math.round((float) value*4/1000));
			 System.out.print( value+Math.round((float) value*4/1000));
			 
		}
		System.out.println(valueGmf);
		//Si al retirar queda saldo negativo o está inactivo retorno
		if((productFromFinded.getProductBalance()-valueGmf < 0) || (productFromFinded.getStatus().equals("Inactive"))) {
			
			return null;
		}
		
		
		ZonedDateTime zonedDateTime = ZonedDateTime.now(ZoneId.of("America/Bogota"));
		LocalDate localDate = zonedDateTime.toLocalDate();
		java.sql.Date sqlDate = java.sql.Date.valueOf(localDate);
		
		
			
		
		productFromFinded.setProductBalance((productFromFinded.getProductBalance()-valueGmf));
		
		if(productFromFinded.getGmf().equals("Yes")) {
			productFromFinded.setProductAvailable(productFromFinded.getProductBalance());
		}else {
			gmf=(long) Math.round((float) productFromFinded.getProductBalance()*4/1000);
			productFromFinded.setProductAvailable((productFromFinded.getProductBalance())-(gmf)	);
		}
				
		productFromFinded.setModifiedAt(sqlDate);
		
		
		productToFinded.setProductBalance((productToFinded.getProductBalance()+value));
		if(productToFinded.getGmf().equals("No")) {
			gmf=(long) Math.round((float) productToFinded.getProductBalance()*4/1000);
			productToFinded.setProductAvailable((productToFinded.getProductBalance())-(gmf));
		}else {
			productToFinded.setProductAvailable((productToFinded.getProductBalance()));
		}
		productToFinded.setModifiedAt(sqlDate);
		
		
		TransactionHistory newTransactionFrom= createTransaction( valueGmf,"Debit", productFromFinded.getBelongsTo().getId(),  sqlDate, "Transfer",  productFromFinded.getProductNumber());
		TransactionHistory newTransactionTo= createTransaction( value,"Credit", productToFinded.getBelongsTo().getId(),  sqlDate, "Transfer",  productToFinded.getProductNumber());
		
		productRepository.save(productToFinded);
		productRepository.save(productFromFinded);
		transactionHistoryRepository.save(newTransactionFrom);
		transactionHistoryRepository.save(newTransactionTo);
		
		return productFromFinded;
		
	}
	
	//Sobrecarga de deposit para ingresar dinero a mi misma cuenta
	public Product deposit(long to, long value) {
		Optional<Product> product= productRepository.findByProductNumber(to);
		if (!product.isPresent()) {
			return null;
		}
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
		long gmf;
		
		
		if(productFinded.getGmf().equals("Yes")) {
			 valueGmf=value;
		}else {
			
			 
			 gmf=(long) Math.round((float) productFinded.getProductBalance()*4/1000);
			 valueGmf=value+(gmf);
			 //System.out.print( Math.toIntExact(test));
			 //System.out.print(test);
			 System.out.print( (float) value*4/1000);
			 System.out.print( Math.round((float) value*4/1000));
			 System.out.print( value+Math.round((float) value*4/1000));
		}
		
		//Si al retirar queda saldo negativo o está inactivo retorno
		if((productFinded.getProductBalance()-valueGmf< 0) || (productFinded.getStatus().equals("Inactive"))) {
			
			return null;
		}
		
		productFinded.setProductBalance((productFinded.getProductBalance()-valueGmf));
		
		//REVISAR COMO OPTIMIZAR PARA NO VALIDAR SI ES EXCEPTO DE GMF 2 VECES
		if(productFinded.getGmf().equals("Yes")) {
			productFinded.setProductAvailable(productFinded.getProductBalance());
		}else {
			gmf=(long) Math.round((float) productFinded.getProductBalance()*4/1000);
			productFinded.setProductAvailable((productFinded.getProductBalance())-(gmf));
		}
		
		
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
	public TransactionHistory createTransaction(long amount, String movemenType,int clientId, Date transactionDate,String transactionType, long productNumber) {
		TransactionHistory newTransaction= new TransactionHistory();
		newTransaction.setAmount(amount);
		newTransaction.setMovementType(movemenType);
		newTransaction.setClientId(clientId);
		newTransaction.setTransactionDate(transactionDate);
		newTransaction.setTransactionType(transactionType);
		newTransaction.setProductNumber(productNumber);
		return newTransaction;
	}
	
	
}
