package nl.nullptrexc.slideshow.controller;

import io.micronaut.http.HttpResponse;
import io.micronaut.http.MediaType;
import io.micronaut.http.annotation.*;
import nl.nullptrexc.slideshow.model.domain.IdEntity;
import nl.nullptrexc.slideshow.persistance.data.GenericRepository;
import nl.nullptrexc.slideshow.service.GenericService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.Serializable;

public abstract class GenericController<T extends IdEntity, S extends GenericService<T, ? extends GenericRepository<T, ID>, ID>, ID extends Serializable> {

    protected final S service;
    protected final Logger logger;

    public GenericController(S service) {
        logger = LoggerFactory.getLogger(this.getClass());
        this.service = service;
    }

    @Get()
    @Produces(MediaType.APPLICATION_JSON)
    public HttpResponse<?> getAll() {
        logger.info(String.format("%s.getAll() called", this.getClass()));
        return HttpResponse.ok(service.findAll());
    }

    @Get("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public HttpResponse<?> getWithID(ID id) {
        logger.info(String.format("%s.getWithID(%s %s) called", this.getClass(), id.getClass(), id));
        return HttpResponse.ok(service.findById(id));
    }

    @Post
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public HttpResponse<?> create(@Body T entity) {
        logger.info(String.format("%s.create(@Body %s %s) called", this.getClass(), entity.getClass(), entity));
        return HttpResponse.ok(service.save(entity));
    }

    @Patch()
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public HttpResponse<?> update(@Body T entity) {
        logger.info(String.format("%s.update(@Body %s %s) called", this.getClass(), entity.getClass(), entity));
        return HttpResponse.ok(service.update(entity));
    }

    @Delete("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public HttpResponse<?> delete(ID id) {
        logger.info(String.format("%s.delete(%s %s) called", this.getClass(), id.getClass(), id));
        return HttpResponse.ok(service.delete(id));
    }
}

