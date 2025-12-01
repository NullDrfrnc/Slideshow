package com.nullptrexc.slideshow.model.domain.component;

import jakarta.persistence.*;
import com.nullptrexc.slideshow.model.domain.Slide;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.UUID;

@Table
@Entity
public class ImageComponent extends FileComponent {
    public ImageComponent() {
    }

    public ImageComponent(UUID id, Slide slide, HashMap<String, Object> style, String url, String filename) {
        super(id, slide, style, url, filename);
    }
}
