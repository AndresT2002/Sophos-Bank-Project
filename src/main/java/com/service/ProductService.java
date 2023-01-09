package com.service;
import java.sql.Date;
import java.util.List;
import java.util.Optional;

import com.entity.Product;
import com.entity.Response;
import com.entity.TransactionHistory;



public interface ProductService {
	
	public Product getProducts(Product product);
	public Optional<Product> getProductById(int id);
	public List<Product> listProducts();
	public Response createProduct(Product product);
	public Product updateProduct(Product product);
	public Product deleteProduct(Product product);
	
	
	//AGREGARLES EL MODIFIEDBY
	public Response activateProduct(int id ,String modifiedBy);
	public Response desactivateProduct(int id ,String modifiedBy);
	public Response overDraft(long productNumber, long value,String modifiedBy);
	public Response activateGmf(int id,String modifiedBy);
	public Response desactivateGmf(int id,String modifiedBy);
	public Response cancelProduct(long productNumber,String modifiedBy);
	
	
	
	public Long createProductId(String tipo);
	public String randomNumber(String strInicial);
	TransactionHistory createTransaction(long amount, String movemenType,int clientId, Date transactionDate,String transactionType, long productNumber, long productBalance, long productAvailable);
	public List<Product> getProductsByClientId(int clientId);
}
