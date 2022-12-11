package com.service;
import com.entity.Client;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.repository.ClientRepository;

@Service
public class ClientServiceImplementation implements ClientService{

	@Autowired
	ClientRepository clientRepository;
	
	
	
	@Override
	public Client createClient(Client client) {
		
		
		return clientRepository.save(client);
	}

	@Override
	public Client deleteClient(Client client) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Client updateClient(Client client) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Client> listClients() {
		
		return clientRepository.findAll();
		
		
		
	}

	

	
	
}
