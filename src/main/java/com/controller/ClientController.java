package com.controller;
import com.service.ClientService;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.entity.Client;





@RestController
@RequestMapping("/clients")
@CrossOrigin("*")
public class ClientController {

	
	@Autowired
	ClientService clientService;
	
	@GetMapping ("/getclients")
	public ResponseEntity<List<Client>> getClients(){
		return new ResponseEntity<>(clientService.listClients(),HttpStatus.OK);
	}
	
	@GetMapping ("/getclient/{id}")
	public ResponseEntity<Optional<Client>> getClientByI(@PathVariable("id") int id){
		return new ResponseEntity<>(clientService.getClientById(id),HttpStatus.OK);
	}
	
	
	
	@PostMapping
	public ResponseEntity<Client> createClient(@RequestBody Client client){
		Client clientCreated = clientService.createClient(client);
		
		if(clientCreated !=  null) {
			return new ResponseEntity<>(clientCreated,HttpStatus.CREATED);
		}else {
			return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
		
			}
		}
	@PutMapping(path="/{id}/update")
	public ResponseEntity<Client> updateClient(@RequestBody Client client,@PathVariable("id") int id){
		
		Client clientUpdated = clientService.updateClient(client, id);
		
		if(clientUpdated !=  null) {
			return new ResponseEntity<>(clientUpdated,HttpStatus.OK);
		}else {
			return new ResponseEntity<>(null,HttpStatus.NO_CONTENT);
		
			}	
	}
	
	@DeleteMapping (path="/delete/{identificationNumber}")
	public ResponseEntity<Object> deleteClient(@PathVariable("identificationNumber") int identificationNumber){
		
		boolean clientEliminated = clientService.deleteClient(identificationNumber);
		
		if(clientEliminated) {
			return new ResponseEntity<>(null ,HttpStatus.OK);
		}else {
			return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
		
			}	
	}
	
	
	
	
}

	 