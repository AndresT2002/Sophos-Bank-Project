package com.service;
import com.entity.Client;
import com.entity.Response;

import java.util.List;
import java.util.Optional;



public interface ClientService {
	
	
	public Response createClient(Client client);
	public Response deleteClient(int id);
	public Response updateClient(Client client,int userId);
	public List<Client> listClients();
	public Optional<Client> getClientById(int id);
	public Client getClientByEmail(String email);
	
}
