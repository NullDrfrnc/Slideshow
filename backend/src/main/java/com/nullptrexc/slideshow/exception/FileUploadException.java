package com.nullptrexc.slideshow.exception;

import io.micronaut.http.multipart.CompletedFileUpload;

public class FileUploadException extends RuntimeException {
    public FileUploadException(String message) {
        super(message);
    }
    
    public FileUploadException(CompletedFileUpload file) {
        super("Failed to upload file: " + file.getFilename());
    }
}
