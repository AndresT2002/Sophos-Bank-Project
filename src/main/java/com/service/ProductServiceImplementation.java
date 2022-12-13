package com.service;
import java.sql.Date;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.entity.Client;
import com.entity.Product;
import com.repository.ClientRepository;
import com.repository.ProductRepository;
import com.service.ClientServiceImplementation;

@Service
public class ProductServiceImplementation implements ProductService{
	
	
	@Autowired
	ProductRepository productRepository;
	@Autowired
	ClientRepository clientRepository;
	
	@Override
	public Product getProducts(Product product) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Product createProduct(Product product) {
		
		if(!(product.getProductType().equals("Ahorros") | product.getProductType().equals("Corriente"))) {
			return null;
		}
				
		if (product.getProductType().equals( "Ahorros")) {
			product.setStatus("Active");
			
		}
		
		List<Product> productsId=productRepository.findAll();
		
		
		
		
		ZonedDateTime zonedDateTime = ZonedDateTime.now(ZoneId.of("America/Bogota"));
		LocalDate localDate = zonedDateTime.toLocalDate();
		java.sql.Date sqlDate = java.sql.Date.valueOf(localDate);
		
		
		boolean bandera=false;
		
		while(bandera== false) {
			Long productNumber= createProductId(product.getProductType());
			System.out.println("Entre");
			if(!(productsId.stream().filter(o -> o.getProductNumber() ==  productNumber).findFirst().isPresent())) {
				bandera=true;
				product.setProductNumber(productNumber);
				break;
			}
			
		}
		
		
		
		
		product.setCreatedAt(sqlDate);
		
		
		return productRepository.save(product);
	}

	@Override
	public Product updateProduct(Product product) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Product deleteProduct(Product product) {
		// TODO Auto-generated method stub
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
	public Product activateProduct(int id) {
		Optional<Product> product= productRepository.findById(id);
		
		if (!product.isPresent()) {
			return null;
		}
		
		
		//FALTA AGREGAR VALIDACION DE SI EXISTE O NO
		
		
		Product productFinded=product.get();
		if (productFinded.getStatus().equals("Active")) {
			return null;
		}
		ZonedDateTime zonedDateTime = ZonedDateTime.now(ZoneId.of("America/Bogota"));
		LocalDate localDate = zonedDateTime.toLocalDate();
		java.sql.Date sqlDate = java.sql.Date.valueOf(localDate);
		productFinded.setStatus("Active");
		productFinded.setModifiedAt(sqlDate);
		
		return productRepository.save(productFinded);
	}

	@Override
	public Product desactivateProduct(int id) {
		Optional<Product> product= productRepository.findById(id);
		if (!product.isPresent()) {
			return null;
		}
		Product productFinded=product.get();
		if (productFinded.getStatus().equals("Inactive")) {
			return null;
		}
		if(!(productFinded.getProductBalance() < 1 && productFinded.getDebtValue()== 0)) {
			return null;
		}
		
		ZonedDateTime zonedDateTime = ZonedDateTime.now(ZoneId.of("America/Bogota"));
		LocalDate localDate = zonedDateTime.toLocalDate();
		java.sql.Date sqlDate = java.sql.Date.valueOf(localDate);
		productFinded.setStatus("Inactive");
		productFinded.setModifiedAt(sqlDate);
		
		return productRepository.save(productFinded);
	}

	@Override
	public Product overDraft(int id, long value) {
		//FALTA AGREGAR VALIDACION EN LOS METODOS PARA QUE SOLO PUEDAN HACERLOS
		//CLIENTES CON SUS CUENTAS O UN USUARIO ADMIN
		Optional<Product> product= productRepository.findById(id);
		if (!product.isPresent()) {
			return null;
		}
		Product productFinded=product.get();
		
		if(!(productFinded.getProductType().equals("Corriente") && productFinded.getStatus().equals("Active"))) {
			
			return null;
		}
		
		if(((productFinded.getDebtValue() + value) > 3000000)) {
			
			return null;
		}
		
		
		
		productFinded.setDebtValue( (productFinded.getDebtValue() + value));
		productFinded.setProductAvailable(productFinded.getProductAvailable() + value);
		productFinded.setProductBalance(productFinded.getProductBalance() + value);
		
		
		
		return productRepository.save(productFinded);
	}
	
	@Override
	public Long createProductId(String tipo) {
		
		Long intValue; 
		String stringValue;
		if(tipo.equals("Ahorros")){ 
			stringValue=randomNumber("46");
			System.out.println(stringValue);
			intValue=Long.valueOf(stringValue);
			System.out.println(intValue);
			
		}else if (tipo.equals("Corriente")){
			stringValue=randomNumber("23");
			System.out.println(stringValue);
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

	
	
	
}
