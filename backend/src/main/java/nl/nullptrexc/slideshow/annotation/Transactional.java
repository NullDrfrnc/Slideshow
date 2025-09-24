package nl.nullptrexc.slideshow.annotation;

import io.micronaut.aop.Around;
import io.micronaut.context.annotation.Type;
import nl.nullptrexc.slideshow.interceptor.HibernateSessionInterceptor;

import java.lang.annotation.*;

@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE, ElementType.METHOD})
@Around
public @interface Transactional {
}
