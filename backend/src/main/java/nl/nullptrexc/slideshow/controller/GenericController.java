package nl.nullptrexc.slideshow.controller;

import io.micronaut.http.HttpResponse;
import io.micronaut.http.MediaType;
import io.micronaut.http.annotation.*;
import nl.nullptrexc.slideshow.model.domain.IdEntity;
import nl.nullptrexc.slideshow.service.GenericService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.Serializable;

@SuppressWarnings("unchecked") // Supress all unchecked warnings since they should all be fine and dandy
public abstract class GenericController<T extends IdEntity, S extends GenericService, ID extends Serializable> {

    protected final S service;
    protected final Logger logger;

    public GenericController(S service) {
        logger = LoggerFactory.getLogger(this.getClass());
        this.service = service;
    }

    @Get()
    @Produces(MediaType.APPLICATION_JSON)
    public HttpResponse<?> getAll() {
        logger.info(STR."\{this.getClass()}.getAll() called");
        return HttpResponse.ok(service.findAll());
    }

    @Get("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public HttpResponse<?> getWithID(ID id) {
        logger.info(STR."\{this.getClass()}.getWithID(\{id.getClass()} \{id}) called");
        return HttpResponse.ok(service.findById(id));
    }

    @Post
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public HttpResponse<?> create(@Body T entity) {
        logger.info(STR."\{this.getClass()}.create(@Body \{entity.getClass()} \{entity}) called");
        return HttpResponse.ok(service.save(entity));
    }

    @Patch()
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public HttpResponse<?> update(@Body T entity) {
        logger.info(STR."\{this.getClass()}.update(@Body \{entity.getClass()} \{entity}) called");
        return HttpResponse.ok(service.update(entity));
    }

    @Delete("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public HttpResponse<?> delete(ID id) {
        logger.info(STR."\{this.getClass()}.delete(\{id.getClass()} \{id}) called");
        return HttpResponse.ok(service.delete(id));
    }
}

