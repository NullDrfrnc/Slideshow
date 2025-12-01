package com.nullptrexc.slideshow.service;

import com.nullptrexc.Config;
import com.nullptrexc.slideshow.exception.FileDeletionException;
import com.nullptrexc.slideshow.exception.FileUploadException;
import com.nullptrexc.slideshow.model.domain.component.FileComponent;
import io.micronaut.http.multipart.CompletedFileUpload;
import jakarta.inject.Singleton;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.util.Optional;
import java.util.UUID;

@Singleton
public class FileService {
    private final Logger logger = LoggerFactory.getLogger(getClass());

    public String saveFile(CompletedFileUpload file) throws FileUploadException {
        String filename = UUID.randomUUID() + getFileExtension(file);
        try {
            try (InputStream is = file.getInputStream()) {
                Files.copy(is, Config.UPLOADS_DIR.resolve(filename), StandardCopyOption.REPLACE_EXISTING);
            }
        } catch (IOException e) {
            logger.error("Failed to upload file: {0}", e);
            throw new FileUploadException(file);
        }
        return filename;
    }

    public static <T extends FileComponent> void removeFile(T component) {
        String filename = component.getFilename();
        File toDelete = new File(Config.UPLOADS_DIR + "/" + filename);
        if (!toDelete.delete())
            throw new FileDeletionException(filename);
    }

    private static String getFileExtension(CompletedFileUpload file) {
        return "."+Optional.ofNullable(file.getFilename())
                .filter(f -> f.contains("."))
                .map(f -> f.substring(f.lastIndexOf('.') + 1))
                .orElse("");
    }
}