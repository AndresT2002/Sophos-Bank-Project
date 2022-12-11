package com.service;
import com.entity.Client;
import java.util.List;



public interface ClientService {

	
	public Client createClient(Client client);
	public Client deleteClient(Client client);
	public Client updateClient(Client client,int userId);
	public List<Client> listClients();
	public Client getClientById(int id);
	
}
