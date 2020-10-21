package com.chavesummer.helper.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "ordem_servico_hist")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrdemservHist {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_os_hist", unique = true, nullable = false, precision = 10, scale = 0)
    private Integer idOsHist;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "id_cliente")
	private Cliente cliente;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "id_fornecedor")
	private Fornecedor fornecedor;
	
	@ManyToOne
	@JoinColumn(name = "id_os", nullable = false)
	@JsonBackReference
	private Ordemserv os;
	
    @Column(name = "status", length = 1, nullable = false)
	private String status;
    
    @Column(name = "mensagem")
	private String mensagem;
}