package com.nullptrexc.slideshow.model.dto;

import java.io.Serializable;

public record UUIDResponse<ID extends Serializable>(ID id) {
}
