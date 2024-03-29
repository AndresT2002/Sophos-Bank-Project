package com.service;

import java.sql.Date;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.entity.Client;
import com.entity.Product;
import com.entity.Response;
import com.entity.TransactionHistory;
import com.repository.ClientRepository;
import com.repository.ProductRepository;
import com.repository.TransactionHistoryRepository;


@Service
public class ProductServiceImplementation implements ProductService{
	
	
	@Autowired
	ProductRepository productRepository;
	@Autowired
	ClientRepository clientRepository;
	@Autowired
	TransactionHistoryRepository transactionHistoryRepository;
	
	@Override
	public Product getProducts(Product product) {
		
		return null;
	}

	@Override
	public Response createProduct(Product product) {
		
		if(!(product.getProductType().equals("Ahorros") || product.getProductType().equals("Corriente"))) {
			return null;
		}
				
		if (product.getProductType().equals( "Ahorros")) {
			product.setStatus("Active");
			
		}
		
		List<Product> productsId=productRepository.findAll();
		
		
		Optional<Client> productOwner=clientRepository.findById(product.getBelongsTo().getId());
		if (!productOwner.isPresent()) {
			Response errorResponse= new Response();
			errorResponse.setResponseCode("404");
			return errorResponse;
		}
		Client clientFinded=productOwner.get();
		
		List<Product> products= productRepository.findByBelongsTo(clientFinded);
		
		boolean hasGmf=products.stream().anyMatch(o -> o.getGmf().equals("Yes"));
		
		
		if (hasGmf && product.getGmf().equals("Yes")) {
			
			Response errorResponse= new Response();
			errorResponse.setResponseCode("400");
			return errorResponse;
		}
		
		
		
		ZonedDateTime zonedDateTime = ZonedDateTime.now(ZoneId.of("America/Bogota"));
		LocalDate localDate = zonedDateTime.toLocalDate();
		java.sql.Date sqlDate = java.sql.Date.valueOf(localDate);
		
		
		boolean bandera=false;
		
		while(bandera== false) {
			Long productNumber= createProductId(product.getProductType());
			
			if(!(productsId.stream().anyMatch(o -> o.getProductNumber() ==  productNumber))) {
				bandera=true;
				product.setProductNumber(productNumber);
				break;
			}
			
		}
		
		
		
		
		product.setCreatedAt(sqlDate);
		
		
		productRepository.save(product);
		
		Response successResponse= new Response();
		successResponse.setResponseCode("200");
		return successResponse;
	}

	@Override
	public Product updateProduct(Product product) {
		
		return null;
	}

	@Override
	public Product deleteProduct(Product product) {
		
		return null;
	}

	@Override
	public List<Product> listProducts() {
		
		return  productRepository.findAll();
	}
	@Override
	public Optional<Product> getProductById(int id) {
			
		return productRepository.findById(id);
	}

	@Override
	public Response activateProduct(int id,String modifiedBy) {
		Optional<Product> product= productRepository.findById(id);
		
		if (!product.isPresent()) {
			Response errorResponse= new Response();
			errorResponse.setResponseCode("404");
			return errorResponse;
		}
	
		
		
		Product productFinded=product.get();
		if (productFinded.getStatus().equals("Active")) {
			Response errorResponse= new Response();
			errorResponse.setResponseCode("400");
			return errorResponse;
		}
		ZonedDateTime zonedDateTime = ZonedDateTime.now(ZoneId.of("America/Bogota"));
		LocalDate localDate = zonedDateTime.toLocalDate();
		java.sql.Date sqlDate = java.sql.Date.valueOf(localDate);
		productFinded.setStatus("Active");
		productFinded.setModifiedAt(sqlDate);
		productFinded.setModifiedBy(modifiedBy);
		
		productRepository.save(productFinded);
		
		Response successResponse= new Response();
		successResponse.setResponseCode("200");
		return successResponse;
	}

	@Override
	public Response desactivateProduct(int id,String modifiedBy) {
		Optional<Product> product= productRepository.findById(id);
		if (!product.isPresent()) {
			Response errorResponse= new Response();
			errorResponse.setResponseCode("404");
			return errorResponse;
		}
		Product productFinded=product.get();
		
		if (productFinded.getStatus().equals("Inactive")) {
			Response errorResponse= new Response();
			errorResponse.setResponseCode("400");
			return errorResponse;
		}
		
		ZonedDateTime zonedDateTime = ZonedDateTime.now(ZoneId.of("America/Bogota"));
		LocalDate localDate = zonedDateTime.toLocalDate();
		java.sql.Date sqlDate = java.sql.Date.valueOf(localDate);
		productFinded.setStatus("Inactive");
		productFinded.setModifiedAt(sqlDate);
		productFinded.setModifiedBy(modifiedBy);
		productRepository.save(productFinded);
		
		Response successResponse= new Response();
		successResponse.setResponseCode("200");
		return successResponse;
	}

	@Override
	public Response overDraft(long productNumber, long value,String modifiedBy) {
		
		Optional<Product> product= productRepository.findByProductNumber(productNumber);
		if (!product.isPresent()) {
			Response errorResponse= new Response();
			errorResponse.setResponseCode("404");
			return errorResponse;
		}
		Product productFinded=product.get();
		
		if(!(productFinded.getProductType().equals("Corriente") && (productFinded.getStatus().equals("Active") || productFinded.getStatus().equals("Canceled") ))) {
			
			Response errorResponse= new Response();
			errorResponse.setResponseCode("400");
			return errorResponse;
		}
		
		if(((productFinded.getDebtValue() + value) > 3000000)) {
			
			Response errorResponse= new Response();
			errorResponse.setResponseCode("400");
			return errorResponse;
		}
		
		
		productFinded.setProductBalance(productFinded.getProductBalance() + value);
		productFinded.setDebtValue( (productFinded.getDebtValue() + value));
		
		
		if(productFinded.getGmf().equals("Yes")) {
			productFinded.setProductAvailable(productFinded.getProductBalance());
		}else {
			long gmf=Math.round((float) productFinded.getProductBalance()*4/1000);
			productFinded.setProductAvailable((productFinded.getProductBalance())-(gmf)	);
		}	
		
		ZonedDateTime zonedDateTime = ZonedDateTime.now(ZoneId.of("America/Bogota"));
		LocalDate localDate = zonedDateTime.toLocalDate();
		java.sql.Date sqlDate = java.sql.Date.valueOf(localDate);
		productFinded.setModifiedAt(sqlDate);
		productFinded.setModifiedBy(modifiedBy);
		productRepository.save(productFinded);
		
		TransactionHistory newTransactionTo= createTransaction( value,"Overdraft", productFinded.getBelongsTo().getId(),  sqlDate, "Withdraw",  productFinded.getProductNumber(),productFinded.getProductBalance(),productFinded.getProductAvailable());
		transactionHistoryRepository.save(newTransactionTo);
		
		Response successResponse= new Response();
		successResponse.setResponseCode("200");
		
		
		return successResponse;
	}
	
	@Override
	public Long createProductId(String tipo) {
		
		Long intValue; 
		String stringValue;
		if(tipo.equals("Ahorros")){ 
			stringValue=randomNumber("46");
			
			intValue=Long.valueOf(stringValue);
			
			
		}else if (tipo.equals("Corriente")){
			stringValue=randomNumber("23");
			
			intValue=Long.parseLong(stringValue);
		}else {
			return (long) 0;
		}
		
		return intValue;
	}
	
	@Override
	public String randomNumber(String strInicial) {
		
		
		Random randomNumber = new Random();//Objeto tipo random para escoger numero al azar
	    String numero = String.valueOf(randomNumber.nextInt(99999999));//Obtengo número al azar de 8 dígitos
	    strInicial=strInicial+numero;//Concateno el string anterior con el numero parseado a string actual
		return strInicial; //Retorno el string modificado con todos los números
	}

	
	
	@Override
	public Response activateGmf(int id,String modifiedBy) {
		Optional<Product> productFinded= productRepository.findById(id);
		if(productFinded.isPresent()) {
			Product productObtained=productFinded.get();
			Client productOwner=productObtained.getBelongsTo();
			
			List<Product> products= productRepository.findByBelongsTo(productOwner);
			
			boolean hasGmf=products.stream().anyMatch(o -> o.getGmf().equals("Yes"));
			
			if (!hasGmf) {
				productObtained.setGmf("Yes");
				
				ZonedDateTime zonedDateTime = ZonedDateTime.now(ZoneId.of("America/Bogota"));
				LocalDate localDate = zonedDateTime.toLocalDate();
				java.sql.Date sqlDate = java.sql.Date.valueOf(localDate);
				productObtained.setProductAvailable(productObtained.getProductBalance());
				productObtained.setModifiedAt(sqlDate);
				productObtained.setModifiedBy(modifiedBy);
				
				
				
				
				productRepository.save(productObtained);
				
				Response successResponse= new Response();
				successResponse.setResponseCode("200");
				return successResponse;
			}
			Response errorResponse= new Response();
			errorResponse.setResponseCode("400");
			return errorResponse;
		}
		Response errorResponse= new Response();
		errorResponse.setResponseCode("404");
		return errorResponse;
		
	}

	@Override
	public Response desactivateGmf(int id,String modifiedBy) {
		Optional<Product> productFinded= productRepository.findById(id);
		if(productFinded.isPresent()) {
			Product productObtained=productFinded.get();
			
			productObtained.setGmf("No");
			
			ZonedDateTime zonedDateTime = ZonedDateTime.now(ZoneId.of("America/Bogota"));
			LocalDate localDate = zonedDateTime.toLocalDate();
			java.sql.Date sqlDate = java.sql.Date.valueOf(localDate);
			productObtained.setModifiedAt(sqlDate);
			productObtained.setModifiedBy(modifiedBy);
			long gmf=Math.round((float) productObtained.getProductBalance()*4/1000);
			productObtained.setProductAvailable((productObtained.getProductBalance())-(gmf)	);
			
			
			productRepository.save(productObtained);
			Response successResponse= new Response();
			successResponse.setResponseCode("200");
			return successResponse;
			
		}
		
		Response errorResponse= new Response();
		errorResponse.setResponseCode("404");
		return errorResponse;
	}

	@Override
	public Response cancelProduct(long productNumber,String modifiedBy) {
		Optional<Product> product= productRepository.findByProductNumber(productNumber);
		if (!product.isPresent()) {
			Response errorResponse= new Response();
			errorResponse.setResponseCode("404");
			return errorResponse;
		}
		Product productFinded=product.get();
		
		if(!(productFinded.getProductBalance() < 1 && productFinded.getDebtValue()== 0) || (productFinded.getStatus().equals("Canceled"))) {
				
			Response errorResponse= new Response();
			errorResponse.setResponseCode("400");
			return errorResponse;
		}
		
		ZonedDateTime zonedDateTime = ZonedDateTime.now(ZoneId.of("America/Bogota"));
		LocalDate localDate = zonedDateTime.toLocalDate();
		java.sql.Date sqlDate = java.sql.Date.valueOf(localDate);
		productFinded.setStatus("Canceled");
		productFinded.setModifiedAt(sqlDate);
		productFinded.setModifiedBy(modifiedBy);
		productRepository.save(productFinded);
		
		Response successResponse= new Response();
		successResponse.setResponseCode("200");
		return successResponse;
		
		
	}

	@Override
	public List<Product> getProductsByClientId(int clientId) {
		
		
		List<Product> allProducts=productRepository.findAll();
		
		      		  
	    		
		return allProducts.stream()
	               .filter(a -> a.getBelongsTo().getId()== clientId)
	               .collect(Collectors.toList());
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
	
	
	
}
