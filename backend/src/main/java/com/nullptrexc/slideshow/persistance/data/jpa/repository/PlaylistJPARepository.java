package com.nullptrexc.slideshow.persistance.data.jpa.repository;

import com.nullptrexc.slideshow.model.domain.Playlist;
import com.nullptrexc.slideshow.model.domain.Slide;
import com.nullptrexc.slideshow.persistance.interfaces.IPlaylistRepository;
import jakarta.inject.Singleton;
import jakarta.persistence.EntityManager;

import java.util.UUID;

@Singleton
public class PlaylistJPARepository extends GenericJPARepository<Playlist, UUID> implements IPlaylistRepository {
    public PlaylistJPARepository(EntityManager em) {
        super(em);
    }
}
