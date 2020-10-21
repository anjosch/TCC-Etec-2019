package com.chavesummer.helper.entity;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRep extends JpaRepository<Cliente, Integer> {

	Optional<Cliente> findByEmailAndPass(String email, String pass);

	Optional<Cliente> findByCpf(String cpf);
}
