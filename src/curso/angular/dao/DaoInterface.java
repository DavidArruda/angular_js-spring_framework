package curso.angular.dao;

import java.sql.SQLException;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Interface resposável por definir o métodos de um CRUD
 * @author David Arruda
 *
 * @param <T>
 */
@Transactional(noRollbackFor = Exception.class)
@Service
public interface DaoInterface<T> {
	
	/**
	 * Salva um objeto na base de dados
	 * @param objeto
	 * @throws SQLException
	 * @return void
	 */
	void salvar(T objeto) throws SQLException;
	
	/**
	 * Deleta um objeto na base de dados
	 * @param objeto
	 * @throws SQLException
	 * @return void
	 */
	void deletar(T objeto) throws SQLException;
	
	/**
	 * Salva ou atualiza um objeto na base de dados
	 * @param objeto
	 * @throws SQLException
	 * @return void
	 */
	void salvarOuAtualizar(T objeto) throws SQLException;
	
	/**
	 * Atualiza um objeto na base de dados
	 * @param objeto
	 * @throws SQLException
	 * @return void
	 */
	void atualizar(T objeto) throws SQLException;
	
	/**
	 * Salva ou atualiza e retorna o objeto persistente
	 * @param objeto
	 * @return T
	 * @throws SQLException
	 */
	T merge(T objeto) throws SQLException;
	
	/**
	 * Retorna uma lista
	 * @return List(T)
	 * @throws SQLException
	 */
	List<T> lista() throws SQLException;
	
	/**
	 * Método para consultar um objeto a partir do código. (código == id)
	 * @param codigo
	 * @return
	 * @throws SQLException
	 */
	T loadObjeto(Long codigo) throws SQLException;
	
}
