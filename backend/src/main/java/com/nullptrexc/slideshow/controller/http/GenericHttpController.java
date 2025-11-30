package com.nullptrexc.slideshow.controller.http;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nullptrexc.slideshow.controller.LoggableEndpoint;
import com.nullptrexc.slideshow.model.domain.IdEntity;
import com.nullptrexc.slideshow.model.dto.UUIDResponse;
import com.nullptrexc.slideshow.persistance.data.GenericRepository;
import com.nullptrexc.slideshow.service.GenericService;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.MediaType;
import io.micronaut.http.annotation.*;
import io.micronaut.jackson.databind.JacksonDatabindMapper;

import java.io.Serializable;
import java.util.UUID;

public abstract class GenericHttpController<T extends IdEntity, S extends GenericService<T, ? extends GenericRepository<T, ID>, ID>, ID extends Serializable> extends LoggableEndpoint {
    protected final S service;

    public GenericHttpController(S service) {
        this.service = service;
    }

    @Get()
    @Produces(MediaType.APPLICATION_JSON)
    public HttpResponse<?> getAll() {
        logger.info("{}.getAll() called", this.getClass());
        return HttpResponse.ok(service.findAll());
    }

    @Get("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public HttpResponse<?> getWithID(ID id) {
        logger.info("{}.getWithID({} {}) called", this.getClass(), id.getClass(), id);
        return HttpResponse.ok(service.findById(id));
    }

    @Post
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public HttpResponse<?> create(@Body T entity) {
        logger.info("{}.create(@Body {} {}) called", this.getClass(), entity.getClass(), entity);
        service.save(entity);
        return HttpResponse.ok(entity);
    }

    @Patch()
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public HttpResponse<?> update(@Body T entity) {
        logger.info("{}.update(@Body {} {}) called", this.getClass(), entity.getClass(), entity);
        return HttpResponse.ok(service.update(entity));
    }

    @Delete("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public HttpResponse<?> delete(ID id) {
        logger.info("{}.deleteId({} {}) called", this.getClass(), id.getClass(), id);
        service.delete(id);
        return HttpResponse.ok(new UUIDResponse<>(id));
    }
}

