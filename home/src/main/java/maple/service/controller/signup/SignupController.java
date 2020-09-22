package maple.service.controller.signup;

import maple.applicationBean.ApplicationBean;
import maple.service.userInfo.UserInfo;
import maple.userDao.UserDao;
import org.springframework.context.ApplicationContext;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class SignupController {

    @RequestMapping(value = "/signup", method = RequestMethod.POST, params = {"userName", "password", "email", "position"})
    @ResponseBody
    public SignupResponseObj checkSignupInfo(String userName, String password, String email, String position){
        SignupResponseObj signupResponseObj = new SignupResponseObj();

        if(userName.equals("") || password.equals("")){
            signupResponseObj.setSignupResponseRes("Empty");
            return signupResponseObj;
        }

        ApplicationContext applicationContext = ApplicationBean.getApplicationContext();
        JdbcTemplate jdbcTemplate = (JdbcTemplate) applicationContext.getBean("quickJdbc");
        if(position.equals("student")){
            List<UserInfo> userInfoList  = jdbcTemplate.query("select * from student where userName = ?", new BeanPropertyRowMapper<UserInfo>(UserInfo.class), userName);
            for(UserInfo userInfoItem : userInfoList){
                if(userInfoItem.getUserName().equals(userName)){
                    signupResponseObj.setSignupResponseRes("Exists");
                    return signupResponseObj;
                }
            }
            jdbcTemplate.execute("insert into student(userName, password) values(" + userName + "," + password + ")");
            signupResponseObj.setSignupResponseRes("SignupSuccess");
            return signupResponseObj;
        }else{
            List<UserInfo> userInfoList  = jdbcTemplate.query("select userName from teacher where userName = ?", new BeanPropertyRowMapper<UserInfo>(UserInfo.class), userName);
            System.out.println(userName);
            for(UserInfo userInfoItem : userInfoList){
                if(userInfoItem.getUserName().equals(userName)){
                    signupResponseObj.setSignupResponseRes("Exists");
                    return signupResponseObj;
                }
            }
            jdbcTemplate.execute("insert into teacher(userName, password) values(" + userName + "," + password + ")");
            signupResponseObj.setSignupResponseRes("SignupSuccess");
            return signupResponseObj;
        }
    }
}
