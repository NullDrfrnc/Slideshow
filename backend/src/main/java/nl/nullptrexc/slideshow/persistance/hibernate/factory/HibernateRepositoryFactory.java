package nl.nullptrexc.slideshow.persistance.hibernate.factory;

import io.micronaut.context.annotation.Factory;
import io.micronaut.context.annotation.Prototype;
import nl.nullptrexc.slideshow.model.domain.IdEntity;
import nl.nullptrexc.slideshow.persistance.hibernate.interfaces.IGenericRepository;
import nl.nullptrexc.slideshow.persistance.hibernate.interfaces.ISlideRepository;
import nl.nullptrexc.slideshow.persistance.hibernate.repository.GenericRepository;
import nl.nullptrexc.slideshow.persistance.hibernate.repository.SlideRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.io.Serializable;
import java.lang.reflect.InvocationTargetException;

@Factory
public class HibernateRepositoryFactory {

    private static final Logger logger = LogManager.getLogger();

    /**
     * It automatically generates a new instance of a DAOClass that implements
     * IGenericDAO.
     *
     * @param <T>            Interface that is implemented by the DAO class that
     *                       will be returned.
     * @param <REPO>         DAO which will be returned.
     * @param <DOM>          DAO Object-domain class which used in generic type
     *                       argument in IGenericDAO that the DAO implements.
     * @param <ID>           Type of the identifer field of the domain class.
     * @return Instance of choosed DAO.
     */
    @SuppressWarnings("unchecked") // This uses some unchecked casts, we just suppress them ¯\_(ツ)_/¯
    private static <T extends IGenericRepository<DOM, ID>, REPO extends GenericRepository<DOM, ID>, DOM extends IdEntity, ID extends Serializable> T createAndGetDAO(Class<REPO> persistentClass) {
        GenericRepository<DOM, ID> repo = null;
        try {
            repo = persistentClass.getDeclaredConstructor().newInstance();
        } catch (InstantiationException | IllegalAccessException | IllegalArgumentException | InvocationTargetException
                 | NoSuchMethodException | SecurityException e) {
            logger.error(e);
        }
        return (T) repo;
    }

    @Prototype
    public ISlideRepository getUserRepository() {
        return HibernateRepositoryFactory.createAndGetDAO(SlideRepository.class);
    }
}