package com.nullptrexc.slideshow.controller.http;

import io.micronaut.http.annotation.Controller;
import com.nullptrexc.slideshow.model.domain.Slide;
import com.nullptrexc.slideshow.service.SlideService;

import java.util.UUID;

@Controller("/slide")
public class SlideController extends GenericHttpController<Slide, SlideService, UUID> {
    public SlideController(SlideService service) {
        super(service);
    }
}
