package com.security;

import java.util.Collection;
import java.util.Collections;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.entity.Client;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class UserDetailsImpl implements UserDetails{

	private final Client client;
	
	
	
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		
		return Collections.emptyList();
	}

	@Override
	public String getPassword() {
		
		return client.getPassword();
	}

	@Override
	public String getUsername() {
		
		return client.getEmail();
	}
	
	public String getRole() {
		
		return client.getRole();
	}
	
	@Override
	public boolean isAccountNonExpired() {
		
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		
		return true;
	}

	@Override
	public boolean isEnabled() {
		
		return true;
	}
	
	public String getName() {
		return client.getName();
	}
	
	public int getId() {
		return client.getId();
	}
	
	public int getIdentificationNumber() {
		return client.getIdentificationNumber();
	}
	
	

}
