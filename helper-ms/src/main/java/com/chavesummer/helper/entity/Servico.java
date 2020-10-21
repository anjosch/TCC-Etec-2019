package com.chavesummer.helper.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "servico")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Servico {

	@Id
	@Column(name = "id_servico", unique = true, nullable = false, precision = 11, scale = 0)
    private Integer idServico;
	
	@Column(name = "nome", length = 55, nullable = false)
	private String nome;
	
	@Column(name = "icone", nullable = false)
	private String icone;
	
	@Column(name = "status", length = 1, nullable = false)
	private String status;
	
	@Column(name = "ordem", precision=5, scale=0, nullable = false)
	private Integer ordem;
	
	@Column(name = "valor", precision=11, scale=2)
	private BigDecimal valor;
	
	@Column(name = "insercao")
	private LocalDateTime insercao;
    
    @Column(name = "atualizacao")
	private LocalDateTime atualizacao;
}
