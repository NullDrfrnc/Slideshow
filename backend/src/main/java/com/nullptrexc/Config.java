package com.nullptrexc;

import java.nio.file.Files;
import java.nio.file.Path;
import java.io.IOException;

public class Config {
    public static final Path UPLOADS_DIR;

    static {
        // Use home directory, fallback to tmp if needed
        String home = System.getProperty("user.home");
        if (home == null || home.isBlank()) {
            home = System.getProperty("java.io.tmpdir");
        }

        UPLOADS_DIR = Path.of(home, "slideshow/uploads");

        try {
            Files.createDirectories(UPLOADS_DIR);
        } catch (IOException e) {
            throw new RuntimeException("Could not create uploads directory: " + UPLOADS_DIR, e);
        }
    }
}
