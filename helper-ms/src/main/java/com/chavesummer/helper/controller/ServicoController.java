package com.chavesummer.helper.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.chavesummer.helper.entity.Servico;
import com.chavesummer.helper.entity.ServicoRep;

import lombok.Data;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "/servico")
@Data
public class ServicoController {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(ServicoController.class);
	
	@Autowired
	private ServicoRep repository;
	
	@RequestMapping(value = "/", method = RequestMethod.GET, 
            produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Servico> retrieveAll() {
		
		List<Servico>  list = repository.findAll(Sort.by("ordem").ascending());
		
		return list;
	}
	
	@RequestMapping(value = "/", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, 
            produces = MediaType.APPLICATION_JSON_VALUE)
    public void insert(@RequestBody(required = true) Servico in) {

		repository.save(in);
	}
	
		
}