package curso.angular.dao;

import java.sql.SQLException;
import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import curso.angular.hibernate.HibernateUtil;

/**
 * Implementação da interface DAO. Abstract para ser possivél escolher o que reimplementar
 * @author David Arruda
 *
 * @param <T>
 */
@Transactional(noRollbackFor = Exception.class)
@Service
public abstract class DaoImplementacao<T> implements DaoInterface<T>{
	
	private Class<T> persistenceClass; //Classe de modelo
	
	private SessionFactory sessionFactory = HibernateUtil.getSessionFactory();
	
	public DaoImplementacao(Class<T> persistenceClass) {
		super();
		this.persistenceClass = persistenceClass;
	}
	
	@Override
	public void salvar(T objeto) throws SQLException {
		sessionFactory.getCurrentSession().save(objeto);
		sessionFactory.getCurrentSession().flush(); // força a execução direta no banco de dados
	}
	
	@Override
	public void deletar(T objeto) throws SQLException {
		sessionFactory.getCurrentSession().delete(objeto);
		sessionFactory.getCurrentSession().flush();
	}
	
	@Override
	public void atualizar(T objeto) throws SQLException {
		sessionFactory.getCurrentSession().update(objeto);
		sessionFactory.getCurrentSession().flush();
	}
	@Override
	public void salvarOuAtualizar(T objeto) throws SQLException {
		sessionFactory.getCurrentSession().saveOrUpdate(objeto);
		sessionFactory.getCurrentSession().flush();
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public T merge(T objeto) throws SQLException {
		T t = (T) sessionFactory.getCurrentSession().merge(objeto);
		sessionFactory.getCurrentSession().flush();
		return t;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<T> lista() throws SQLException {
		return  sessionFactory.getCurrentSession().createCriteria(persistenceClass).list();
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public T loadObjeto(Long codigo) throws SQLException {
		//getCurrentSession().get busca o objeto que está em memória
		return (T) sessionFactory.getCurrentSession().get(persistenceClass, codigo);
	}
	

}
