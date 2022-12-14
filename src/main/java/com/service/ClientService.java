package com.service;
import com.entity.Client;
import java.util.List;
import java.util.Optional;



public interface ClientService {

	
	public Client createClient(Client client);
	public boolean deleteClient(int id);
	public Client updateClient(Client client,int userId);
	public List<Client> listClients();
	public Optional<Client> getClientById(int id);
	
}
