package com.repository;
import com.entity.Client;
import com.entity.Product;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;



@Repository
public interface ProductRepository extends JpaRepository<Product,Integer>{

		List <Product >findByBelongsTo(Client client);
		
		
}
