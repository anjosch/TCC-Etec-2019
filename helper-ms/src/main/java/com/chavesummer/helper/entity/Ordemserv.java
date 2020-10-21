package com.chavesummer.helper.entity;

import java.time.LocalDateTime;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "ordem_servico")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Ordemserv {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_os", unique = true, nullable = false, precision = 10, scale = 0)
    private Integer idOs;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "id_servico", nullable = false)
	private Servico servico;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "id_cliente", nullable = false)
	private Cliente cliente;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "id_fornecedor")
	private Fornecedor fornecedor;
    
    @Column(name = "descricao")
    private String descricao;
    
    @Column(name = "garantia", length = 1)
	private String garantia;
    
    @Column(name = "marca", length = 55)
	private String marca;
    
    @Column(name = "tipo", length = 55)
	private String tipo;
    
    @Column(name = "insercao")
	private LocalDateTime insercao;
    
    @Column(name = "atualizacao")
	private LocalDateTime atualizacao;
    
    @Column(name = "prazo")
	private Integer prazo;
    
    @Column(name = "status", length = 1, nullable = false)
	private String status;

    @Transient
    private String mensagem;
    
    @OneToMany(cascade=CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)  
    @JoinColumn(name="id_os")
    @JsonManagedReference
    private Set<OrdemservHist> hist;

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Ordemserv other = (Ordemserv) obj;
		if (atualizacao == null) {
			if (other.atualizacao != null)
				return false;
		} else if (!atualizacao.equals(other.atualizacao))
			return false;
		if (cliente == null) {
			if (other.cliente != null)
				return false;
		} else if (!cliente.equals(other.cliente))
			return false;
		if (descricao == null) {
			if (other.descricao != null)
				return false;
		} else if (!descricao.equals(other.descricao))
			return false;
		if (fornecedor == null) {
			if (other.fornecedor != null)
				return false;
		} else if (!fornecedor.equals(other.fornecedor))
			return false;
		if (garantia == null) {
			if (other.garantia != null)
				return false;
		} else if (!garantia.equals(other.garantia))
			return false;
		if (idOs == null) {
			if (other.idOs != null)
				return false;
		} else if (!idOs.equals(other.idOs))
			return false;
		if (insercao == null) {
			if (other.insercao != null)
				return false;
		} else if (!insercao.equals(other.insercao))
			return false;
		if (marca == null) {
			if (other.marca != null)
				return false;
		} else if (!marca.equals(other.marca))
			return false;
		if (mensagem == null) {
			if (other.mensagem != null)
				return false;
		} else if (!mensagem.equals(other.mensagem))
			return false;
		if (prazo == null) {
			if (other.prazo != null)
				return false;
		} else if (!prazo.equals(other.prazo))
			return false;
		if (servico == null) {
			if (other.servico != null)
				return false;
		} else if (!servico.equals(other.servico))
			return false;
		if (status == null) {
			if (other.status != null)
				return false;
		} else if (!status.equals(other.status))
			return false;
		if (tipo == null) {
			if (other.tipo != null)
				return false;
		} else if (!tipo.equals(other.tipo))
			return false;
		return true;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((atualizacao == null) ? 0 : atualizacao.hashCode());
		result = prime * result + ((cliente == null) ? 0 : cliente.hashCode());
		result = prime * result + ((descricao == null) ? 0 : descricao.hashCode());
		result = prime * result + ((fornecedor == null) ? 0 : fornecedor.hashCode());
		result = prime * result + ((garantia == null) ? 0 : garantia.hashCode());
		result = prime * result + ((idOs == null) ? 0 : idOs.hashCode());
		result = prime * result + ((insercao == null) ? 0 : insercao.hashCode());
		result = prime * result + ((marca == null) ? 0 : marca.hashCode());
		result = prime * result + ((mensagem == null) ? 0 : mensagem.hashCode());
		result = prime * result + ((prazo == null) ? 0 : prazo.hashCode());
		result = prime * result + ((servico == null) ? 0 : servico.hashCode());
		result = prime * result + ((status == null) ? 0 : status.hashCode());
		result = prime * result + ((tipo == null) ? 0 : tipo.hashCode());
		return result;
	}
    
    
}