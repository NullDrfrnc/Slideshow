package nl.nullptrexc.slideshow.model.domain;

import com.fasterxml.jackson.annotation.JsonCreator;
import io.micronaut.serde.annotation.Serdeable;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import java.util.UUID;

@Table
@Entity
@Serdeable
public class Slide extends IdEntity {

    @Column(nullable = false)
    private String title;
    @Column
    private String description;

    public Slide() {
    }

    public Slide(String title, String description) {
        this.title = title;
        this.description = description;
    }

    @JsonCreator
    public Slide(UUID id, String title, String description) {
        this.id = id;
        this.title = title;
        this.description = description;
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
}
