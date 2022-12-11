package com.service;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.entity.Client;
import com.entity.Product;

import com.repository.ProductRepository;


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
		// TODO Auto-generated method stub
		return null;
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
