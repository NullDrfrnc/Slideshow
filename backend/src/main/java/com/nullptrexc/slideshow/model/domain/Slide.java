package com.nullptrexc.slideshow.model.domain;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.*;
import com.nullptrexc.slideshow.model.domain.component.Component;

import java.util.*;

@Table
@Entity
public class Slide extends IdEntity {

    @Column(nullable = false)
    private String title;

    @Column
    private String description;

    @Column
    @Lob
    private HashMap<String, Object> style;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @OneToMany(mappedBy = "slide", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER /* Fetch eager while session is active */)
    private List<Component> components = new ArrayList<>();

    public Slide() {

    }

    public Slide(UUID id, String title, String description, List<Component> components, HashMap<String, Object> style) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.components = components;
        this.style = style;
    }

    public Slide addComponent(Component component) {
        components.add(component);
        component.setSlide(this); // keep both sides in sync
        return this;
    }

    @Override
    public String toString() {
        try {
            return new ObjectMapper().writeValueAsString(this);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    public String getTitle() {
        return title;
    }

    public Slide setTitle(String title) {
        this.title = title;
        return this;
    }

    public String getDescription() {
        return description;
    }

    public Slide setDescription(String description) {
        this.description = description;
        return this;
    }

    public List<Component> getComponents() {
        return components;
    }

    public Slide setComponents(List<Component> components) {
        this.components.clear();
        if (components != null) {
            components.forEach(this::addComponent);
        }
        return this;
    }

    public Map<String, Object> getStyle() {
        return style;
    }

    public Slide setStyle(HashMap<String, Object> style) {
        this.style = style;
        return this;
    }
}
