package maple.service.controller.course.teacher;

import maple.applicationBean.ApplicationBean;
import maple.service.userInfo.UserInfo;
import org.springframework.context.ApplicationContext;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.List;

@Controller
public class ClassesController {

    CreateClassRes createClassRes = new CreateClassRes();

    @RequestMapping(value = "/teacherClasses", method = RequestMethod.GET, params = {"userName"})
    @ResponseBody
    public List<ClassItem> getTeacherClasses(String userName){
        ApplicationContext applicationContext = ApplicationBean.getApplicationContext();
        JdbcTemplate jdbcTemplate = (JdbcTemplate) applicationContext.getBean("quickJdbc");
        List<ClassItem> classItemList = jdbcTemplate.query("select className, memberNum from class where owner = ?", new BeanPropertyRowMapper<ClassItem>(ClassItem.class), userName);
        return classItemList;
    }

    @RequestMapping(value = "/newClass", params = {"userName", "className"}, method = RequestMethod.GET)
    @ResponseBody
    public CreateClassRes newTeacherClass(String userName, String className){
        ApplicationContext applicationContext = ApplicationBean.getApplicationContext();
        JdbcTemplate jdbcTemplate = (JdbcTemplate) applicationContext.getBean("quickJdbc");
        List<ClassesContainer> classesList = jdbcTemplate.query("select className from class where className = ?", new BeanPropertyRowMapper<ClassesContainer>(ClassesContainer.class), className);
        if(!classesList.isEmpty()){
            createClassRes.setCreateClassRes("Creation failed");
            return createClassRes;
        }else{
            String sql = "insert into class(className, owner) values(" + "'" + className + "'" + "," + "'" + userName + "'" + ")";
            jdbcTemplate.execute(sql);
            List<UserInfo> userInfoList = jdbcTemplate.query("select classes from teacher where userName = ?", new BeanPropertyRowMapper<UserInfo>(UserInfo.class), userName);
            String classesStr = userInfoList.get(0).getClasses();
            classesStr += "*" + className;
            jdbcTemplate.update("update teacher set classes = ? where userName = ?", classesStr, userName);
            createClassRes.setCreateClassRes("Creation success");
            return createClassRes;
        }
    }

    @RequestMapping(value = "/classStudentsList", method = RequestMethod.GET, params = {"className"})
    @ResponseBody
    public String getClassStudents(String className){
        ApplicationContext applicationContext = ApplicationBean.getApplicationContext();
        JdbcTemplate jdbcTemplate = (JdbcTemplate) applicationContext.getBean("quickJdbc");
        List<ClassItem> classItemList = jdbcTemplate.query("select classMember from class where className = ?", new BeanPropertyRowMapper<ClassItem>(ClassItem.class), className);
        if(!classItemList.isEmpty()){
            return classItemList.get(0).getClassMember();
        }
        return "error";
    }

    @RequestMapping(value = "/uploadNotice", method = RequestMethod.POST)
    @ResponseBody
    public String receiveNotice(MultipartFile file, String userName, String courseName, String time){

        System.out.println(file.getOriginalFilename());

        time = time.replace(":", "-");
        String fileName = time + " ^ " + file.getOriginalFilename();

        File folder = new File("D:\\MyCode\\ManagementSystem\\home\\src\\main\\resources\\notice\\" + courseName);
        if(!folder.exists() && !folder.isDirectory()){
            folder.mkdir();
        }
        File writeFile = new File("D:\\MyCode\\ManagementSystem\\home\\src\\main\\resources\\notice\\" + courseName + "\\" + fileName);
        if(!writeFile.exists()){
            try {
                writeFile.createNewFile();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        try {
            file.transferTo(writeFile);
        } catch (IOException e) {
            e.printStackTrace();
        }

        return "hello";
    }
}
