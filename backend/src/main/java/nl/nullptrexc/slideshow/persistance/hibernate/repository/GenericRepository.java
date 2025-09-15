package nl.nullptrexc.slideshow.persistance.hibernate.repository;

import jakarta.persistence.criteria.CriteriaQuery;
import nl.nullptrexc.slideshow.model.domain.IdEntity;
import nl.nullptrexc.slideshow.persistance.hibernate.interfaces.IGenericRepository;
import nl.nullptrexc.slideshow.persistance.util.HibernateSessionManager;
import org.hibernate.Session;
import org.hibernate.Transaction;

import java.io.Serializable;
import java.lang.reflect.ParameterizedType;
import java.util.HashSet;
import java.util.Set;
import java.util.function.Function;

@SuppressWarnings("unchecked")
public abstract class GenericRepository<T extends IdEntity, ID extends Serializable> implements IGenericRepository<T, ID> {
    protected final Class<T> persistentClass;
    protected final HibernateSessionManager hibernateSessionManager;


    public GenericRepository(HibernateSessionManager hibernateSessionManager) {
        this.hibernateSessionManager = hibernateSessionManager;
        this.persistentClass = (Class<T>) ((ParameterizedType) getClass().getGenericSuperclass()).getActualTypeArguments()[0];
    }

    protected <R> R withTransaction(Function<Session, R> action) {
        Transaction trans = getSession().beginTransaction();
        try {
            R result = action.apply(getSession());
            trans.commit();
            return result;
        } catch (RuntimeException e) {
            if (trans != null && trans.isActive()) trans.rollback();
            throw e;
        }
    }

    @Override
    public T load(T entity) {
        getSession().refresh(entity);
        return entity;
    }

    @Override
    public T update(T entity) {
        return withTransaction(session -> session.merge(entity));
    }

    @Override
    public T save(T entity) {
        return withTransaction(session -> {
            session.persist(entity);
            return entity;
        });
    }

    @Override
    public T delete(T entity) {
        return withTransaction(session -> {
            session.remove(entity);
            return entity;
        });
    }

    @Override
    public T get(ID id) {
        return withTransaction(session -> session.find(persistentClass, id));
    }

    @Override
    public Set<T> getAll() {
        return withTransaction(session -> {
            CriteriaQuery<T> criteria = session.getCriteriaBuilder().createQuery(persistentClass);
            return new HashSet<>(session.createQuery(criteria.select(criteria.from(persistentClass))).getResultList());
        });
    }

    public Session getSession() {
        return hibernateSessionManager.getSession();
    }
}