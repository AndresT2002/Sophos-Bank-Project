package com.service;
import java.util.List;
import java.util.Optional;

import com.entity.Product;



public interface ProductService {
	
	public Product getProducts(Product product);
	public Optional<Product> getProductById(int id);
	public List<Product> listProducts();
	public Product createProduct(Product product);
	public Product updateProduct(Product product);
	public Product deleteProduct(Product product);
}
