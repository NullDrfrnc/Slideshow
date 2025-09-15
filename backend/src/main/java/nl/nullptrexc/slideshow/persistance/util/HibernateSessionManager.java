package nl.nullptrexc.slideshow.persistance.util;

import jakarta.inject.Singleton;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

@Singleton
public class HibernateSessionManager {
    private final SessionFactory sessionFactory;

    public HibernateSessionManager() {
        this.sessionFactory = new Configuration()
                .configure()
                .buildSessionFactory();
    }

    public SessionFactory getSessionFactory() {
        return sessionFactory;
    }

    public Session getSession() {
        return sessionFactory.getCurrentSession();
    }
}