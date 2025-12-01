package com.nullptrexc.slideshow.model.dto;

public record UploadResponse(String url, String filename) {
    public UploadResponse(String url, String filename) {
        if (!filename.contains("/static/uploads/"))
            this.url = "/static/uploads/" + filename;
        else
            this.url = filename;
        
        this.filename = filename;
    }
}
