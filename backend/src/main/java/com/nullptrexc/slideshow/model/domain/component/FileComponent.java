package com.nullptrexc.slideshow.model.domain.component;

import com.nullptrexc.slideshow.service.FileService;
import jakarta.persistence.*;
import com.nullptrexc.slideshow.model.domain.Slide;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.UUID;

@MappedSuperclass
public abstract class FileComponent extends Component {
    @Column
    protected String url;
    @Column
    protected String filename;

    public FileComponent() {
    }

    public FileComponent(UUID id, Slide slide, HashMap<String, Object> style, String url, String filename) {
        super(id, slide, style);
        this.url = url;
        this.filename = filename;
    }

    @PostRemove
    public void afterRemove() {
        LoggerFactory.getLogger(this.getClass()).info("Removing {}: {}", getClass(), this.url);
        FileService.removeFile(this);
    }

    public String getUrl() {
        return url;
    }

    public FileComponent setUrl(String url) {
        this.url = url;
        return this;
    }

    public String getFilename() {
        return filename;
    }

    public FileComponent setFilename(String filename) {
        this.filename = filename;
        return this;
    }
}
