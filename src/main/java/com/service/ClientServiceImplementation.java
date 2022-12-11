package com.service;
import com.entity.Client;

import java.sql.Date;
import java.time.LocalDate;
// import java.time.Month;

import java.time.ZoneId;
import java.time.ZonedDateTime;
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
		Date birthDate=client.getFechaDeNacimiento();
		LocalDate dateParsed = birthDate.toLocalDate();
		int birthYear=dateParsed.getYear();
		// int birthMonth=dateParsed.getMonth().getValue(); 
		// int birthDay=dateParsed.getDayOfMonth();
		
		ZoneId zoneId = ZoneId.of( "America/Montreal" );  // Or 'ZoneOffset.UTC'.
		ZonedDateTime now = ZonedDateTime.now( zoneId );
		// Month month = now.getMonth(); 
		int currentYear=now.getYear();
		// int currentDay=now.getDayOfMonth();
		// int currentMonth = month.getValue(); 
		
		// && currentMonth >= birthMonth && currentDay >= birthDay
		if(currentYear-birthYear >= 18 ) {
			
			return clientRepository.save(client);
					
		}else {
			return null;
		}
		
		
		
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
