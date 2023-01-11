package com.service;

import java.sql.Date;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.entity.Product;
import com.entity.Response;
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
	public Response transfer(long from, long to, long value, String modifiedBy) {
		Optional<Product> productTo= productRepository.findByProductNumber(to);
		Optional<Product> productFrom= productRepository.findByProductNumber(from);
		
		if (!productTo.isPresent() || !productFrom.isPresent()) {
			Response errorResponse= new Response();
			errorResponse.setResponseCode("404");
			return errorResponse;
		}
		
		
		long valueGmf;
		long gmf;
		
		
		Product productToFinded=productTo.get();
		Product productFromFinded=productFrom.get();
		
		//Valido si está exento de GMF o no. Calculo el valor total a debitar
		if(productFromFinded.getGmf().equals("Yes")) {
			
			 valueGmf=value;
		}else {
			 gmf=Math.round((float) productFromFinded.getProductBalance()*4/1000);
			 valueGmf=value+(gmf);
			 
			 
		}
		
		//Si al retirar queda saldo negativo o está inactivo retorno
		if((productFromFinded.getProductBalance()-valueGmf < 0) || (productFromFinded.getStatus().equals("Inactive"))) {
			
			Response errorResponse= new Response();
			errorResponse.setResponseCode("400");
			return errorResponse;
		}
		
		
		ZonedDateTime zonedDateTime = ZonedDateTime.now(ZoneId.of("America/Bogota"));
		LocalDate localDate = zonedDateTime.toLocalDate();
		java.sql.Date sqlDate = java.sql.Date.valueOf(localDate);
		
		
			
		
		productFromFinded.setProductBalance((productFromFinded.getProductBalance()-valueGmf));
		
		if(productFromFinded.getGmf().equals("Yes")) {
			productFromFinded.setProductAvailable(productFromFinded.getProductBalance());
		}else {
			gmf=Math.round((float) productFromFinded.getProductBalance()*4/1000);
			productFromFinded.setProductAvailable((productFromFinded.getProductBalance())-(gmf)	);
		}
				
		productFromFinded.setModifiedAt(sqlDate);
		productFromFinded.setModifiedBy(modifiedBy);
		
		productToFinded.setProductBalance((productToFinded.getProductBalance()+value));
		if(productToFinded.getGmf().equals("No")) {
			gmf= Math.round((float) productToFinded.getProductBalance()*4/1000);
			productToFinded.setProductAvailable((productToFinded.getProductBalance())-(gmf));
		}else {
			productToFinded.setProductAvailable((productToFinded.getProductBalance()));
		}
		productToFinded.setModifiedAt(sqlDate);
		productToFinded.setModifiedBy(modifiedBy);
		
		TransactionHistory newTransactionFrom= createTransaction( valueGmf,"Debit", productFromFinded.getBelongsTo().getId(),  sqlDate, "Transfer",  productFromFinded.getProductNumber(),productFromFinded.getProductBalance(),productFromFinded.getProductAvailable());
		TransactionHistory newTransactionTo= createTransaction( value,"Credit", productToFinded.getBelongsTo().getId(),  sqlDate, "Transfer",  productToFinded.getProductNumber(),productToFinded.getProductBalance(),productToFinded.getProductAvailable());
		
		productRepository.save(productToFinded);
		productRepository.save(productFromFinded);
		transactionHistoryRepository.save(newTransactionFrom);
		transactionHistoryRepository.save(newTransactionTo);
		
		Response successResponse= new Response();
		successResponse.setResponseCode("200");
		
		
		return successResponse;
		
	}
	
	//Sobrecarga de deposit para ingresar dinero a mi misma cuenta
	public Response deposit(long to, long value, String modifiedBy) {
		
		Optional<Product> product= productRepository.findByProductNumber(to);
		if (!product.isPresent()) {
			Response errorResponse= new Response();
			errorResponse.setResponseCode("404");
			return errorResponse;
		}
				
		Product productToFinded=product.get();
		
		ZonedDateTime zonedDateTime = ZonedDateTime.now(ZoneId.of("America/Bogota"));
		LocalDate localDate = zonedDateTime.toLocalDate();
		java.sql.Date sqlDate = java.sql.Date.valueOf(localDate);
		
			
		productToFinded.setProductBalance((productToFinded.getProductBalance()+value));
		
		if(productToFinded.getGmf().equals("Yes")) {
			productToFinded.setProductAvailable(productToFinded.getProductBalance());
		}else {
			long gmf=Math.round((float) productToFinded.getProductBalance()*4/1000);
			productToFinded.setProductAvailable((productToFinded.getProductBalance())-(gmf)	);
		}
				
		productToFinded.setModifiedAt(sqlDate);
		productToFinded.setModifiedBy(modifiedBy);
		
		productRepository.save(productToFinded);
		
		TransactionHistory newTransactionTo= createTransaction( value,"Credit", productToFinded.getBelongsTo().getId(),  sqlDate, "Deposit",  productToFinded.getProductNumber(),productToFinded.getProductBalance(),productToFinded.getProductAvailable());
		
		transactionHistoryRepository.save(newTransactionTo);
		
	
		Response successResponse= new Response();
		successResponse.setResponseCode("200");
		
		
		return successResponse;
	}
	

	@Override
	public Response withdraw(long from, long value, String modifiedBy) {
		Optional<Product> product= productRepository.findByProductNumber(from);
		if (!product.isPresent()) {
			Response errorResponse= new Response();
			errorResponse.setResponseCode("404");
			return errorResponse;
		}
		
		
		Product productFinded=product.get();
		long valueGmf;
		long gmf;
		
		
		if(productFinded.getGmf().equals("Yes")) {
			 valueGmf=value;
		}else {
			
			 
			 gmf=Math.round((float) productFinded.getProductBalance()*4/1000);
			 valueGmf=value+(gmf);
			 
		}
		
		//Si al retirar queda saldo negativo o está inactivo retorno
		if((productFinded.getProductBalance()-valueGmf< 0) || (productFinded.getStatus().equals("Inactive"))) {
			
			Response errorResponse= new Response();
			errorResponse.setResponseCode("400");
			return errorResponse;
		}
		
		productFinded.setProductBalance((productFinded.getProductBalance()-valueGmf));
		
		//REVISAR COMO OPTIMIZAR PARA NO VALIDAR SI ES EXCEPTO DE GMF 2 VECES
		if(productFinded.getGmf().equals("Yes")) {
			productFinded.setProductAvailable(productFinded.getProductBalance());
		}else {
			gmf=Math.round((float) productFinded.getProductBalance()*4/1000);
			productFinded.setProductAvailable((productFinded.getProductBalance())-(gmf));
		}
		
		
		ZonedDateTime zonedDateTime = ZonedDateTime.now(ZoneId.of("America/Bogota"));
		LocalDate localDate = zonedDateTime.toLocalDate();
		java.sql.Date sqlDate = java.sql.Date.valueOf(localDate);
		productFinded.setModifiedAt(sqlDate);
		productFinded.setModifiedBy(modifiedBy);
		
		
		
		TransactionHistory newTransactionTo= createTransaction( valueGmf,"Debit", productFinded.getBelongsTo().getId(),  sqlDate, "Withdraw",  productFinded.getProductNumber(),productFinded.getProductBalance(),productFinded.getProductAvailable());
		
		
		productRepository.save(productFinded);
		transactionHistoryRepository.save(newTransactionTo);
		
		Response successResponse= new Response();
		successResponse.setResponseCode("200");
		
		
		
		
		return successResponse;
	}

	
	
	
	@Override
	public TransactionHistory createTransaction(long amount, String movemenType,int clientId, Date transactionDate,String transactionType, long productNumber,long productBalance,long productAvailable) {
		TransactionHistory newTransaction= new TransactionHistory();
		newTransaction.setProductBalance(productBalance);
		newTransaction.setProductAvailable(productAvailable);
		newTransaction.setAmount(amount);
		newTransaction.setMovementType(movemenType);
		newTransaction.setClientId(clientId);
		newTransaction.setTransactionDate(transactionDate);
		newTransaction.setTransactionType(transactionType);
		newTransaction.setProductNumber(productNumber);
		return newTransaction;
	}

	@Override
	public List<TransactionHistory> transactionHistoryByNumber(long productNumber) {
		return transactionHistoryRepository.findByProductNumber(productNumber);
			
		
	}

	@Override
	public Response payDebt(long payProduct, long fromProduct, long amount, String modifiedBy) {
		Optional<Product> getPayProduct= productRepository.findByProductNumber(payProduct);
		Optional<Product> getFromProduct= productRepository.findByProductNumber(fromProduct);
		
		if (!getPayProduct.isPresent() || !getFromProduct.isPresent()) {
			
			Response errorResponse= new Response();
			errorResponse.setResponseCode("404");
			return errorResponse;
		}
		
		
		
		
		
		Product payProductFinded=getPayProduct.get();
		
		if(amount > payProductFinded.getDebtValue()) {	
			Response errorResponse= new Response();
			errorResponse.setResponseCode("400");
			return errorResponse;
		}
		
		
		//En el metodo withdraw ya contemplo si es mayor al product available
		withdraw(fromProduct,amount,modifiedBy);
		
		
		
		payProductFinded.setDebtValue(payProductFinded.getDebtValue()-amount);
		
		productRepository.save(payProductFinded);
		
		ZonedDateTime zonedDateTime = ZonedDateTime.now(ZoneId.of("America/Bogota"));
		LocalDate localDate = zonedDateTime.toLocalDate();
		java.sql.Date sqlDate = java.sql.Date.valueOf(localDate);
		payProductFinded.setModifiedAt(sqlDate);
		payProductFinded.setModifiedBy(modifiedBy);
		
		
		TransactionHistory paymentTransaction= createTransaction( amount,"Credit", payProductFinded.getBelongsTo().getId(),  sqlDate, "Debt Payment",  payProductFinded.getProductNumber(),payProductFinded.getProductBalance(),payProductFinded.getProductAvailable());
		
		transactionHistoryRepository.save(paymentTransaction);
		
		Response successResponse= new Response();
		successResponse.setResponseCode("200");
		
		
		return successResponse;
	}
	
	
}
