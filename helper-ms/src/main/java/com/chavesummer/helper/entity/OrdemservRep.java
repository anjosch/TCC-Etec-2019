package com.chavesummer.helper.entity;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface OrdemservRep extends JpaRepository<Ordemserv, Integer> {
	List<Ordemserv> findByCliente(Cliente cliente);
	List<Ordemserv> findByFornecedor(Fornecedor fornecedor);
}
