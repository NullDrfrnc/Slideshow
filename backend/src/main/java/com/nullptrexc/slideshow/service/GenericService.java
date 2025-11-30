package com.nullptrexc.slideshow.service;

import com.nullptrexc.slideshow.model.domain.IdEntity;
import com.nullptrexc.slideshow.persistance.data.GenericRepository;

import java.io.Serializable;
import java.util.Set;

public abstract class GenericService<T extends IdEntity, R extends GenericRepository<T, ID>, ID extends Serializable> {

    public final R repository;

    public GenericService(R repository) {
        this.repository = repository;
    }

    public void load(T entity) {
        repository.load(entity);
    }

    public T update(T entity) {
        return repository.update(entity);
    }

    public void save(T entity) {
        repository.save(entity);
    }

    public void delete(T entity) {
        repository.delete(entity);
    }

    public void delete(ID id) {
        repository.delete(repository.get(id));
    }

    public T findById(ID ID) {
        return repository.get(ID);
    }

    public Set<T> findAll() {
        return repository.getAll();
    }
}