package com.chavesummer.helper.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.chavesummer.helper.entity.Estado;
import com.chavesummer.helper.entity.EstadoRep;

import lombok.Data;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "/estado")
@Data
public class EstadoController {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(EstadoController.class);
	
	@Autowired
	private EstadoRep repository;
	
	@RequestMapping(value = "/", method = RequestMethod.GET, 
            produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Estado> retrieveAll() {
		
		return repository.findAll(Sort.by("estado").ascending());
	}
			
}