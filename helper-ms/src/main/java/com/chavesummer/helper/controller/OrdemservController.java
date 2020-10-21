package com.chavesummer.helper.controller;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.chavesummer.helper.entity.Cliente;
import com.chavesummer.helper.entity.Fornecedor;
import com.chavesummer.helper.entity.FornecedorRep;
import com.chavesummer.helper.entity.Ordemserv;
import com.chavesummer.helper.entity.OrdemservHist;
import com.chavesummer.helper.entity.OrdemservRep;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "/ordem_serv")
public class OrdemservController {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(OrdemservController.class);
	
	@Autowired
	private OrdemservRep repository;
	@Autowired
	private FornecedorRep fornRep;
	
	@RequestMapping(value = "/", method = RequestMethod.POST, 
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Ordemserv insert(@RequestBody(required = true) Ordemserv in) {
		
		Ordemserv c = repository.save(in);
		
		return c;
	}
	
	@RequestMapping(value = "/", method = RequestMethod.PUT, 
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Ordemserv update(@RequestBody(required = true) Ordemserv in) {
		
		Ordemserv c = repository.save(in);
		return c;
	}
	
	@RequestMapping(value = "/status", method = RequestMethod.PUT, 
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Ordemserv updateStatus(@RequestBody(required = true) Ordemserv in) {
		
		Optional<Ordemserv> os = repository.findById(in.getIdOs());
		Ordemserv c = null;
		if (os.isPresent()) {
			if (in.getStatus().equalsIgnoreCase("A")) {
				os.get().setFornecedor(new Fornecedor());
				os.get().getFornecedor().setIdFornecedor(in.getFornecedor().getIdFornecedor());	
			}
			
			if (!in.getStatus().equalsIgnoreCase("N")) {
				os.get().setStatus(in.getStatus());
			}
			os.get().setAtualizacao(LocalDateTime.now());
			OrdemservHist hist = new OrdemservHist();
			hist.setOs(new Ordemserv());
			hist.getOs().setIdOs(in.getIdOs());
			if (in.getStatus().equalsIgnoreCase("N")) {
				if (in.getCliente()!=null && in.getCliente().getIdCliente()!=null) {
					hist.setCliente(new Cliente());
					hist.getCliente().setIdCliente(in.getCliente().getIdCliente());
				}
				if (in.getFornecedor()!=null && in.getFornecedor().getIdFornecedor()!=null) {
					hist.setFornecedor(new Fornecedor());
					hist.getFornecedor().setIdFornecedor(in.getFornecedor().getIdFornecedor());
				}
			} else if (in.getStatus().equalsIgnoreCase("A")) {
				if (in.getFornecedor()!=null && in.getFornecedor().getIdFornecedor()!=null) {
					hist.setFornecedor(new Fornecedor());
					hist.getFornecedor().setIdFornecedor(in.getFornecedor().getIdFornecedor());
				}
			} else if (in.getStatus().equalsIgnoreCase("F")) {
				if (in.getFornecedor()!=null && in.getFornecedor().getIdFornecedor()!=null) {
					hist.setFornecedor(new Fornecedor());
					hist.getFornecedor().setIdFornecedor(in.getFornecedor().getIdFornecedor());
				}
				if (in.getCliente()!=null && in.getCliente().getIdCliente()!=null) {
					hist.setCliente(new Cliente());
					hist.getCliente().setIdCliente(in.getCliente().getIdCliente());
				}
			}
			hist.setMensagem(in.getMensagem());
			hist.setStatus(in.getStatus());
			if (os.get().getHist()==null) {
				os.get().setHist(new HashSet<>());
			}
			os.get().getHist().add(hist);
			c = repository.save(os.get());
		}
		
		return c;
	}
	
	@RequestMapping(value = "/cliente/{idCliente}", method = RequestMethod.GET, 
            produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Ordemserv>getCliente(@PathVariable(name = "idCliente") Integer idCliente) {
		
		Cliente cliente = new Cliente();
		cliente.setIdCliente(idCliente);
		
		return repository.findByCliente(cliente);
	}
	
	@RequestMapping(value = "/fornecedor/{idFornecedor}", method = RequestMethod.GET, 
            produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Ordemserv> getFornecedor(@PathVariable(name = "idFornecedor") Integer idFornecedor) {
		
		Fornecedor fornecedor = new Fornecedor();
		fornecedor.setIdFornecedor(idFornecedor);
		
		return repository.findByFornecedor(fornecedor);
	}
	
	@RequestMapping(value = "/", method = RequestMethod.GET, 
            produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Ordemserv> geAll() {
		
		return repository.findAll();
	}
	
}