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
import com.entity.Response;





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
	public ResponseEntity<Response> createClient(@RequestBody Client client){
		Response clientCreated = clientService.createClient(client);
		
		
		if (clientCreated.getResponseCode().equals("409")) {
			return new ResponseEntity<>(clientCreated,HttpStatus.CONFLICT);
		}
		if(clientCreated.getResponseCode().equals("200")) {
			return new ResponseEntity<>(clientCreated,HttpStatus.OK);	
		}else {
			return new ResponseEntity<>(clientCreated,HttpStatus.BAD_REQUEST);	
		}
		}
	@PutMapping(path="/{id}/update")
	public ResponseEntity<Response> updateClient(@RequestBody Client client,@PathVariable("id") int id){
		
		Response clientUpdated = clientService.updateClient(client, id);
		
		if (clientUpdated.getResponseCode().equals("404")) {
			return new ResponseEntity<>(clientUpdated,HttpStatus.NOT_FOUND);
		}
		if(clientUpdated.getResponseCode().equals("200")) {
			return new ResponseEntity<>(clientUpdated,HttpStatus.OK);	
		}else {
			return new ResponseEntity<>(clientUpdated,HttpStatus.BAD_REQUEST);	
		}
		
	}
	
	@DeleteMapping (path="/delete/{identificationNumber}")
	public ResponseEntity<Response> deleteClient(@PathVariable("identificationNumber") int identificationNumber){
		
		Response clientEliminated = clientService.deleteClient(identificationNumber);
		
		if (clientEliminated.getResponseCode().equals("404")) {
			return new ResponseEntity<>(clientEliminated,HttpStatus.NOT_FOUND);
		}
				
		if(clientEliminated.getResponseCode().equals("200")) {
			return new ResponseEntity<>(clientEliminated,HttpStatus.OK);	
		}else {
			return new ResponseEntity<>(clientEliminated,HttpStatus.BAD_REQUEST);	
		}
	}
	
	
	
	
}

	 