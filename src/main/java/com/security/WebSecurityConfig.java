package com.security;

import java.util.Arrays;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.security.config.Customizer;
@Configuration
@AllArgsConstructor
@EnableWebSecurity
public class WebSecurityConfig {

	private final UserDetailsService userDetailsService;
	private final JWTAuthorizationFilter jwtAuthorizationFilter ;
	
	
	
	
	@Bean
	
	SecurityFilterChain filterChain(HttpSecurity http,AuthenticationManager authManager) throws Exception{
		JWTAuthenticationFilter jwtAuthenticationFilter= new JWTAuthenticationFilter();
		jwtAuthenticationFilter.setAuthenticationManager(authManager);
		jwtAuthenticationFilter.setFilterProcessesUrl("/login");
		
			
			
			
	return http.cors(Customizer.withDefaults())
			.csrf().disable()
			
			.authorizeHttpRequests()
			.anyRequest()
			.authenticated()
			.and()
			.httpBasic()
			.and()
			.sessionManagement()
			.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
			.and()
			.addFilter(jwtAuthenticationFilter)
			.addFilterBefore(jwtAuthorizationFilter,UsernamePasswordAuthenticationFilter.class)
			.build();
			
			
			
	}
	
	
	
//	@Bean
//	public UserDetailsService userDetailsService() {
//		var user = User.withUsername("admin")
//				.password(passwordEncoder().encode("admin"))
//				.roles()
//				.build();
//		
//		return new InMemoryUserDetailsManager(user);
//		
//	}
	@Bean
    CorsConfigurationSource corsConfigurationSource() {
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("http://localhost:4200");
        config.addAllowedHeader("*");         
        config.addAllowedMethod("POST");
        config.addAllowedMethod("GET");
        config.addAllowedMethod("DELETE");
        config.addAllowedMethod("PUT");
        source.registerCorsConfiguration("/**", config);
        
        
        return source;
    }
	
	@Bean
	
	AuthenticationManager authManager(HttpSecurity http) throws Exception{
		return http.getSharedObject(AuthenticationManagerBuilder.class)
				.userDetailsService(userDetailsService)
				.passwordEncoder(passwordEncoder())
				.and()
				.build();
		
	}
	
	
	
		
	@Bean
	public PasswordEncoder passwordEncoder() {
		
		return new BCryptPasswordEncoder();
	}
	
	
	
	
}
