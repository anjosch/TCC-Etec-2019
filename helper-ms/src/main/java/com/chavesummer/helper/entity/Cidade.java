package com.chavesummer.helper.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "cidade")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Cidade {

	@Id
    @Column(name = "id_cidade", unique = true, nullable = false, precision = 11, scale = 0)
    private Integer idCidade;
	
	@Column(name = "cidade", length = 55)
	private String cidade;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "id_estado", nullable = false)
	private Estado estado ;
}
