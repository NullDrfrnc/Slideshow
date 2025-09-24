package nl.nullptrexc.slideshow.interceptor;

import io.micronaut.aop.*;
import jakarta.inject.Singleton;
import nl.nullptrexc.slideshow.annotation.Transactional;
import nl.nullptrexc.slideshow.persistance.util.HibernateSessionManager;
import org.hibernate.Session;
import org.hibernate.Transaction;

@Singleton
@InterceptorBean(Transactional.class)
public class HibernateSessionInterceptor implements MethodInterceptor<Object, Object> {
    private final HibernateSessionManager sessionManager;

    public HibernateSessionInterceptor(HibernateSessionManager sessionManager) {
        this.sessionManager = sessionManager;
    }

    @Override
    public Object intercept(MethodInvocationContext<Object, Object> context) {
        Session session = sessionManager.getSessionFactory().getCurrentSession();
        Transaction tx = session.beginTransaction();

        try {
            Object result = context.proceed();
            tx.commit();

            return result;
        } catch (Exception ex) {
            if (tx.isActive()) {
                tx.rollback();
            }
            throw ex;
        } finally {
            if (session.isOpen()) {
                session.close();
            }
        }
    }
}