package nl.nullptrexc.slideshow.service;

import nl.nullptrexc.slideshow.model.domain.IdEntity;
import nl.nullptrexc.slideshow.persistance.hibernate.repository.GenericRepository;

import java.io.Serializable;
import java.util.Set;

public abstract class GenericService<T extends IdEntity, R extends GenericRepository<T, ID>, ID extends Serializable> {

    public R repository;

    public GenericService(R repository) {
        this.repository = repository;
    }

    public T load(T entity) {
        return repository.load(entity);
    }

    public T update(T entity) {
        return repository.update(entity);
    }

    public T save(T entity) {
        return repository.save(entity);
    }

    public T delete(T entity) {
        return repository.delete(entity);
    }

    public T delete(ID id) {
        return repository.delete(repository.get(id));
    }

    public T findById(ID ID) {
        return repository.get(ID);
    }

    public Set<T> findAll() {
        return repository.getAll();
    }

}