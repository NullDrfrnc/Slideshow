package com.nullptrexc.slideshow.model.domain.component;

import jakarta.persistence.*;
import com.nullptrexc.slideshow.model.domain.Slide;

import java.util.HashMap;
import java.util.UUID;

@MappedSuperclass
public abstract class FileComponent extends Component{
    @Column
    protected String url;

    public FileComponent() {}

    public FileComponent(UUID id, Slide slide, HashMap<String, Object> style, String url) {
        super(id, slide, style);
        this.url = url;
    }

    @PostRemove
    public abstract void afterRemove();

    public String getUrl() {
        return url;
    }

    public FileComponent setUrl(String url) {
        this.url = url;
        return this;
    }
}
