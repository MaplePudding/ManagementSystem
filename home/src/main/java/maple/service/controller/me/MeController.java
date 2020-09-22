package maple.service.controller.me;

import maple.applicationBean.ApplicationBean;
import maple.service.userInfo.UserInfo;
import org.springframework.context.ApplicationContext;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class MeController {

    @RequestMapping(value = "/me", method = RequestMethod.GET, params = {"userName", "identy"})
    @ResponseBody
    public UserInfo getMeInfo(String userName, String identy){
        ApplicationContext applicationContext = ApplicationBean.getApplicationContext();
        JdbcTemplate jdbcTemplate = (JdbcTemplate) applicationContext.getBean("quickJdbc");
        if (identy.equals("student")) {
            List<UserInfo> userInfoList = jdbcTemplate.query("select * from student where userName = ?", new BeanPropertyRowMapper<UserInfo>(UserInfo.class
            ), userName);
            return userInfoList.get(0);
        }else{
            List<UserInfo> userInfoList = jdbcTemplate.query("select * from teacher where userName = ?", new BeanPropertyRowMapper<UserInfo>(UserInfo.class
            ), userName);
            return userInfoList.get(0);
        }
    }

    @RequestMapping(value="/meSubmit", params = {"email", "phoneNumber", "sex", "userName"})
    @ResponseBody
    public MeResponseObj updateUserInfo(UserInfo userInfo){
        ApplicationContext applicationContext = ApplicationBean.getApplicationContext();
        JdbcTemplate jdbcTemplate = (JdbcTemplate) applicationContext.getBean("quickJdbc");
        MeResponseObj meResponseObj = new MeResponseObj();
        System.out.println(userInfo.getUserName());
        if(userInfo.getEmail().equals("") || userInfo.getPhoneNumber().equals("")){
            meResponseObj.setMeSubmitRes("SubmitError");
            return meResponseObj;
        }

        jdbcTemplate.update("update student set email = ?, phoneNumber = ?, sex = ? where userName = ?", userInfo.getEmail(), userInfo.getPhoneNumber(), userInfo.getSex(), userInfo.getUserName());

        meResponseObj.setMeSubmitRes("SubmitSuccess");
        return meResponseObj;
    }
}
