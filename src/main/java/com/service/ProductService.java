package com.service;
import java.sql.Date;
import java.util.List;
import java.util.Optional;

import com.entity.Product;
import com.entity.TransactionHistory;



public interface ProductService {
	
	public Product getProducts(Product product);
	public Optional<Product> getProductById(int id);
	public List<Product> listProducts();
	public Product createProduct(Product product);
	public Product updateProduct(Product product);
	public Product deleteProduct(Product product);
	public Product activateProduct(int id );
	public Product desactivateProduct(int id );
	public Product overDraft(long productNumber, long value,String modifiedBy);
	public Long createProductId(String tipo);
	public String randomNumber(String strInicial);
	public Product activateGmf(int id);
	public Product desactivateGmf(int id);
	public Product cancelProduct(long productNumber);
	TransactionHistory createTransaction(long amount, String movemenType,int clientId, Date transactionDate,String transactionType, long productNumber, long productBalance, long productAvailable);
	public List<Product> getProductsByClientId(int clientId);
}
