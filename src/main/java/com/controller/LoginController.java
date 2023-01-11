package com.controller;

import java.security.Principal;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.security.UserDetailServiceImpl;
import com.security.UserDetailsImpl;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class LoginController {
	
	@Autowired
	UserDetailServiceImpl userDetailsServiceImpl;
	
	@GetMapping ("/currentUser")
	
	public ResponseEntity<UserDetailsImpl> getCurrentUser(Principal principal){
		
		UserDetailsImpl currentClient= (UserDetailsImpl) userDetailsServiceImpl.loadUserByUsername(principal.getName()); 
		
		return new ResponseEntity<>(currentClient,HttpStatus.OK);
	}
}
