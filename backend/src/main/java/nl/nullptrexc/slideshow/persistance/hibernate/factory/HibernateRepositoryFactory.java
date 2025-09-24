package nl.nullptrexc.slideshow.persistance.hibernate.factory;

import io.micronaut.context.annotation.Factory;
import io.micronaut.context.annotation.Prototype;
import nl.nullptrexc.slideshow.model.domain.IdEntity;
import nl.nullptrexc.slideshow.persistance.hibernate.interfaces.IGenericRepository;
import nl.nullptrexc.slideshow.persistance.hibernate.interfaces.ISlideRepository;
import nl.nullptrexc.slideshow.persistance.hibernate.repository.GenericRepository;
import nl.nullptrexc.slideshow.persistance.hibernate.repository.SlideRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.Serializable;
import java.lang.reflect.InvocationTargetException;

@Factory
public class HibernateRepositoryFactory {
    private final static Logger logger = LoggerFactory.getLogger(HibernateRepositoryFactory.class);

    public HibernateRepositoryFactory() {
    }

    @SuppressWarnings("unchecked") // This uses some unchecked casts, we just suppress them ¯\_(ツ)_/¯
    private static <T extends IGenericRepository<DOM, ID>, REPO extends GenericRepository<DOM, ID>, DOM extends IdEntity, ID extends Serializable> T createAndGetDAO(Class<REPO> persistentClass) {
        GenericRepository<DOM, ID> repo = null;
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
        return HibernateRepositoryFactory.createAndGetDAO(SlideRepository.class);
    }
}