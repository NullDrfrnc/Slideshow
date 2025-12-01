package com.nullptrexc.slideshow.service;

import com.nullptrexc.Config;
import com.nullptrexc.slideshow.model.domain.component.FileComponent;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.multipart.CompletedFileUpload;
import jakarta.inject.Singleton;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;

@Singleton
public class FileService {
    private final Logger logger = LoggerFactory.getLogger(getClass());

    public void saveFile(CompletedFileUpload file) {
        String filename = file.getFilename();
        try {
            try (InputStream is = file.getInputStream()) {
                Files.copy(is, Config.UPLOADS_DIR.resolve(filename), StandardCopyOption.REPLACE_EXISTING);
            }
        } catch (IOException e) {
            logger.error("Failed to upload file: {e}", e);
        }
    }

    public <T extends FileComponent> void removeFile(T component) {
        
    }
}
