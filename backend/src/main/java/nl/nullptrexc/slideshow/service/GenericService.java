package nl.nullptrexc.slideshow.service;

import nl.nullptrexc.slideshow.model.domain.IdEntity;
import nl.nullptrexc.slideshow.persistance.data.GenericRepository;

import java.io.Serializable;
import java.util.Comparator;
import java.util.LinkedHashSet;
import java.util.Set;
import java.util.stream.Collectors;

public abstract class GenericService<T extends IdEntity, R extends GenericRepository<T, ID>, ID extends Serializable> {

    public final R repository;

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
        return repository.getAll()
                .stream()
                .sorted(Comparator.comparing(IdEntity::getId))
                .collect(Collectors.toCollection(LinkedHashSet::new));
    }
}