package com.nullptrexc.slideshow.model.dto;

public record UploadResponse(String url) {
    public UploadResponse(String url) {
        if (!url.contains("/static/uploads/"))
            this.url = "/static/uploads/" + url;
        else
            this.url = url;
    }
}
