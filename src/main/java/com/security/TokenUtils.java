package com.security;

import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;

import io.jsonwebtoken.SignatureAlgorithm;

import java.security.Key;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;


public class TokenUtils {
	private static final String ACCESS_TOKEN_SECRET = "4qhq8LrEBfYcaRHxhdb9zURb2rf8e7Ud";
	private static final Long ACCESS_TOKEN_VALIDITY_SECONDS = 3600L;
	
	
	public static String createToken(String nombre, String email) {
		
		long expirationTime=ACCESS_TOKEN_VALIDITY_SECONDS*1000;
		Date expirationDate= new Date(System.currentTimeMillis()+expirationTime);


		SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;

	    
	    

	   
	    byte[] apiKeySecretBytes = DatatypeConverter.parseBase64Binary(ACCESS_TOKEN_SECRET);
	    Key signingKey = new SecretKeySpec(apiKeySecretBytes, signatureAlgorithm.getJcaName());
		
		
		Map<String,Object> extra=new HashMap<>();
		extra.put("nombre",nombre);
		
		
		return  Jwts.builder()
				.setSubject(email)
				.setExpiration(expirationDate)
				.addClaims(extra)
				.signWith(signatureAlgorithm, signingKey)
				.compact();
				
		
		
		
	}
	
		
	public static UsernamePasswordAuthenticationToken getAuthenticationToken(String token) {
		try {
			
			Claims claims=Jwts.parser()
					.setSigningKey(DatatypeConverter.parseBase64Binary(ACCESS_TOKEN_SECRET))
					.parseClaimsJws(token)
					.getBody();
	
			
	
			String email=claims.getSubject();
			
			return new UsernamePasswordAuthenticationToken(email,null, Collections.emptyList());
	
	
		}catch(JwtException e) {
			
			return null;
		}
		
	}
	
}
