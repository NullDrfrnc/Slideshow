package com.nullptrexc.slideshow.model.domain;

import jakarta.persistence.*;

import java.util.List;

@Table
@Entity
public class Playlist extends IdEntity {
    @Column(nullable = false)
    private String name;

    @ManyToMany
    private List<Slide> slides;

    public String getName() {
        return name;
    }

    public Playlist setName(String name) {
        this.name = name;
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
