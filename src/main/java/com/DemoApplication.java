package com;

import java.util.TimeZone;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

import jakarta.annotation.PostConstruct;

@SpringBootApplication

public class DemoApplication {

	//Defino zona horaria igual al PC
	@PostConstruct
    void started() {
      TimeZone.setDefault(TimeZone.getTimeZone("TimeZone"));
    }
	
	
	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}
	

}
