package nl.nullptrexc.slideshow.model.domain.component;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import jakarta.persistence.*;
import nl.nullptrexc.slideshow.model.domain.IdEntity;
import nl.nullptrexc.slideshow.model.domain.Slide;

import java.util.HashMap;
import java.util.UUID;

@JsonTypeInfo(
        use = JsonTypeInfo.Id.NAME,
        include = JsonTypeInfo.As.PROPERTY,
        property = "type"
)
@JsonSubTypes({
        @JsonSubTypes.Type(value = ImageComponent.class, name = "image"),
        @JsonSubTypes.Type(value = VideoComponent.class, name = "video"),
        @JsonSubTypes.Type(value = TextComponent.class, name = "text")
})
@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public abstract class Component extends IdEntity {

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "slide.id")
    private Slide slide;

    @Column
    @Lob
    private HashMap<String, Object> style;

    public Component() {
    }

    public Component(UUID id, Slide slide, HashMap<String, Object> style) {
        this.id = id;
        this.slide = slide;
        this.style = style;
    }

    public Slide getSlide() {
        return slide;
    }

    public Component setSlide(Slide slide) {
        this.slide = slide;
        return this;
    }

    public HashMap<String, Object> getStyle() {
        return style;
    }

    public Component setStyle(HashMap<String, Object> style) {
        this.style = style;
        return this;
    }
}
