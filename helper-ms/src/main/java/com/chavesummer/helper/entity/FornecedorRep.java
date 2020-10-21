package com.chavesummer.helper.entity;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface FornecedorRep extends JpaRepository<Fornecedor, Integer> {

	Optional<Fornecedor> findByEmailAndPass(String email, String pass);

	Optional<Fornecedor> findByCpf(String cpf);
}
