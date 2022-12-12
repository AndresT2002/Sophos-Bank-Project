package com.service;
import java.sql.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.entity.Client;
import com.entity.Product;

import com.repository.ProductRepository;
import com.service.ClientServiceImplementation;

@Service
public class ProductServiceImplementation implements ProductService{
	
	
	@Autowired
	ProductRepository productRepository;
	
	@Override
	public Product getProducts(Product product) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Product createProduct(Product product) {
		
		if (product.getProductType().equals( "Ahorros")) {
			product.setStatus("Active");
			
		}
		
		java.util.Date date = new java.util.Date();
		java.sql.Date sqlDate = new Date(date.getTime());
		product.setCreatedAt(sqlDate);
		
		//product.setBelongsTo(ClientServiceImplementation.findById();
		
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
	
	
}
