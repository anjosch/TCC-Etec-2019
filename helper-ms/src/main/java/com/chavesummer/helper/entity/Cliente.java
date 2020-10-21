package com.chavesummer.helper.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "cliente")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Cliente {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_cliente", unique = true, nullable = false, precision = 10, scale = 0)
    private Integer idCliente;
	
	@Column(name = "nome", length = 50)
	private String nome;
	
	@Column(name = "cel", length=25)
	private String cel;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "id_estado", nullable = false)
	private Estado estado;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "id_cidade", nullable = false)
	private Cidade cidade;
	
	@Column(name = "cpf", length=20, unique = true)
	private String cpf;
	
	@Column(name = "endereco", length = 255)
	private String endereco;
	
	@Column(name = "compl", length = 255)
	private String compl;
	
	@Column(name = "cep", precision = 9, scale = 0)
	private Integer cep;
	
	@Column(name = "email", length = 255, unique = true)
	private String email;
	
	@Column(name = "pass", length=80)
	private String pass;
	
	@Column(name = "resposta", length = 100)
	private String resposta;
	
	@Column(name = "insercao")
	private LocalDateTime insercao;
	
	@Column(name = "atualizacao")
	private LocalDateTime Atualizacao;
	
	@Column(name = "status", length = 1)
	private String status;
	
	@Transient
	private String newPass;
}
