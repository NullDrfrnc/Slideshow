package nl.nullptrexc.slideshow.model.domain;

import jakarta.persistence.*;

import java.util.UUID;

@SuppressWarnings("unchecked")
@MappedSuperclass
public abstract class IdEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(unique = true, nullable = false)
    protected UUID id;

    public UUID getId() {
        return id;
    }

    public <T extends IdEntity> T setId(UUID id) {
        this.id = id;
        return (T) this;
    }
}
