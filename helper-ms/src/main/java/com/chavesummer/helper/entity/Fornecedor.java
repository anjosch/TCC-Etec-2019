package com.chavesummer.helper.entity;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "fornecedor")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Fornecedor {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_fornecedor", unique = true, nullable = false, precision = 10, scale = 0)
    private Integer idFornecedor;
	
	@Column(name = "email", length = 255)
	private String email;
	
	@Column(name = "endereco", length = 255)
	private String endereco;
	
	@Column(name = "compl", length = 255)
	private String compl;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "id_estado", nullable = false)
	private Estado estado;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "id_cidade", nullable = false)
	private Cidade cidade;
	
	@Column(name = "cpf", length=20, unique = true)
	private String cpf;
	
	@Column(name = "nome", length = 255)
	private String nome;
	
	@Column(name = "cep", length = 9)
	private Integer cep;
	
	@Column(name = "cel", length = 25)
	private String cel;
	
	@Column(name = "pass", length = 80)
	private String pass;
	
	@Column(name = "status", length = 1)
	private String status;
	
	@Column(name = "resposta", length = 100)
	private String resposta;
	
	@OneToMany
    @JoinTable(
            name="fornecedor_servico",
            joinColumns = @JoinColumn( name="id_fornecedor"),
            inverseJoinColumns = @JoinColumn( name="id_servico")
    )
	private Set<Servico> servicos;
	
	@OneToMany(cascade=CascadeType.ALL, mappedBy = "fornecedor", targetEntity=com.chavesummer.helper.entity.Cartao.class)
	@JsonManagedReference
    private Set<Cartao> cartoes;
	
	@OneToMany
    @JoinTable(
            name="fornecedor_recusa",
            joinColumns = @JoinColumn( name="id_fornecedor"),
            inverseJoinColumns = @JoinColumn( name="id_os")
    )
	private Set<Ordemserv> osRecusadas;
	
	@Transient
	private String newPass;

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Fornecedor other = (Fornecedor) obj;
		
		if (cpf == null) {
			if (other.cpf != null)
				return false;
		} else if (!cpf.equals(other.cpf))
			return false;
		if (email == null) {
			if (other.email != null)
				return false;
		} else if (!email.equals(other.email))
			return false;
		if (idFornecedor == null) {
			if (other.idFornecedor != null)
				return false;
		} else if (!idFornecedor.equals(other.idFornecedor))
			return false;
		return true;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((cel == null) ? 0 : cel.hashCode());
		result = prime * result + ((cep == null) ? 0 : cep.hashCode());
		result = prime * result + ((cidade == null) ? 0 : cidade.hashCode());
		result = prime * result + ((compl == null) ? 0 : compl.hashCode());
		result = prime * result + ((cpf == null) ? 0 : cpf.hashCode());
		result = prime * result + ((email == null) ? 0 : email.hashCode());
		result = prime * result + ((endereco == null) ? 0 : endereco.hashCode());
		result = prime * result + ((estado == null) ? 0 : estado.hashCode());
		result = prime * result + ((idFornecedor == null) ? 0 : idFornecedor.hashCode());
		result = prime * result + ((nome == null) ? 0 : nome.hashCode());
		result = prime * result + ((pass == null) ? 0 : pass.hashCode());
		result = prime * result + ((resposta == null) ? 0 : resposta.hashCode());
		result = prime * result + ((status == null) ? 0 : status.hashCode());
		return result;
	}
	
	
}
