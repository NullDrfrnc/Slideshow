package nl.nullptrexc.slideshow.persistance.hibernate.interfaces;

import nl.nullptrexc.slideshow.model.domain.Slide;
import nl.nullptrexc.slideshow.persistance.hibernate.repository.SlideRepository;

import java.util.UUID;

public interface ISlideRepository extends IGenericRepository<Slide, UUID> {
}
