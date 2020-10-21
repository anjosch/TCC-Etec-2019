package com.chavesummer.helper.controller;

import java.util.List;

import javax.websocket.server.PathParam;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.chavesummer.helper.entity.Cidade;
import com.chavesummer.helper.entity.CidadeRep;
import com.chavesummer.helper.entity.Estado;

import lombok.Data;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "/cidade")
@Data
public class CidadeController {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(CidadeController.class);
	
	@Autowired
	private CidadeRep repository;
	
	@RequestMapping(value = "/", method = RequestMethod.GET, 
            produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Cidade> retrieveAll() {
		
		return repository.findAll(Sort.by("cidade").ascending());
	}
	
	
	@RequestMapping(value = "/{estado}", method = RequestMethod.GET, 
            produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Cidade>get(@PathVariable(name = "estado") Integer idEstado) {
		
		Estado estado = new Estado();
		estado.setIdEstado(idEstado);
		return repository.findByEstado(estado);
	}
	
}