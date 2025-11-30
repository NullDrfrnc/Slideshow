package com.nullptrexc;

import io.micronaut.runtime.Micronaut;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public class Slideshow {
    public static void main(String[] args) {
        configure();

        Micronaut.run(Slideshow.class);
    }

    public static void configure() {
        if (!Files.exists(Config.UPLOADS_DIR)) {
            try {
                Files.createDirectories(Config.UPLOADS_DIR);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
    }
}
