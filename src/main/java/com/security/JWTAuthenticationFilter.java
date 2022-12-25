package com.security;

import java.io.IOException;
import java.util.Collections;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.entity.Response;
import com.fasterxml.jackson.core.exc.StreamReadException;
import com.fasterxml.jackson.databind.DatabindException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.security.core.AuthenticationException;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;

@RequiredArgsConstructor

public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

	
	@Override
	public Authentication attemptAuthentication(HttpServletRequest request,
												HttpServletResponse response) throws AuthenticationException{
		
		AuthCredentials authCredentials=new AuthCredentials();
		
		try {
			authCredentials=new ObjectMapper().readValue(request.getReader(),AuthCredentials.class);
			
		} catch (IOException e) {
			System.out.println("ENTRE ERROR");
			e.printStackTrace();
		} 
		
		UsernamePasswordAuthenticationToken usernamePAT= new UsernamePasswordAuthenticationToken(authCredentials.getEmail(),
				authCredentials.getPassword(),Collections.emptyList());
		
		
		
		return getAuthenticationManager().authenticate(usernamePAT);
	}
	
	
	
	@Override
	public void successfulAuthentication (HttpServletRequest request,
			HttpServletResponse response,FilterChain chain, Authentication authResult) throws IOException, ServletException {
			
		UserDetailsImpl  userDetails=(UserDetailsImpl) authResult.getPrincipal();
		
		String token= TokenUtils.createToken(userDetails.getNombre(),userDetails.getUsername());
		
		Response responseObjec= new Response();
		responseObjec.setToken(token);
		
		String json = new ObjectMapper().writeValueAsString(responseObjec);
		
		response.addHeader("Authorization", "Bearer "+token);
		response.getWriter().write(json);
		response.getWriter().flush();
		
		super.successfulAuthentication(request, response, chain, authResult);
		
	}
		
	
	
	
	
	
}
