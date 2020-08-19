package curso.angular.dao;

import java.sql.SQLException;
import java.util.List;

import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
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
		var criteria = sessionFactory.getCurrentSession().createCriteria(persistenceClass);
		criteria.addOrder(Order.asc("id"));
		return  criteria.list();
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public T loadObjeto(Long codigo) throws SQLException {
		//getCurrentSession().get busca o objeto que está em memória
		return (T) sessionFactory.getCurrentSession().get(persistenceClass, codigo);
	}
	
	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}
	
	public Class<T> getPersistenceClass(){
		return persistenceClass;
	}
	
	@Override
	public List<T> consultaPaginada(String numeroPagina) throws SQLException{
		int total_por_pagina = 6;
		
		if (numeroPagina == null || (numeroPagina != null && numeroPagina.trim().isEmpty())) {
			numeroPagina = "0";
		}
		
		int offSet = (Integer.parseInt(numeroPagina) * total_por_pagina) - total_por_pagina;
		
		if (offSet < 0) {
			offSet = 0;
		}
		
		var criteria = getSessionFactory().getCurrentSession().createCriteria(getPersistenceClass());
		criteria.setFirstResult(offSet);
		criteria.setMaxResults(total_por_pagina);
		criteria.addOrder(Order.asc("id"));
		
		return criteria.list();
	}
	
	@Override
	public int quantidadePagina() throws SQLException {
		String sql = "select count(1) as totalRegistros FROM " + getPersistenceClass().getSimpleName();
		int quantidadePagina = 1;
		double total_por_pagina = 6.0;
			SQLQuery find = getSessionFactory().getCurrentSession().createSQLQuery(sql);
			Object resultSet = find.uniqueResult();
			if (resultSet != null) {
				double totalRegistros = Double.parseDouble(resultSet.toString());
				if (totalRegistros > total_por_pagina){
					
					double quantidadePaginaTemp = Float.parseFloat(""+(totalRegistros / total_por_pagina));

					if (!(quantidadePaginaTemp % 2 == 0)){
						quantidadePagina =   new Double(quantidadePaginaTemp).intValue() + 1;
					}
					else {
						quantidadePagina = new Double(quantidadePaginaTemp).intValue();
					}
				}else {
					quantidadePagina = 1;
				}
			}
		return quantidadePagina;
	}
	
}
