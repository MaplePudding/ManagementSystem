package maple.service.controller.login;

import maple.applicationBean.ApplicationBean;
import maple.service.userInfo.UserInfo;
import org.springframework.context.ApplicationContext;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@Controller
public class LoginController {

    @RequestMapping(value="/login", method = RequestMethod.GET, params = {"userName", "password", "position"})
    @ResponseBody
    public LoginResponseObj checkLoginInfo(String userName, String password, String position){
        LoginResponseObj loginResponseObj = new LoginResponseObj();

        if(userName.equals("") || password.equals("")){
            loginResponseObj.setLoginResponseRes("Empty");
            return loginResponseObj;
        }

        ApplicationContext applicationContext = ApplicationBean.getApplicationContext();
        JdbcTemplate jdbcTemplate = (JdbcTemplate) applicationContext.getBean("quickJdbc");

        System.out.println(position);
        System.out.println(userName);
        System.out.println(password);
        if(position.equals("student")){
            List<UserInfo> userInfoList = jdbcTemplate.query("select * from student where userName = ?", new BeanPropertyRowMapper<UserInfo>(UserInfo.class) ,userName);
            for(UserInfo userInfoItem : userInfoList){
                if(userInfoItem.getUserName().equals(userName) && userInfoItem.getPassword().equals(password)){
                    loginResponseObj.setLoginResponseRes("LoginSuccess");
                    return loginResponseObj;
                }
            }
            loginResponseObj.setLoginResponseRes("LoginError");
            return loginResponseObj;
        }else{
            List<UserInfo> userInfoList = jdbcTemplate.query("select * from teacher where userName = ?", new BeanPropertyRowMapper<UserInfo>(UserInfo.class) ,userName);
            for(UserInfo userInfoItem : userInfoList){
                if(userInfoItem.getUserName().equals(userName) && userInfoItem.getPassword().equals(password)){
                    loginResponseObj.setLoginResponseRes("LoginSuccess");
                    return loginResponseObj;
                }
            }
            loginResponseObj.setLoginResponseRes("LoginError");
            return loginResponseObj;
        }

    }
}
