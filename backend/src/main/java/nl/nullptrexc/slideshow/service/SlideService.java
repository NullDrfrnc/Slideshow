package nl.nullptrexc.slideshow.service;

import io.micronaut.context.annotation.Prototype;
import nl.nullptrexc.slideshow.model.domain.Slide;
import nl.nullptrexc.slideshow.persistance.hibernate.repository.SlideRepository;

import java.util.UUID;

@Prototype
public class SlideService extends GenericService<Slide, SlideRepository, UUID> {
    public SlideService(SlideRepository repository) {
        super(repository);
    }
}
