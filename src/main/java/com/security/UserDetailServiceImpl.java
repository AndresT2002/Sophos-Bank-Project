package com.security;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.entity.Client;
import com.repository.ClientRepository;


@Service
public class UserDetailServiceImpl implements UserDetailsService{

	
	@Autowired
	ClientRepository clientRepository;
	
	
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		Client client=clientRepository.findByEmail(email)
					.orElseThrow(()->  new UsernameNotFoundException("No se encuntra el email"));
		
		return new UserDetailsImpl(client);
	}

	
		
}
