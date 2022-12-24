package com.entity;


import java.sql.Date;
import java.util.List;


import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;


@Entity
@Table(name="CLIENTS")
public class Client {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="ID")
	private int id;
	@Column(name="IDENTIFICATION_TYPE")
	private String identificationType;
	@Column(name="IDENTIFICATION_NUMBER")
	private int identificationNumber;
	@Column(name="NAME")
	private String name;
	@Column(name="LAST_NAME")
	private String lastName;
	@Column(name="EMAIL")
	private String email;
	@Column(name="BIRTHDAY")
	private Date birthDay;
	@Column(name="CREATED_AT")
	private Date createdAt;
	@Column(name="CREATED_BY")
	private String createdBy;
	@Column(name="MODIFIED_AT")
	private Date modifiedAt;
	@Column(name="MODIFIED_BY")
	private String modifiedBy;
	@Column(name="ROLE")
	private String role;
	
	
	public String getRole() {
		return role;
	}


	public void setRole(String role) {
		this.role = role;
	}


	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}


	public String getIdentificationType() {
		return identificationType;
	}


	public void setIdentificationType(String identificationType) {
		this.identificationType = identificationType;
	}


	public int getIdentificationNumber() {
		return identificationNumber;
	}


	public void setIdentificationNumber(int identificationNumber) {
		this.identificationNumber = identificationNumber;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public String getLastName() {
		return lastName;
	}


	public void setLastName(String lastName) {
		this.lastName = lastName;
	}


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}


	public Date getBirthDay() {
		return birthDay;
	}


	public void setBirthDay(Date birthDay) {
		this.birthDay = birthDay;
	}


	public Date getCreatedAt() {
		return createdAt;
	}


	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}


	public String getCreatedBy() {
		return createdBy;
	}


	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}


	public Date getModifiedAt() {
		return modifiedAt;
	}


	public void setModifiedAt(Date modifiedAt) {
		this.modifiedAt = modifiedAt;
	}


	public String getModifiedBy() {
		return modifiedBy;
	}


	public void setModifiedBy(String modifiedBy) {
		this.modifiedBy = modifiedBy;
	}


	public String getPassword() {
		return password;
	}


	public void setPassword(String password) {
		this.password = password;
	}


	public List<Product> getProducts() {
		return products;
	}


	public void setProducts(List<Product> products) {
		this.products = products;
	}


	@Column(name="PASSWORD")
	private String password;
	@OneToMany(mappedBy="belongsTo")
	@JsonManagedReference
	private List<Product> products;
	
	
	public Client() {
		this.createdBy="admin";
	}
	
	


	
	
	
	
	
	
	
	
}
