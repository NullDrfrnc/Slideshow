package nl.nullptrexc.slideshow.persistance.hibernate.repository;

import jakarta.persistence.criteria.CriteriaQuery;
import nl.nullptrexc.slideshow.annotation.Transactional;
import nl.nullptrexc.slideshow.model.domain.IdEntity;
import nl.nullptrexc.slideshow.persistance.hibernate.interfaces.IGenericRepository;
import nl.nullptrexc.slideshow.persistance.util.HibernateSessionManager;
import org.hibernate.Session;

import java.io.Serializable;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.HashSet;
import java.util.Set;

@SuppressWarnings("unchecked")
public abstract class GenericRepository<T extends IdEntity, ID extends Serializable> implements IGenericRepository<T, ID> {
    protected final Class<T> persistentClass;
    protected final HibernateSessionManager hibernateSessionManager;

    public GenericRepository(HibernateSessionManager hibernateSessionManager) {
        this.hibernateSessionManager = hibernateSessionManager;
        Type superType = getClass().getGenericSuperclass();
        while (!(superType instanceof ParameterizedType) && superType instanceof Class) {
            superType = ((Class<?>) superType).getGenericSuperclass();
        }
        assert superType instanceof ParameterizedType;
        persistentClass = (Class<T>) ((ParameterizedType) superType ).getActualTypeArguments()[0];
    }

    @Override
    @Transactional
    public T load(T entity) {
        getSession().refresh(entity);
        return entity;
    }

    @Override
    @Transactional
    public T update(T entity) {
        return getSession().merge(entity);
    }

    @Override
    @Transactional
    public T save(T entity) {
        getSession().persist(entity);
        return entity;
    }

    @Override
    @Transactional
    public T delete(T entity) {
        getSession().remove(entity);
        return entity;
    }

    @Override
    @Transactional
    public T get(ID id) {
        return getSession().find(persistentClass, id);
    }

    @Override
    @Transactional
    public Set<T> getAll() {
        CriteriaQuery<T> criteria = getSession().getCriteriaBuilder().createQuery(persistentClass);
        return new HashSet<>(getSession().createQuery(criteria.select(criteria.from(persistentClass))).getResultList());
    }

    public Session getSession() {
        return hibernateSessionManager.getSession();
    }
}