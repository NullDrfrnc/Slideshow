package nl.nullptrexc.slideshow.controller;

import io.micronaut.http.annotation.Controller;
import nl.nullptrexc.slideshow.model.domain.Slide;
import nl.nullptrexc.slideshow.service.SlideService;

import java.util.UUID;

@Controller("/slide")
public class SlideController extends GenericController<Slide, SlideService, UUID> {
    public SlideController(SlideService service) {
        super(service);
    }
}
