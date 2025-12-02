package com.nullptrexc.slideshow.service;

import com.nullptrexc.slideshow.model.domain.Playlist;
import com.nullptrexc.slideshow.persistance.data.jpa.repository.PlaylistJPARepository;
import io.micronaut.context.annotation.Prototype;

import java.util.UUID;

@Prototype
public class PlaylistService extends GenericService<Playlist, PlaylistJPARepository, UUID> {
    public PlaylistService(PlaylistJPARepository repository) {
        super(repository);
    }
}
