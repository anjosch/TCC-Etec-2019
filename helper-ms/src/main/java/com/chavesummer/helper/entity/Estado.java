package com.chavesummer.helper.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "estado")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Estado {

	@Id
    @Column(name = "id_estado", unique = true, nullable = false, precision = 11, scale = 0)
    private Integer idEstado;
	
	@Column(name = "estado", length = 2)
	private String estado;
	
}
