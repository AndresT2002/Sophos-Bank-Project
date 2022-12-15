package com.entity;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonBackReference;


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
	private Long productNumber;
	@Column(name="STATUS")
	private String status;
	@Column(name="PRODUCT_BALANCE")
	private Long productBalance;
	@Column(name="PRODUCT_AVAILABLE")
	private Long productAvailable;
	@Column(name="DEBT_VALUE")
	private Long debtValue;
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
	@JsonBackReference
	private Client belongsTo;
	
	
	
	public Product() {
		this.productBalance=(long) 20000;
		this.productAvailable=(long) 20000;
		this.debtValue=(long) 0;
		this.status="Inactive";
	}
	
	
	public Long getDebtValue() {
		return debtValue;
	}


	public void setDebtValue(Long debtValue) {
		this.debtValue = debtValue;
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



	public Long getProductNumber() {
		return productNumber;
	}



	public void setProductNumber(Long productNumber) {
		this.productNumber = productNumber;
	}



	public String getStatus() {
		return status;
	}



	public void setStatus(String status) {
		this.status = status;
	}



	public Long getProductBalance() {
		return productBalance;
	}



	public void setProductBalance(Long productBalance) {
		this.productBalance = productBalance;
	}



	public Long getProductAvailable() {
		return productAvailable;
	}



	public void setProductAvailable(Long productAvailable) {
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
