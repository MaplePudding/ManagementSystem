package maple.userDao;

import com.mchange.v2.c3p0.ComboPooledDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;


import java.beans.PropertyVetoException;

@Component
public class UserDao {
    @Value("${jdbc.DriverClass}")
    private String driverClass;

    @Value("${jdbc.Url}")
    private String url;

    @Value("${jdbc.User}")
    private String dataBaseUserName;

    @Value("${jdbc.Password}")
    private String password;

    public String getDriverClass() {
        return driverClass;
    }

    public void setDriverClass(String driverClass) {
        this.driverClass = driverClass;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getUserName() {
        return dataBaseUserName;
    }

    public void setUserName(String userName) {
        this.dataBaseUserName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Bean("dataSource")
    public ComboPooledDataSource getDataSource() throws PropertyVetoException {
        ComboPooledDataSource dataSource = new ComboPooledDataSource();
        dataSource.setDriverClass(this.driverClass);
        dataSource.setJdbcUrl(this.url);
        dataSource.setUser(this.dataBaseUserName);
        dataSource.setPassword(this.password);
        return dataSource;
    }

}
