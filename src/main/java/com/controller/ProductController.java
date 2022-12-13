package com.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.entity.Client;
import com.entity.Product;
import com.service.ProductService;

@RestController
@RequestMapping("/products")
public class ProductController {
	
	@Autowired
	ProductService productService;
	
	@GetMapping
	public ResponseEntity<List<Product>> getProducts(){
		return new ResponseEntity<>(productService.listProducts(),HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Optional<Product>> getProductById(@PathVariable("id") int id){
		
		try {
			Optional<Product> productFinded = productService.getProductById(id);
			System.out.println(productFinded);
			if (!productFinded.isPresent()) {
				return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
			}
			return new ResponseEntity<>(productFinded,HttpStatus.OK);
		}catch(Exception e) {
			return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
		}
	}
	
	@PostMapping("/create")
	public ResponseEntity<Product> createProduct(@RequestBody Product product){
		
		try {
			Product productCreated = productService.createProduct(product);
			if (productCreated == null) {
				return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
			}
			return new ResponseEntity<>(productCreated,HttpStatus.CREATED);
		}catch(Exception e) {
			return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
		}
	}
	
	
	
	
	@PutMapping(path="/activate/{id}")
	public ResponseEntity<Product> updateClient(@PathVariable("id") int id){
		
		Product productUpdated = productService.activateProduct(id);
		
		if(productUpdated !=  null) {
			return new ResponseEntity<>(productUpdated,HttpStatus.OK);
		}else {
			return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
		
			}	
	}
	
	
	@PutMapping(path="/desactivate/{id}")
	public ResponseEntity<Product> desactivateClient(@PathVariable("id") int id){
		
		Product productUpdated = productService.desactivateProduct(id);
		
		if(productUpdated !=  null) {
			return new ResponseEntity<>(productUpdated,HttpStatus.OK);
		}else {
			return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
		
			}	
	}
	
	@PutMapping(path="/overdraft/{id}/{value}")
	public ResponseEntity<Product> overDraft(@PathVariable("id") int id, @PathVariable("value") long value){
		
		Product productOverdrafted= productService.overDraft(id,value);
		
		if(productOverdrafted !=  null) {
			return new ResponseEntity<>(productOverdrafted,HttpStatus.OK);
		}else {
			return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
		
			}	
	}
	
	
	
	
	
}
