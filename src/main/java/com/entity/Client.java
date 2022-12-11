package com.entity;


import java.sql.Date;

import jakarta.persistence.*;
import jakarta.persistence.Table;


@Entity
@Table(name="CLIENTS")
public class Client {
	@Id
	
	@Column(name="ID")
	private int id;
	@Column(name="TIPO_DE_IDENTIFICACION")
	private String tipoDeIdentificacion;
	@Column(name="NUMERO_DE_IDENTIFICACION")
	private int numeroDeIdentificacion;
	@Column(name="NOMBRES")
	private String nombres;
	@Column(name="APELLIDO")
	private String apellido;
	@Column(name="CORREO_ELECTRONICO")
	private String correoElectronico;
	@Column(name="FECHA_DE_NACIMIENTO")
	private Date fechaDeNacimiento;
	@Column(name="FECHA_DE_CREACION")
	private Date fechaDeCreacion;
	@Column(name="USUARIO_CREACION")
	private String usuarioCreacion;
	@Column(name="FECHA_DE_MODIFICACION")
	private Date fechaDeModificacion;
	@Column(name="USUARIO_MODIFICACION")
	private String usuarioModificacion;
	@Column(name="PASSWORD")
	private String password;
	
	public Client() {
		
	}
	
	
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getTipoDeIdentificacion() {
		return tipoDeIdentificacion;
	}
	public void setTipoDeIdentificacion(String tipoDeIdentificacion) {
		this.tipoDeIdentificacion = tipoDeIdentificacion;
	}
	public int getNumeroDeIdentificacion() {
		return numeroDeIdentificacion;
	}
	public void setNumeroDeIdentificacion(int numeroDeIdentificacion) {
		this.numeroDeIdentificacion = numeroDeIdentificacion;
	}
	public String getNombres() {
		return nombres;
	}
	public void setNombres(String nombres) {
		this.nombres = nombres;
	}
	public String getApellido() {
		return apellido;
	}
	public void setApellido(String apellido) {
		this.apellido = apellido;
	}
	public Date getFechaDeNacimiento() {
		return fechaDeNacimiento;
	}
	public void setFechaDeNacimiento(Date fechaDeNacimiento) {
		this.fechaDeNacimiento = fechaDeNacimiento;
	}
	public String getCorreoElectronico() {
		return correoElectronico;
	}
	public void setCorreoElectronico(String correoElectronico) {
		this.correoElectronico = correoElectronico;
	}
	public Date getFechaDeCreacion() {
		return fechaDeCreacion;
	}
	public void setFechaDeCreacion(Date fechaDeCreacion) {
		this.fechaDeCreacion = fechaDeCreacion;
	}
	public String getUsuarioCreacion() {
		return usuarioCreacion;
	}
	public void setUsuarioCreacion(String usuarioCreacion) {
		this.usuarioCreacion = usuarioCreacion;
	}
	public Date getFechaDeModificacion() {
		return fechaDeModificacion;
	}
	public void setFechaDeModificacion(Date fechaDeModificacion) {
		this.fechaDeModificacion = fechaDeModificacion;
	}
	public String getUsuarioModificacion() {
		return usuarioModificacion;
	}
	public void setUsuarioModificacion(String usuarioModificacion) {
		this.usuarioModificacion = usuarioModificacion;
	}



	public String getPassword() {
		return password;
	}



	public void setPassword(String password) {
		this.password = password;
	}
	
	
	
	
	
}
