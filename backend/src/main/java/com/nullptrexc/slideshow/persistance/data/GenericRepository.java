package com.nullptrexc.slideshow.persistance.data;

import com.nullptrexc.slideshow.model.domain.IdEntity;
import com.nullptrexc.slideshow.persistance.interfaces.IGenericRepository;

import java.io.Serializable;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.Set;

@SuppressWarnings("unchecked")
public abstract class GenericRepository<T extends IdEntity, ID extends Serializable> implements IGenericRepository<T, ID> {

    protected final Class<T> persistentClass;

    public GenericRepository() {
        Type superType = getClass().getGenericSuperclass();
        while (superType instanceof Class) {
            superType = ((Class<?>) superType).getGenericSuperclass();
        }
        assert superType instanceof ParameterizedType;
        persistentClass = (Class<T>) ((ParameterizedType) superType).getActualTypeArguments()[0];
    }

    public abstract void load(T entity);

    public abstract T update(T entity);

    public abstract void save(T entity);

    public abstract void delete(T entity);

    public abstract T get(ID id);

    public abstract Set<T> getAll();
}
