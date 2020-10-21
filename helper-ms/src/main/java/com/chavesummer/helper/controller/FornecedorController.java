package com.chavesummer.helper.controller;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

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

import com.chavesummer.helper.entity.Cartao;
import com.chavesummer.helper.entity.Cliente;
import com.chavesummer.helper.entity.Fornecedor;
import com.chavesummer.helper.entity.FornecedorRep;
import com.chavesummer.helper.entity.Ordemserv;
import com.chavesummer.helper.entity.OrdemservRep;
import com.chavesummer.helper.entity.Servico;
import com.chavesummer.helper.to.Login;
import com.chavesummer.helper.to.RejectOS;

import lombok.Data;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "/fornecedor")
@Data
public class FornecedorController {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(FornecedorController.class);
	
	@Autowired
	private FornecedorRep repository;
	@Autowired
	private OrdemservRep osRep;
	
	@RequestMapping(value = "/login", method = RequestMethod.POST, 
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Fornecedor login(@RequestBody(required = true) Login in) {
		
		Optional<Fornecedor> c = repository.findByEmailAndPass(in.getEmail(), in.getSenha());
		
		if (c.isPresent() && !c.get().getStatus().equalsIgnoreCase("A")) {
			return null;
		}
		
		return c.get();
	}
	
	@RequestMapping(value = "/", method = RequestMethod.POST, 
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Fornecedor insert(@RequestBody(required = true) Fornecedor in) {
		
		Fornecedor c = repository.save(in);
		
		return c;
	}
	
	@RequestMapping(value = "/servico", method = RequestMethod.POST, 
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Fornecedor addServs(@RequestBody(required = true) Fornecedor in) {
		
		Optional<Fornecedor> f = repository.findById(in.getIdFornecedor());
		if (f.isPresent()) {
			if (f.get().getServicos()==null) {
				f.get().setServicos(new HashSet<>());
			}
			
			if (f.get().getServicos()!=null) {
				
				for (Servico s : f.get().getServicos()) {
					boolean found = false;
					for (Servico s2: in.getServicos()) {
						if (s.getIdServico().intValue() == s2.getIdServico().intValue()) {
							found = true;
							break;
						}
					}
					if (!found) {
						f.get().getServicos().remove(s);
					}
				}
			}
			
			f.get().getServicos().addAll(in.getServicos());
			
			
			
		}
		return repository.save(f.get());
	}
	
	@RequestMapping(value = "/servico/novo", method = RequestMethod.PUT, 
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Fornecedor addServ(@RequestBody(required = true) Fornecedor in) {
		
		Optional<Fornecedor> f = repository.findById(in.getIdFornecedor());
		if (f.isPresent()) {
			if (f.get().getServicos()==null) {
				f.get().setServicos(new HashSet<>());
			}
			f.get().getServicos().addAll(in.getServicos());
		}
		return repository.save(f.get());
	}
	
	@RequestMapping(value = "/servico/delete", method = RequestMethod.POST, 
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Fornecedor delServ(@RequestBody(required = true) Fornecedor in) {
		
		Optional<Fornecedor> f = repository.findById(in.getIdFornecedor());
		if (f.isPresent()) {
			if (f.get().getServicos()==null) {
				f.get().setServicos(new HashSet<>());
			}
			Set<Servico> removes = new HashSet<>();
			for (Servico s : f.get().getServicos()) {
				if (s.getIdServico().intValue() == in.getServicos().iterator().next().getIdServico().intValue()) {
					removes.add(s);
				}
			}
			f.get().getServicos().removeAll(removes);
		}
		return repository.save(f.get());
	}
	
	@RequestMapping(value = "/cartao", method = RequestMethod.POST, 
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Fornecedor addCards(@RequestBody(required = true) Fornecedor in) {
		
		Optional<Fornecedor> f = repository.findById(in.getIdFornecedor());
		if (f.isPresent()) {
			
			if (in.getCartoes()!=null) {
				for (Cartao c : in.getCartoes()) {
					c.setFornecedor(new Fornecedor());
					c.getFornecedor().setIdFornecedor(in.getIdFornecedor());
				}
			}
			
 			if (f.get().getCartoes()==null) {
				f.get().setCartoes(new HashSet<>());
			}
			
			if (f.get().getCartoes()!=null) {
				
				for (Cartao c : f.get().getCartoes()) {
					boolean found = false;
					for (Cartao c2: in.getCartoes()) {
						if (c.getNumCartao().equalsIgnoreCase(c2.getNumCartao())) {
							found = true;
							break;
						}
					}
					if (!found) {
						f.get().getCartoes().remove(c);
					}
				}
			}
			
			f.get().getCartoes().addAll(in.getCartoes());
		}
		return repository.save(f.get());
	}
	
	@RequestMapping(value = "/servicos", method = RequestMethod.POST, 
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Set<Servico> getServices(@RequestBody(required = true) Fornecedor in) {
		
		Set<Servico> servicos = null;
		
		Optional<Fornecedor> f = repository.findById(in.getIdFornecedor());
		if (f.isPresent()) {
			servicos = f.get().getServicos();
			
		}
		return servicos;
	}
	
	@RequestMapping(value = "/recusas", method = RequestMethod.POST, 
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Set<Ordemserv> getRejects(@RequestBody(required = true) Fornecedor in) {
		
		Set<Ordemserv> servicos = null;
		
		Optional<Fornecedor> f = repository.findById(in.getIdFornecedor());
		if (f.isPresent()) {
			servicos = f.get().getOsRecusadas();
			
		}
		return servicos;
	}
	
	@RequestMapping(value = "/", method = RequestMethod.PUT, 
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Fornecedor update(@RequestBody(required = true) Fornecedor in) {
		
		Fornecedor c = repository.save(in);
		
		return c;
	}
	
	@RequestMapping(value = "/status", method = RequestMethod.PUT, 
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Fornecedor changeStatus(@RequestBody(required = true) Fornecedor in) {
		
		Optional<Fornecedor> o = repository.findById(in.getIdFornecedor());
		if (o.isPresent())
		{
			o.get().setStatus(in.getStatus());
			repository.save(o.get());
		}
		return o.get();
	}
	
	@RequestMapping(value = "/changepass", method = RequestMethod.PUT, 
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Fornecedor changePass(@RequestBody(required = true) Fornecedor in) {
		
		Optional<Fornecedor> o = repository.findById(in.getIdFornecedor());
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
	public Fornecedor changePassCpf(@RequestBody(required = true) Fornecedor in) {
		
		Optional<Fornecedor> o = repository.findByCpf(in.getCpf());
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
	
	@RequestMapping(value = "/rejectOS", method = RequestMethod.POST, 
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Ordemserv recusarOS(@RequestBody(required = true) RejectOS in) {
		
		Optional<Ordemserv> os = osRep.findById(in.getIdOS());
		Ordemserv c = null;
		if (os.isPresent()) {
			
			Optional<Fornecedor> f = repository.findById(in.getIdFornecedor());
			if (f.isPresent()) {
				if (f.get().getOsRecusadas()==null) {
					f.get().setOsRecusadas(new HashSet<>());
				}
				f.get().getOsRecusadas().add(os.get());
				repository.save(f.get());
			}
		}
		
		return c;
	}
}