package nl.nullptrexc.slideshow.service;

import io.micronaut.context.annotation.Prototype;
import nl.nullptrexc.slideshow.model.domain.Slide;
import nl.nullptrexc.slideshow.persistance.data.hibernate.repository.HibernateSlideRepository;

import java.util.UUID;

@Prototype
public class SlideService extends GenericService<Slide, HibernateSlideRepository, UUID> {
    public SlideService(HibernateSlideRepository repository) {
        super(repository);
    }
}
