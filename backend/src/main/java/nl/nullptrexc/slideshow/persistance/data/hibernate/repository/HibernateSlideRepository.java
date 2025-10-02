package nl.nullptrexc.slideshow.persistance.data.hibernate.repository;

import io.micronaut.context.annotation.Prototype;
import nl.nullptrexc.slideshow.model.domain.Slide;
import nl.nullptrexc.slideshow.persistance.interfaces.ISlideRepository;
import nl.nullptrexc.slideshow.persistance.util.HibernateSessionManager;

import java.util.UUID;

@Prototype
public class HibernateSlideRepository extends HibernateGenericRepository<Slide, UUID> implements ISlideRepository {
    public HibernateSlideRepository(HibernateSessionManager hibernateSessionManager) {
        super(hibernateSessionManager);
    }
}
