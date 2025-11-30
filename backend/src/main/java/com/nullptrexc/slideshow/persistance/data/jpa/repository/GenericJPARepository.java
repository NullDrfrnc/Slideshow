package com.nullptrexc.slideshow.persistance.data.jpa.repository;

import com.nullptrexc.slideshow.model.domain.IdEntity;
import com.nullptrexc.slideshow.persistance.data.GenericRepository;
import io.micronaut.transaction.annotation.Transactional;
import jakarta.persistence.EntityManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.Serializable;
import java.util.Comparator;
import java.util.LinkedHashSet;
import java.util.Set;
import java.util.stream.Collectors;

public abstract class GenericJPARepository<T extends IdEntity, ID extends Serializable> extends GenericRepository<T, ID> {
    private static final Logger LOGGER = LoggerFactory.getLogger(GenericJPARepository.class);

    private final EntityManager em;

    public GenericJPARepository(EntityManager em) {
        this.em = em;
    }

    @Override
    @Transactional
    public void load(T entity) {
        em.refresh(entity);
    }

    @Override
    @Transactional
    public T update(T entity) {
        return em.merge(entity);
    }

    @Override
    @Transactional
    public void save(T entity) {
        em.persist(entity);
    }

    @Override
    @Transactional
    public void delete(T entity) {
        em.remove(entity);
    }

    @Override
    @Transactional
    public T get(ID id) {
        return em.find(persistentClass, id);
    }

    @Override
    @Transactional
    public Set<T> getAll() {
        return em.createQuery("from " + persistentClass.getSimpleName(), persistentClass)
                .getResultStream()
                .sorted(Comparator.comparing(IdEntity::getId))
                .collect(Collectors.toCollection(LinkedHashSet::new));
    }
}
