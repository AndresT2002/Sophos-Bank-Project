package com.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.entity.Product;
import com.entity.Response;
import com.service.ProductService;

@RestController
@RequestMapping("/products")
@CrossOrigin("*")
public class ProductController {
	
	@Autowired
	ProductService productService;
	
	@GetMapping
	public ResponseEntity<List<Product>> getProducts(){
		return new ResponseEntity<>(productService.listProducts(),HttpStatus.OK);
	}
	
	@GetMapping("/clientid/{clientid}")
	public ResponseEntity<List<Product>> getProductsByClientId(@PathVariable("clientid") int clientid){
		List<Product> productsObtained=productService.getProductsByClientId(clientid);
		
				
		return new ResponseEntity<>(productsObtained,HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Optional<Product>> getProductById(@PathVariable("id") int id){
		
		try {
			Optional<Product> productFinded = productService.getProductById(id);
			// Retornar string y si es tal, se retorna null y el error del string
			if (!productFinded.isPresent()) {
				return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
			}
			return new ResponseEntity<>(productFinded,HttpStatus.OK);
		}catch(Exception e) {
			return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
		}
	}
	
	
	
	@PostMapping("/create")
	
	public ResponseEntity<Response> createProduct(@RequestBody Product product){
		
		try {
			Response productCreated = productService.createProduct(product);
			if (productCreated.getResponseCode().equals("404")) {
				return new ResponseEntity<>(productCreated,HttpStatus.NOT_FOUND);
			}
			
			if (productCreated.getResponseCode().equals("400")) {
				return new ResponseEntity<>(productCreated,HttpStatus.BAD_REQUEST);
			}
			
			return new ResponseEntity<>(productCreated,HttpStatus.OK);	
		}catch(Exception e) {
			
			return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
		}
	}
	
	
	
	
	@PutMapping(path="/activate/{modifiedby}/{id}")
	public ResponseEntity<Response> activateProduct(@PathVariable("id") int id,@PathVariable("modifiedby") String modifiedBy){
		
		Response productUpdated = productService.activateProduct(id,modifiedBy);
		
		if (productUpdated.getResponseCode().equals("404")) {
			return new ResponseEntity<>(productUpdated,HttpStatus.NOT_FOUND);
		}
		
		if (productUpdated.getResponseCode().equals("400")) {
			return new ResponseEntity<>(productUpdated,HttpStatus.BAD_REQUEST);
		}
		
		return new ResponseEntity<>(productUpdated,HttpStatus.OK);	
	}
	
	
	@PutMapping(path="/desactivate/{modifiedby}/{id}")
	public ResponseEntity<Response> desactivateProduct(@PathVariable("id") int id,@PathVariable("modifiedby") String modifiedBy){
		
		Response productUpdated = productService.desactivateProduct(id,modifiedBy);
		
		if (productUpdated.getResponseCode().equals("404")) {
			return new ResponseEntity<>(productUpdated,HttpStatus.NOT_FOUND);
		}
		
		if (productUpdated.getResponseCode().equals("400")) {
			return new ResponseEntity<>(productUpdated,HttpStatus.BAD_REQUEST);
		}
		
		return new ResponseEntity<>(productUpdated,HttpStatus.OK);
	}
	
	@PutMapping(path="/cancel/{modifiedby}/{productNumber}")
	public ResponseEntity<Response> cancelProduct(@PathVariable("productNumber") long productNumber,@PathVariable("modifiedby") String modifiedBy){
		
		Response productUpdated = productService.cancelProduct(productNumber,modifiedBy);
		
		if (productUpdated.getResponseCode().equals("404")) {
			return new ResponseEntity<>(productUpdated,HttpStatus.NOT_FOUND);
		}
		
		if (productUpdated.getResponseCode().equals("400")) {
			return new ResponseEntity<>(productUpdated,HttpStatus.BAD_REQUEST);
		}
		
		return new ResponseEntity<>(productUpdated,HttpStatus.OK);
		
	}
	@PutMapping(path="/overdraft/{modifiedby}/{productNumber}/{value}")
	public ResponseEntity<Response> overDraft(@PathVariable("productNumber") long productNumber, @PathVariable("value") long value,@PathVariable("modifiedby") String modifiedBy){
		
		Response productOverdrafted= productService.overDraft(productNumber,value,modifiedBy);
		
		
		if (productOverdrafted.getResponseCode().equals("404")) {
			return new ResponseEntity<>(productOverdrafted,HttpStatus.NOT_FOUND);
		}
		
		if (productOverdrafted.getResponseCode().equals("400")) {
			return new ResponseEntity<>(productOverdrafted,HttpStatus.BAD_REQUEST);
		}
		
		return new ResponseEntity<>(productOverdrafted,HttpStatus.OK);
		
	}
	
	@PutMapping(path="/activate/{modifiedby}/{id}/gmf")
	public ResponseEntity<Response> activateGmf(@PathVariable("id") int id,@PathVariable("modifiedby") String modifiedBy){
		
		Response productUpdated = productService.activateGmf(id,modifiedBy);
		
		if (productUpdated.getResponseCode().equals("404")) {
			return new ResponseEntity<>(productUpdated,HttpStatus.NOT_FOUND);
		}
		
		if (productUpdated.getResponseCode().equals("400")) {
			return new ResponseEntity<>(productUpdated,HttpStatus.BAD_REQUEST);
		}
		
		return new ResponseEntity<>(productUpdated,HttpStatus.OK);
	}
	
	
	
	@PutMapping(path="/desactivate/{modifiedby}/{id}/gmf")
	public ResponseEntity<Response> desactivateGmf(@PathVariable("id") int id,@PathVariable("modifiedby") String modifiedBy){
		
		Response productUpdated = productService.desactivateGmf(id,modifiedBy);
		
		if (productUpdated.getResponseCode().equals("404")) {
			return new ResponseEntity<>(productUpdated,HttpStatus.NOT_FOUND);
		}
		
		if (productUpdated.getResponseCode().equals("400")) {
			return new ResponseEntity<>(productUpdated,HttpStatus.BAD_REQUEST);
		}
		
		return new ResponseEntity<>(productUpdated,HttpStatus.OK);
	}
	
	
	
	
	
	
	
	
	
	
	
}
