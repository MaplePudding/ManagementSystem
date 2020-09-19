package maple.applicationBean;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class ApplicationBean {
    static private ApplicationContext applicationContext = null;
    static {
        applicationContext = new ClassPathXmlApplicationContext("applicationContext.xml");
    }

    private ApplicationBean() {
    }

    public static ApplicationContext getApplicationContext() {
        return applicationContext;
    }
}
