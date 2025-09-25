package nl.nullptrexc.slideshow.model.domain.component;

import jakarta.persistence.*;
import nl.nullptrexc.slideshow.model.domain.Slide;
import nl.nullptrexc.slideshow.model.enums.TextType;

import java.util.HashMap;
import java.util.UUID;

@Table
@Entity
public class TextComponent extends Component {
    @Column
    @Enumerated(EnumType.STRING)
    private TextType textType;

    @Column
    private String text;

    public TextComponent() {
    }

    public TextComponent(UUID id, Slide slide, HashMap<String, Object> style, TextType type, String text) {
        super(id, slide, style);
        this.textType = type;
        this.text = text;
    }

    public TextType getTextType() {
        return textType;
    }

    public TextComponent setTextType(TextType type) {
        this.textType = type;
        return this;
    }

    public String getText() {
        return text;
    }

    public TextComponent setText(String text) {
        this.text = text;
        return this;
    }
}
