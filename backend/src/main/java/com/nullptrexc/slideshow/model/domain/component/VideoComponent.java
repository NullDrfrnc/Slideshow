package com.nullptrexc.slideshow.model.domain.component;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import com.nullptrexc.slideshow.model.domain.Slide;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.UUID;

@Entity
@Table
public class VideoComponent extends FileComponent {
    public VideoComponent() {
    }

    public VideoComponent(UUID id, Slide slide, HashMap<String, Object> style, String url) {
        super(id, slide, style, url);
    }

    @Override
    public void afterRemove() {
        LoggerFactory.getLogger(this.getClass()).info("Removing VideoComponent: {}", this.url);
    }
}
