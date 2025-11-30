package com.nullptrexc.slideshow.util.annotation;

import io.micronaut.aop.Around;

import java.lang.annotation.*;

@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE, ElementType.METHOD})
@Around
public @interface Transactional {
}
