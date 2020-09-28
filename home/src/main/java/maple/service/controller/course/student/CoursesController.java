package maple.service.controller.course.student;

import com.mysql.cj.jdbc.SuspendableXAConnection;
import maple.applicationBean.ApplicationBean;
import maple.service.userInfo.UserInfo;
import org.springframework.context.ApplicationContext;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.lang.reflect.Array;
import java.util.*;

@Controller
public class CoursesController {

    @RequestMapping(value="/searchCourses", method = RequestMethod.GET, params = {"searchContent", "userName"})
    @ResponseBody
    public List<ClassItem> searchCourses(String searchContent, String userName){
        ApplicationContext applicationContext = ApplicationBean.getApplicationContext();
        JdbcTemplate jdbcTemplate = (JdbcTemplate) applicationContext.getBean("quickJdbc");
        if(!searchContent.equals("")){
            String searchPattern = "%" + searchContent + "%";
            List<ClassItem> classItemList = jdbcTemplate.query("select className from class where className like ?", new BeanPropertyRowMapper<ClassItem>(ClassItem.class), searchPattern);
            List<UserInfo> userInfoList = jdbcTemplate.query("select classes from student where userName = ?", new BeanPropertyRowMapper<UserInfo>(UserInfo.class), userName);
            if(!userInfoList.isEmpty()){
                List<String> tempClassesList = Arrays.asList(userInfoList.get(0).getClasses().split("\\*").clone());
                for(int i = classItemList.size() - 1; i >= 0; --i){
                    if(tempClassesList.contains(classItemList.get(i).getClassName())){
                        classItemList.remove(i);
                    }
                }
            }
            return classItemList;
        }
        List<ClassItem> classItemList = new ArrayList<ClassItem>();
        return classItemList;
    }

    @RequestMapping(value = "joinCourse", method = RequestMethod.GET, params = {"userName", "courseName"})
    @ResponseBody
    public String joinCourse(String courseName, String userName){
        ApplicationContext applicationContext = ApplicationBean.getApplicationContext();
        JdbcTemplate jdbcTemplate = (JdbcTemplate)applicationContext.getBean("quickJdbc");
        if(!courseName.equals("")){
            List<UserInfo> userInfoList = jdbcTemplate.query("select classes from student where userName = ?", new BeanPropertyRowMapper<UserInfo>(UserInfo.class), userName);
            String latestCoursesStr = userInfoList.get(0).getClasses() + courseName + "*";
            jdbcTemplate.update("update student set classes = " + "'" + latestCoursesStr + "'" + "where userName = " + "'" + userName + "'");

            List<ClassItem> classItemList = jdbcTemplate.query("select * from class where className = ?", new BeanPropertyRowMapper<ClassItem>(ClassItem.class), courseName);
            int latestNum = classItemList.get(0).getMemberNum() + 1;
            String latestClassMember = classItemList.get(0).getClassMember() + userName + "*";
            jdbcTemplate.update("update class set memberNum = " + latestNum + ", classMember = " + "'" + latestClassMember + "'" + "where className = " + "'" + courseName + "'");
            return "Success";
        }
        return "Error";
    }

    @RequestMapping(value = "/studentCourses", method = RequestMethod.GET, params = {"userName"})
    @ResponseBody
    public String getStudentCourses(String userName){
        ApplicationContext applicationContext = ApplicationBean.getApplicationContext();
        JdbcTemplate jdbcTemplate = (JdbcTemplate)applicationContext.getBean("quickJdbc");

        List<UserInfo> userInfoList = jdbcTemplate.query("select classes from student where userName = ?", new BeanPropertyRowMapper<UserInfo>(UserInfo.class), userName);
        return userInfoList.get(0).getClasses();
    }

}
