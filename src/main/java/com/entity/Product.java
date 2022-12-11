package com.entity;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="PRODUCTS")
public class Product {
	
	
	@Id
	@Column(name="ID")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	@Column(name="PRODUCT_TYPE")
	private String productType;
	@Column(name="PRODUCT_NUMBER")
	private int productNumber;
	@Column(name="STATUS")
	private String status;
	@Column(name="PRODUCT_BALANCE")
	private int productBalance;
	@Column(name="PRODUCT_AVAILABLE")
	private int productAvailable;
	@Column(name="GMF")
	private String gmf;
	@Column(name="CREATED_AT")
	private Date createdAt;
	@Column(name="CREATED_BY")
	private String createdBy;
	@Column(name="MODIFIED_AT")
	private Date modifiedAt;
	@Column(name="MODIFIED_BY")
	private String modifiedBy;
	@ManyToOne
	@JoinColumn(name="BELONGS_TO")
	@JsonIgnore
	private Client belongsTo;
	
	
	
	public Product() {
		this.productBalance=0;
		this.productAvailable=0;
	}
	
	
	public int getId() {
		return id;
	}



	public void setId(int id) {
		this.id = id;
	}



	public String getProductType() {
		return productType;
	}



	public void setProductType(String productType) {
		this.productType = productType;
	}



	public int getProductNumber() {
		return productNumber;
	}



	public void setProductNumber(int productNumber) {
		this.productNumber = productNumber;
	}



	public String getStatus() {
		return status;
	}



	public void setStatus(String status) {
		this.status = status;
	}



	public int getProductBalance() {
		return productBalance;
	}



	public void setProductBalance(int productBalance) {
		this.productBalance = productBalance;
	}



	public int getProductAvailable() {
		return productAvailable;
	}



	public void setProductAvailable(int productAvailable) {
		this.productAvailable = productAvailable;
	}



	public String getGmf() {
		return gmf;
	}



	public void setGmf(String gmf) {
		this.gmf = gmf;
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



	public Client getBelongsTo() {
		return belongsTo;
	}



	public void setBelongsTo(Client belongsTo) {
		this.belongsTo = belongsTo;
	}



	
	
	
}
