package com.chavesummer.helper.controller;

import java.util.Optional;

import javax.xml.ws.http.HTTPException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.chavesummer.helper.entity.Cliente;
import com.chavesummer.helper.entity.ClienteRep;
import com.chavesummer.helper.to.Login;

import lombok.Data;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "/cliente")
@Data
public class ClienteController {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(ClienteController.class);
	
	@Autowired
	private ClienteRep repository;
	
	
	
	@RequestMapping(value = "/login", method = RequestMethod.POST, 
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Cliente login(@RequestBody(required = true) Login in) {
		
		Optional<Cliente> c = repository.findByEmailAndPass(in.getEmail(), in.getSenha());
		
		if (c.isPresent() && !c.get().getStatus().equalsIgnoreCase("A")) {
			return null;
		}
		
		return c.get();
	}
	
	@RequestMapping(value = "/", method = RequestMethod.POST, 
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Cliente insert(@RequestBody(required = true) Cliente in) {
		
		Cliente c = repository.save(in);
		
		return c;
	}
	
	@RequestMapping(value = "/", method = RequestMethod.PUT, 
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Cliente update(@RequestBody(required = true) Cliente in) {
		
		Cliente c = repository.save(in);
		
		return c;
	}
	
	@RequestMapping(value = "/status", method = RequestMethod.PUT, 
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Cliente changeStatus(@RequestBody(required = true) Cliente in) {
		
		Optional<Cliente> o = repository.findById(in.getIdCliente());
		if (o.isPresent())
		{
			o.get().setStatus(in.getStatus());
			repository.save(o.get());
		}
		return o.get();
	}
	
	@RequestMapping(value = "/changepass", method = RequestMethod.PUT, 
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Cliente changePass(@RequestBody(required = true) Cliente in) {
		
		Optional<Cliente> o = repository.findById(in.getIdCliente());
		if (o.isPresent())
		{
			if (o.get().getResposta().equals(in.getResposta()) && o.get().getPass().equals(in.getPass())) {
				o.get().setPass(in.getNewPass());
				return repository.save(o.get());
				
			} else {
				throw new HTTPException(HttpStatus.BAD_REQUEST.value());
			}
			
		}
		throw new HTTPException(HttpStatus.NOT_FOUND.value());
	}
	
	@RequestMapping(value = "/forgotpass", method = RequestMethod.PUT, 
            produces = MediaType.APPLICATION_JSON_VALUE)
	public Cliente changePassCpf(@RequestBody(required = true) Cliente in) {
		
		Optional<Cliente> o = repository.findByCpf(in.getCpf());
		if (o.isPresent())
		{
			if (o.get().getResposta().equals(in.getResposta())) {
				o.get().setPass(in.getPass());
				return repository.save(o.get());
				
			} else {
				throw new HTTPException(HttpStatus.BAD_REQUEST.value());
			}
			
		}
		throw new HTTPException(HttpStatus.NOT_FOUND.value());
		
	}
}