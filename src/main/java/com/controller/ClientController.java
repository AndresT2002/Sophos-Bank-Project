package com.controller;
import com.service.ClientService;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.entity.Client;




@RestController

@RequestMapping("/clients")
public class ClientController {

	
	@Autowired
	ClientService clientService;
	
	@GetMapping ("/mostrar")
	public ResponseEntity<List<Client>> getClients(){
		return new ResponseEntity<>(clientService.listClients(),HttpStatus.OK);
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
	
	
	
	
}

	 