package nl.nullptrexc.slideshow.model.domain.component;

import jakarta.persistence.*;
import nl.nullptrexc.slideshow.model.domain.Slide;

import java.util.HashMap;
import java.util.UUID;

@Table
@Entity
public class ImageComponent extends Component {

    @Column
    private String url;

    public ImageComponent() {
    }

    public ImageComponent(UUID id, Slide slide, HashMap<String, Object> style, String url) {
        super(id, slide, style);
        this.url = url;
    }

    public String getUrl() {
        return url;
    }

    public ImageComponent setUrl(String url) {
        this.url = url;
        return this;
    }
}
