package com.nullptrexc.slideshow.controller.http;

import com.nullptrexc.Config;
import com.nullptrexc.slideshow.controller.LoggableEndpoint;
import com.nullptrexc.slideshow.model.dto.UploadResponse;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.MediaType;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Part;
import io.micronaut.http.annotation.Post;
import io.micronaut.http.annotation.Produces;
import io.micronaut.http.multipart.CompletedFileUpload;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.security.PublicKey;

@Controller("/uploads")
public class UploadController extends LoggableEndpoint {

    @Post(consumes = MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    public HttpResponse<?> upload(@Part("file") CompletedFileUpload file) {
        String filename = file.getFilename();
        try {
            try (InputStream is = file.getInputStream()) {
                Files.copy(is, Config.UPLOADS_DIR.resolve(filename), StandardCopyOption.REPLACE_EXISTING);
            }
        } catch (IOException e) {
            return HttpResponse.serverError("Failed to upload file");
        }

        return HttpResponse.ok(new UploadResponse(filename));
    }
}
