package com.nullptrexc.slideshow.model.dto;

import java.io.Serializable;
import java.util.UUID;

public record UUIDResponse<ID extends Serializable>(ID id) {
}
