import jakarta.inject.Inject;
import nl.nullptrexc.slideshow.model.domain.Slide;
import nl.nullptrexc.slideshow.persistance.hibernate.repository.SlideRepository;
import nl.nullptrexc.slideshow.service.SlideService;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class SlideServiceTest {

    @Mock
    SlideRepository slideRepository;

    @InjectMocks
    SlideService slideService;

    HashSet<Slide> slides;

    Slide cats;

    Slide dogs;

    Slide bunnies;

    Slide birds;

    @BeforeEach
    void setup() {
        slideService = new SlideService(slideRepository);

        cats = new Slide()
                .setTitle("Cats")
                .setDescription("This slide is all about the different kinds of Cats!")
                .setId(UUID.fromString("9e3c0bc2-0ef2-471c-b9df-80ab1edb79f3"));

        dogs = new Slide()
                .setTitle("Dogs")
                .setDescription("This slide is all about the different kinds of Dogs!")
                .setId(UUID.fromString("13848482-41be-473a-95a7-c628eb3fde78"));

        bunnies = new Slide()
                .setTitle("Bunnies")
                .setDescription("This slide is all about the different kinds of Bunnies!")
                .setId(UUID.fromString("6be49e22-4963-49f2-a9e2-c1a32942faee"));

        birds = new Slide()
                .setTitle("Birds")
                .setDescription("This slide is all about the different kinds of Birds!")
                .setId(UUID.fromString("4c601a3b-e55e-4957-8475-6a349614f2f8"));


        slides = new HashSet<>();
        slides.add(cats);
        slides.add(dogs);
        slides.add(bunnies);
        slides.add(birds);
    }

    @Test
    public void testGetAll() {
        when(slideRepository.getAll()).thenReturn(slides);
        Set<Slide> found = slideService.findAll();
        assertEquals(found, slides);
    }

    @Test
    public void testGetByID() {
        when(slideRepository.get(bunnies.getId())).thenReturn(bunnies);
        Slide found = slideService.findById(bunnies.getId());
        assertEquals(found, bunnies);
    }

    @Test
    public void testGetByIDNotFound() {
        when(slideRepository.get(cats.getId())).thenReturn(null);
        Slide found = slideService.findById(cats.getId());
        assertNull(found);
    }

    @Test
    public void testUpdate() {
        Slide updatedDogs = new Slide().setTitle("Doggo's")
                .setDescription(dogs.getDescription())
                .setId(dogs.getId());

        when(slideRepository.get(dogs.getId())).thenReturn(dogs);
        when(slideRepository.update(updatedDogs)).thenReturn(updatedDogs);
        when(slideRepository.get(dogs.getId())).thenReturn(updatedDogs);

        Slide updated = slideService.update(updatedDogs);
        assertEquals("Doggo's", updated.getTitle());
        assertEquals(updated, slideService.findById(dogs.getId()));
    }

    @Test
    public void testDelete() {
        UUID id = cats.getId();

        when(slideRepository.get(id)).thenReturn(cats);
        when(slideRepository.delete(cats)).thenReturn(cats);

        Slide deleted = slideService.delete(cats);
        assertEquals(cats, deleted);

        when(slideRepository.get(id)).thenReturn(null);
        Slide foundAfterDelete = slideService.findById(id);
        assertNull(foundAfterDelete);
    }
}
