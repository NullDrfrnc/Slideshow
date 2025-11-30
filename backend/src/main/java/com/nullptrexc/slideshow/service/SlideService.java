package com.nullptrexc.slideshow.service;

import com.nullptrexc.slideshow.persistance.data.jpa.repository.SlideJPARepository;
import io.micronaut.context.annotation.Prototype;
import com.nullptrexc.slideshow.model.domain.Slide;

import java.util.UUID;

@Prototype
public class SlideService extends GenericService<Slide, SlideJPARepository, UUID> {
    public SlideService(SlideJPARepository repository) {
        super(repository);
    }
}
