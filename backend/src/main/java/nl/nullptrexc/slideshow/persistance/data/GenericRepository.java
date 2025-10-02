package nl.nullptrexc.slideshow.persistance.data;

import nl.nullptrexc.slideshow.model.domain.IdEntity;
import nl.nullptrexc.slideshow.persistance.interfaces.IGenericRepository;

import java.io.Serializable;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;

@SuppressWarnings("unchecked")
public abstract class GenericRepository<T extends IdEntity, ID extends Serializable> implements IGenericRepository<T, ID> {

    protected final Class<T> persistentClass;

    public GenericRepository() {
        Type superType = getClass().getGenericSuperclass();
        while (superType instanceof Class) {
            superType = ((Class<?>) superType).getGenericSuperclass();
        }
        assert superType instanceof ParameterizedType;
        persistentClass = (Class<T>) ((ParameterizedType) superType ).getActualTypeArguments()[0];
    }
}
