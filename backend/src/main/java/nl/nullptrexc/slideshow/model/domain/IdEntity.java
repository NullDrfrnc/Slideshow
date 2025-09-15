package nl.nullptrexc.slideshow.model.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.micronaut.serde.annotation.Serdeable;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;
import java.util.UUID;

@SuppressWarnings("unchecked")
@Serdeable
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
