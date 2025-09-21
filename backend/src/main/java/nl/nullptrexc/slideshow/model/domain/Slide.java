package nl.nullptrexc.slideshow.model.domain;

import com.fasterxml.jackson.annotation.JsonCreator;
import io.micronaut.serde.annotation.Serdeable;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Table
@Entity
@Serdeable
public class Slide extends IdEntity {

    @Column(nullable = false)
    private String title;
    @Column
    private String description;
    @Column
    @Lob
    private HashMap<String, Object> style;

    public Slide() {

    }

    @JsonCreator
    public Slide(UUID id, String title, String description,  HashMap<String, Object> style) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.style = style;
    }

    @Override
    public String toString() {
        return STR."Slide{title='\{title}', description='\{description}', id=\{id}}";
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

    public Map<String, Object> getStyle() {
        return style;
    }

    public Slide setStyle(HashMap<String, Object> style) {
        this.style = style;
        return this;
    }
}
