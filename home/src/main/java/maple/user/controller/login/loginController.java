package maple.user.controller.login;

import maple.user.userInfo.UserInfo;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.support.AbstractMultipartHttpServletRequest;


import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Controller
public class loginController {

    @RequestMapping(value="/login", method = RequestMethod.GET, params = {"userName", "password"})
    @ResponseBody
    public LoginResponseObj checkLoginInfo(String userName, String password){
        System.out.println(userName);
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("applicationContext.xml");
        JdbcTemplate jdbcTemplate = (JdbcTemplate) applicationContext.getBean("quickJdbc");
        List<UserInfo> userInfoList = jdbcTemplate.query("select * from student where userName = ?", new BeanPropertyRowMapper<UserInfo>(UserInfo.class), userName);
        for(UserInfo userInfoItem : userInfoList){
            if(userInfoItem.getUserName().equals(userName) && userInfoItem.getPassword().equals(password)){
                LoginResponseObj loginResponseObj = new LoginResponseObj();
                loginResponseObj.setLoginResponseRes("LoginSuccess");
                return loginResponseObj;
            }
        }
        LoginResponseObj loginResponseObj = new LoginResponseObj();
        loginResponseObj.setLoginResponseRes("PasswordError");
        return loginResponseObj;
    }
}
