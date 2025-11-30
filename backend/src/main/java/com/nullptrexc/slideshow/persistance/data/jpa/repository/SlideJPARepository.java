package com.nullptrexc.slideshow.persistance.data.jpa.repository;

import com.nullptrexc.slideshow.model.domain.Slide;
import jakarta.inject.Singleton;
import jakarta.persistence.EntityManager;

import java.util.UUID;

@Singleton
public class SlideJPARepository extends GenericJPARepository<Slide, UUID> {
    public SlideJPARepository(EntityManager em) {
        super(em);
    }
}
