package com.service;
import com.entity.Client;
import com.entity.Product;

import java.sql.Date;
import java.time.LocalDate;
// import java.time.Month;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.repository.ClientRepository;
import com.repository.ProductRepository;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Service
public class ClientServiceImplementation implements ClientService{

	@Autowired
	ClientRepository clientRepository;
	@Autowired
	ProductRepository productRepository;
	
	
	
	@Override
	public Client createClient(Client client) {
		Date birthDate=client.getBirthDay();
		
		LocalDate dateParsed = birthDate.toLocalDate();
		int birthYear=dateParsed.getYear();
		
		
		
		
		ZoneId zoneId = ZoneId.of( "America/Bogota" );  // Or 'ZoneOffset.UTC'.
		ZonedDateTime now = ZonedDateTime.now( zoneId );
		int currentYear=now.getYear();
		
		Pattern pattern = Pattern.compile("^[_A-ZáéíóúÁÉÍÓÚñÑa-z0-9-\\+]+(\\.[_A-ZáéíóúÁÉÍÓÚñÑa-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$");
        Matcher matcher = pattern.matcher(client.getEmail());
        
		if((currentYear-birthYear <18) || (client.getName().length() <= 2) || (client.getLastName().length() <= 2) || (!matcher.find())) {
			return null;
					
		}else {
			String password= new BCryptPasswordEncoder().encode(client.getPassword());
			
			client.setPassword(password);
			
			ZonedDateTime zonedDateTime = ZonedDateTime.now(ZoneId.of("America/Bogota"));
			LocalDate localDate = zonedDateTime.toLocalDate();
			java.sql.Date sqlDate = java.sql.Date.valueOf(localDate);
			
			client.setCreatedAt(sqlDate);
			return clientRepository.save(client);
		}
		
		
		
	}
	
	@Override
	public boolean deleteClient(int id) {
		Optional<Client> client=clientRepository.findById(id);

		if(client.isPresent()) {
			Client clientObtained=client.get();
			List <Product> clientProducts=productRepository.findByBelongsTo(clientObtained);
			boolean hasActive=clientProducts.stream().filter(o -> o.getStatus().equals("Active")).findFirst().isPresent();
			System.out.println(hasActive);
			if (!hasActive) {
				clientRepository.delete(clientObtained);
				return true;
			}
		}
		
		
		return false;
	}

	@Override
	public Client updateClient(Client client,int userId) {
		ZonedDateTime zonedDateTime = ZonedDateTime.now(ZoneId.of("America/Bogota"));
		LocalDate localDate = zonedDateTime.toLocalDate();
		
		java.sql.Date sqlDate = java.sql.Date.valueOf(localDate);
		
		
		//FALTA AGREGAR VALIDACION DE SI EXISTE O NO
		Optional<Client> getClient = clientRepository.findById(userId);
		if(getClient.isPresent()) {
			Client clientToUpdate= getClient.get();
			clientToUpdate.setLastName(client.getLastName());
			clientToUpdate.setEmail(client.getEmail());
			clientToUpdate.setModifiedAt(sqlDate);
			clientToUpdate.setName(client.getName());
			clientToUpdate.setIdentificationNumber(client.getIdentificationNumber());
			if(!client.getPassword().isEmpty()) {
				clientToUpdate.setPassword(new BCryptPasswordEncoder().encode(client.getPassword()));
			}		
			client.setCreatedBy("Admin");
			clientToUpdate.setIdentificationType(client.getIdentificationType());
			clientToUpdate.setModifiedBy("ADMIN");
			
			return clientRepository.save(clientToUpdate);
		}else {
			return null;
		}
			
		
	}

	@Override
	public List<Client> listClients() {
		
		return clientRepository.findAll();
		
		
		
	}

	@Override
	public Optional<Client> getClientById(int id) {
		
		return clientRepository.findById(id);
	}

	@Override
	public Client getClientByEmail(String email) {
		Optional<Client> client= clientRepository.findByEmail(email);
		if (!client.isPresent()) {
			return null;
		}
		Client clientFinded=client.get();
		
		return clientFinded;
	}

	

	
	
}
