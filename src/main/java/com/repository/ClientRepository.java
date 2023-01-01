package com.repository;
import com.entity.Client;
import com.entity.Product;

import org.springframework.stereotype.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;



@Repository
public interface ClientRepository extends JpaRepository<Client,Integer>{

	Optional<Client> findByEmail(String email);
	Optional<Client> findByIdentificationNumber(int identificationNumber);
	
}
