package com.nullptrexc.slideshow.exception;

import io.micronaut.http.multipart.CompletedFileUpload;

public class FileDeletionException extends RuntimeException {
    public FileDeletionException(String message) {
        super(message);
    }

    public FileDeletionException(CompletedFileUpload file) {
        super("Failed to upload file: " + file.getFilename());
    }
}
