package com.service;
import com.entity.Client;
import com.entity.Product;
import com.entity.Response;

import java.sql.Date;
import java.time.LocalDate;


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


@Service
public class ClientServiceImplementation implements ClientService{

	@Autowired
	ClientRepository clientRepository;
	@Autowired
	ProductRepository productRepository;
	
	
	
	@Override
	public Response createClient(Client client) {
		Date birthDate=client.getBirthDay();
		
		LocalDate dateParsed = birthDate.toLocalDate();
		int birthYear=dateParsed.getYear();
		
		
		
		
		
		ZoneId zoneId = ZoneId.of( "America/Bogota" );  // Or 'ZoneOffset.UTC'.
		ZonedDateTime now = ZonedDateTime.now( zoneId );
		int currentYear=now.getYear();
		
		Pattern pattern = Pattern.compile("^[_A-ZáéíóúÁÉÍÓÚñÑa-z0-9-\\+]+(\\.[_A-ZáéíóúÁÉÍÓÚñÑa-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$");
        Matcher matcher = pattern.matcher(client.getEmail());
        
        
        Optional<Client> clientByIdentification=clientRepository.findByIdentificationNumber(client.getIdentificationNumber());
		Optional<Client> clientByEmail=clientRepository.findByEmail(client.getEmail());
		
		if(clientByIdentification.isPresent() || clientByEmail.isPresent()) {
			Response errorResponse= new Response();
			errorResponse.setResponseCode("409");
			return errorResponse;
		}
		
        
		if((currentYear-birthYear < 18) || (client.getName().length() <= 2) || (client.getLastName().length() <= 2) || (!matcher.find())) {
			Response errorResponse= new Response();
			errorResponse.setResponseCode("400");
			return errorResponse;
					
		}else {
			String password= new BCryptPasswordEncoder().encode(client.getPassword());
			
			client.setPassword(password);
			
			ZonedDateTime zonedDateTime = ZonedDateTime.now(ZoneId.of("America/Bogota"));
			LocalDate localDate = zonedDateTime.toLocalDate();
			java.sql.Date sqlDate = java.sql.Date.valueOf(localDate);
			
			client.setCreatedAt(sqlDate);
			clientRepository.save(client);
			
			Response successResponse= new Response();
			successResponse.setResponseCode("200");
			return successResponse;
		}
		
		
		
	}
	
	@Override
	public Response deleteClient(int identificationNumber) {
		Optional<Client> client=clientRepository.findByIdentificationNumber(identificationNumber);

		if(client.isPresent()) {
			Client clientObtained=client.get();
			List <Product> clientProducts=productRepository.findByBelongsTo(clientObtained);
			boolean hasActive=clientProducts.stream().anyMatch(o -> o.getStatus().equals("Active"));
			
			if (!hasActive) {
				clientRepository.delete(clientObtained);
				Response successResponse= new Response();
				successResponse.setResponseCode("200");
				return successResponse;
			}else {
				Response errorResponse= new Response();
				errorResponse.setResponseCode("400");
				return errorResponse;
			}
		}
		
		Response errorResponse= new Response();
		errorResponse.setResponseCode("404");
		return errorResponse;
	}

	@Override
	public Response updateClient(Client client,int userId) {
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
			
			clientToUpdate.setIdentificationType(client.getIdentificationType());
			clientToUpdate.setModifiedBy(client.getModifiedBy()	);
			
			clientRepository.save(clientToUpdate);
			
			Response successResponse= new Response();
			successResponse.setResponseCode("200");
			return successResponse;
			
		}else {
			Response errorResponse= new Response();
			errorResponse.setResponseCode("404");
			return errorResponse;
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
				
		return client.get();
	}

	

	

	
	
}
