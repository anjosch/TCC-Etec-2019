package com.chavesummer.helper.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
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
@Table(name = "cartao_fornecedor")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Cartao {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_cartao", unique = true, nullable = false, precision = 10, scale = 0)
    private Integer idCartao;
	
	@Column(name = "nome_titular", length = 50)
	private String nomeTitular;
	
	@Column(name = "validade")
	private String validade;
	
	@Column(name = "num_cartao", length=20)
	private String numCartao;
	
	@Column(name = "cvv", length = 3)
	private String cvv;

	@ManyToOne
	@JoinColumn(name = "id_fornecedor", nullable = false)
	@JsonBackReference
	private Fornecedor fornecedor;

}
