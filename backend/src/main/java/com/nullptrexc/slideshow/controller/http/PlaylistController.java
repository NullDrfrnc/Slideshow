package com.nullptrexc.slideshow.controller.http;

import com.nullptrexc.slideshow.model.domain.Playlist;
import com.nullptrexc.slideshow.service.PlaylistService;
import io.micronaut.http.annotation.Controller;

import java.util.UUID;

@Controller("/playlist")
public class PlaylistController extends GenericHttpController<Playlist, PlaylistService, UUID> {
    public PlaylistController(PlaylistService service) {
        super(service);
    }
}
