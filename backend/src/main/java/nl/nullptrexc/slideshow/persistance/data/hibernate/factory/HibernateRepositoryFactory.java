package nl.nullptrexc.slideshow.persistance.data.hibernate.factory;

import io.micronaut.context.annotation.Factory;
import io.micronaut.context.annotation.Prototype;
import nl.nullptrexc.slideshow.model.domain.IdEntity;
import nl.nullptrexc.slideshow.persistance.interfaces.IGenericRepository;
import nl.nullptrexc.slideshow.persistance.interfaces.ISlideRepository;
import nl.nullptrexc.slideshow.persistance.data.hibernate.repository.HibernateGenericRepository;
import nl.nullptrexc.slideshow.persistance.data.hibernate.repository.HibernateSlideRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.Serializable;
import java.lang.reflect.InvocationTargetException;

@SuppressWarnings("preview")
@Factory
public class HibernateRepositoryFactory {
    private final static Logger logger = LoggerFactory.getLogger(HibernateRepositoryFactory.class);

    public HibernateRepositoryFactory() {
    }

    @SuppressWarnings("unchecked") // This uses some unchecked casts, we just suppress them ¯\_(ツ)_/¯
    private static <T extends IGenericRepository<DOM, ID>, REPO extends HibernateGenericRepository<DOM, ID>, DOM extends IdEntity, ID extends Serializable> T createAndGetDAO(Class<REPO> persistentClass) {
        HibernateGenericRepository<DOM, ID> repo = null;
        try {
            repo = persistentClass.getDeclaredConstructor().newInstance();
        } catch (InstantiationException | IllegalAccessException | IllegalArgumentException | InvocationTargetException
                 | NoSuchMethodException | SecurityException e) {
            logger.error(STR."Encountered error whilst making repository: \{e}");
        }
        return (T) repo;
    }

    @Prototype
    public ISlideRepository getUserRepository() {
        return HibernateRepositoryFactory.createAndGetDAO(HibernateSlideRepository.class);
    }
}