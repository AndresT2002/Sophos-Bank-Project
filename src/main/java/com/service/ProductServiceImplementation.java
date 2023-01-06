package com.service;

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
import com.repository.ClientRepository;
import com.repository.ProductRepository;


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
		
		
		Optional<Client> productOwner=clientRepository.findById(product.getBelongsTo().getId());
		if (!productOwner.isPresent()) {
			return null;
		}
		Client clientFinded=productOwner.get();
		
		List<Product> products= productRepository.findByBelongsTo(clientFinded);
		
		boolean hasGmf=products.stream().filter(o -> o.getGmf().equals("Yes")).findFirst().isPresent();
		System.out.println(product.getGmf());
		System.out.println(hasGmf);
		
		if (hasGmf== true && product.getGmf().equals("Yes")) {
			System.out.println("XDDDDDD");
			return null;
		}
		
		
		
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
		//FALTA AGREGARLE LO DEL GMF
		//EL CREDITO SE DEBE AGREGAR TANTO AL DEB VALUE Y A SU AVAILABLE Y BALANCE
		Optional<Product> product= productRepository.findById(id);
		if (!product.isPresent()) {
			return null;
		}
		Product productFinded=product.get();
		
		if(!(productFinded.getProductType().equals("Corriente") && (productFinded.getStatus().equals("Active") || productFinded.getStatus().equals("Canceled") ))) {
			
			return null;
		}
		
		if(((productFinded.getDebtValue() + value) > 3000000)) {
			
			return null;
		}
		
		
		productFinded.setProductBalance(productFinded.getProductBalance() + value);
		productFinded.setDebtValue( (productFinded.getDebtValue() + value));
		
		
		if(productFinded.getGmf().equals("Yes")) {
			productFinded.setProductAvailable(productFinded.getProductBalance());
		}else {
			long gmf=(long) Math.round((float) productFinded.getProductBalance()*4/1000);
			productFinded.setProductAvailable((productFinded.getProductBalance())-(gmf)	);
		}	
		
		
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

	
	
	@Override
	public Product activateGmf(int id) {
		Optional<Product> productFinded= productRepository.findById(id);
		if(productFinded.isPresent()) {
			Product productObtained=productFinded.get();
			Client productOwner=productObtained.getBelongsTo();
			
			List<Product> products= productRepository.findByBelongsTo(productOwner);
			
			boolean hasGmf=products.stream().filter(o -> o.getGmf().equals("Yes")).findFirst().isPresent();
			
			if (!hasGmf) {
				productObtained.setGmf("Yes");
				
				ZonedDateTime zonedDateTime = ZonedDateTime.now(ZoneId.of("America/Bogota"));
				LocalDate localDate = zonedDateTime.toLocalDate();
				java.sql.Date sqlDate = java.sql.Date.valueOf(localDate);
				productObtained.setModifiedAt(sqlDate);
				return productRepository.save(productObtained);
			}
			return null;
		}
		return null;
		
	}

	@Override
	public Product desactivateGmf(int id) {
		Optional<Product> productFinded= productRepository.findById(id);
		if(productFinded.isPresent()) {
			Product productObtained=productFinded.get();
			
			productObtained.setGmf("No");
			
			ZonedDateTime zonedDateTime = ZonedDateTime.now(ZoneId.of("America/Bogota"));
			LocalDate localDate = zonedDateTime.toLocalDate();
			java.sql.Date sqlDate = java.sql.Date.valueOf(localDate);
			productObtained.setModifiedAt(sqlDate);
			return productRepository.save(productObtained);
			
		}
		
		return null;
	}

	@Override
	public Product cancelProduct(long productNumber) {
		Optional<Product> product= productRepository.findByProductNumber(productNumber);
		if (!product.isPresent()) {
			return null;
		}
		Product productFinded=product.get();
		
		if(!(productFinded.getProductBalance() < 1 && productFinded.getDebtValue()== 0) || (productFinded.getStatus().equals("Canceled"))) {
				
			return null;
		}
		
		ZonedDateTime zonedDateTime = ZonedDateTime.now(ZoneId.of("America/Bogota"));
		LocalDate localDate = zonedDateTime.toLocalDate();
		java.sql.Date sqlDate = java.sql.Date.valueOf(localDate);
		productFinded.setStatus("Canceled");
		productFinded.setModifiedAt(sqlDate);
		
		return productRepository.save(productFinded);
		
	}

	@Override
	public List<Product> getProductsByClientId(int clientId) {
		// TODO Auto-generated method stub
		
		List<Product> allProducts=productRepository.findAll();
		
		List<Product> clientProducts=allProducts.stream()
	               .filter(a -> a.getBelongsTo().getId()== clientId)
	               .collect(Collectors.toList());;
	            		  
	    if(clientProducts.isEmpty()) {
	    	return null;
	    }
		
		return clientProducts;
	}

	
	
	
}
