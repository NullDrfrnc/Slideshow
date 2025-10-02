package nl.nullptrexc.slideshow.persistance.interfaces;

import nl.nullptrexc.slideshow.model.domain.IdEntity;

import java.io.Serializable;
import java.util.Set;

public interface IGenericRepository<T extends IdEntity, ID extends Serializable> {
    T load(T entity);

    T update(T entity);

    T save(T entity);

    T delete(T entity);

    T get(ID id);

    Set<T> getAll();
}
