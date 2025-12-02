package com.nullptrexc.slideshow.model.domain;

import jakarta.persistence.*;

import java.util.List;

@Table
@Entity
public class Playlist extends IdEntity {
    @Column(nullable = false)
    private String title;

    @ManyToMany
    private List<Slide> slides;

    public String getTitle() {
        return title;
    }

    public Playlist setTitle(String title) {
        this.title = title;
        return this;
    }

    public List<Slide> getSlides() {
        return slides;
    }

    public Playlist setSlides(List<Slide> slides) {
        this.slides = slides;
        return this;
    }
}
