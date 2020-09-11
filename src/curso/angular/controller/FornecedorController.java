package curso.angular.controller;

import java.sql.SQLException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;

import curso.angular.dao.DaoImplementacao;
import curso.angular.dao.DaoInterface;
import curso.angular.model.Fornecedor;

@Controller
@RequestMapping(value = "/fornecedor")
public class FornecedorController extends DaoImplementacao<Fornecedor> implements DaoInterface<Fornecedor> {

	public FornecedorController(Class<Fornecedor> persistenceClass) {
		super(persistenceClass);
	}
	
	@SuppressWarnings("rawtypes")
	@RequestMapping(value = "salvar", method = RequestMethod.POST) 
	@ResponseBody
	public ResponseEntity salvar(@RequestBody String jsonFornecedor) throws SQLException {
		Fornecedor fornecedor = new Gson().fromJson(jsonFornecedor, Fornecedor.class);
		
		if(fornecedor != null && fornecedor.getAtivo() == null) fornecedor.setAtivo(false);
		
		super.salvarOuAtualizar(fornecedor);
		
		return new ResponseEntity<>(HttpStatus.CREATED);
	}

	/**
	 * Retorna uma lista de Fornecedores
	 * @param numeroPagina
	 * @return Json String de fornecedores
	 * @throws SQLException
	 */
	@RequestMapping(value = "listar/{numeroPagina}", method = RequestMethod.GET)
	@ResponseBody // Resposta da requisição, em forma de Json
	public String listar(@PathVariable("numeroPagina") String numeroPagina) throws SQLException {
		return new Gson().toJson(super.consultaPaginada(numeroPagina));
	}
	
	@RequestMapping(value = "listartodos", method = RequestMethod.GET, headers = "Accept=application/json")
	@ResponseBody // Resposta da requisição, em forma de Json
	public String listarTodos() throws SQLException {
		return new Gson().toJson(super.lista());
	}
	
	
	@RequestMapping(value = "totalPagina", method = RequestMethod.GET, headers = "Accept=application/json")
	@ResponseBody // Resposta da requisição, em forma de Json
	public String totalPagina() throws SQLException {
		return "" + super.quantidadePagina();
	}
	 
	/**
	 * Deleta o fornecedor informado
	 * @param codFornecedor
	 * @return String vazia como resposta
	 * @throws SQLException
	 */
	@RequestMapping(value ="deletar/{codFornecedor}", method = RequestMethod.DELETE)
	public @ResponseBody
	String deletar(@PathVariable("codFornecedor") String codFornecedor) throws SQLException{
		super.deletar(loadObjeto(Long.parseLong(codFornecedor)));
		return "";
	}
	
	/**
	 * Busca fornecedor a partir de um código informado
	 * @param codFornecedor
	 * @return JSON fornecedor
	 * @throws SQLException
	 */
	@RequestMapping(value ="buscarFornecedor/{codFornecedor}", method = RequestMethod.GET)
	public @ResponseBody String buscarFornecedor(@PathVariable("codFornecedor") String codFornecedor) throws SQLException{
		Fornecedor fornecedor = super.loadObjeto(Long.parseLong(codFornecedor));
		if (fornecedor == null) {
			return "{}";
		}
		
		return new Gson().toJson(fornecedor);
	}

}
