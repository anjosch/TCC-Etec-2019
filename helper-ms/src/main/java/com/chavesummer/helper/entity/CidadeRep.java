package com.chavesummer.helper.entity;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CidadeRep extends JpaRepository<Cidade, Integer> {

	List<Cidade> findByEstado(Estado estado);
}
