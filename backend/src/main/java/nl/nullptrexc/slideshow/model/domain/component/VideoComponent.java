package nl.nullptrexc.slideshow.model.domain.component;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import nl.nullptrexc.slideshow.model.domain.Slide;

import java.util.HashMap;
import java.util.UUID;

@Entity
@Table
public class VideoComponent extends Component {
    @Column
    private String url;

    public VideoComponent() {
    }

    public VideoComponent(UUID id, Slide slide, HashMap<String, Object> style, String url) {
        super(id, slide, style);
        this.url = url;
    }

    public String getUrl() {
        return url;
    }

    public VideoComponent setUrl(String url) {
        this.url = url;
        return this;
    }
}
