package nl.nullptrexc.slideshow.persistance.data.hibernate.repository;

import jakarta.persistence.criteria.CriteriaQuery;
import nl.nullptrexc.slideshow.persistance.data.GenericRepository;
import nl.nullptrexc.slideshow.util.annotation.Transactional;
import nl.nullptrexc.slideshow.model.domain.IdEntity;
import nl.nullptrexc.slideshow.persistance.util.HibernateSessionManager;
import org.hibernate.Session;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

public abstract class HibernateGenericRepository<T extends IdEntity, ID extends Serializable> extends GenericRepository<T, ID> {
    private static final Logger log = LoggerFactory.getLogger(HibernateGenericRepository.class);
    protected final HibernateSessionManager hibernateSessionManager;

    public HibernateGenericRepository(HibernateSessionManager hibernateSessionManager) {
        super();
        this.hibernateSessionManager = hibernateSessionManager;
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