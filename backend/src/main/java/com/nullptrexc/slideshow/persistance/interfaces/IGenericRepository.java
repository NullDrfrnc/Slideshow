package com.nullptrexc.slideshow.persistance.interfaces;

import com.nullptrexc.slideshow.model.domain.IdEntity;

import java.io.Serializable;
import java.util.Set;

public interface IGenericRepository<T extends IdEntity, ID extends Serializable> {
    void load(T entity);

    T update(T entity);

    void save(T entity);

    void delete(T entity);

    T get(ID id);

    Set<T> getAll();
}