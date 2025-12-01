package com.nullptrexc.slideshow.controller.http;

import com.nullptrexc.slideshow.controller.LoggableEndpoint;
import com.nullptrexc.slideshow.exception.FileUploadException;
import com.nullptrexc.slideshow.model.dto.UploadResponse;
import com.nullptrexc.slideshow.service.FileService;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.MediaType;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Part;
import io.micronaut.http.annotation.Post;
import io.micronaut.http.annotation.Produces;
import io.micronaut.http.multipart.CompletedFileUpload;

import java.util.UUID;

@Controller("/uploads")
public class UploadController extends LoggableEndpoint {
    private final FileService fileService;

    public UploadController(FileService fileService) {
        this.fileService = fileService;
    }

    @Post(consumes = MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    public HttpResponse<?> upload(@Part("file") CompletedFileUpload file) {
        try {
            String filename = fileService.saveFile(file);
            return HttpResponse.ok(new UploadResponse("/static/uploads/" + filename, filename));
        } catch (FileUploadException e) {
            return HttpResponse.serverError(e.getMessage());
        }
    }
}
