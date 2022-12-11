package com.service;
import com.entity.Client;
import java.util.List;



public interface ClientService {

	
	public Client createClient(Client client);
	public Client deleteClient(Client client);
	public Client updateClient(Client client);
	public List<Client> listClients();
	
}
