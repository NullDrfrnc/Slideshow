package nl.nullptrexc.slideshow.persistance.hibernate.repository;

import io.micronaut.context.annotation.Prototype;
import nl.nullptrexc.slideshow.model.domain.Slide;
import nl.nullptrexc.slideshow.persistance.hibernate.interfaces.ISlideRepository;
import nl.nullptrexc.slideshow.persistance.util.HibernateSessionManager;

import java.util.UUID;

@Prototype
public class SlideRepository extends GenericRepository<Slide, UUID> implements ISlideRepository {
    public SlideRepository(HibernateSessionManager hibernateSessionManager) {
        super(hibernateSessionManager);
    }
}
