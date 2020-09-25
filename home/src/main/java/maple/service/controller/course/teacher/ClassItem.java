package maple.service.controller.course.teacher;

public class ClassItem {
    private String className;
    private String owner;
    private String classMember;
    private int memberNum;

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public String getClassMember() {
        return classMember;
    }

    public void setClassMember(String classMember) {
        this.classMember = classMember;
    }

    public int getMemberNum() {
        return memberNum;
    }

    public void setMemberNum(int memberNum) {
        this.memberNum = memberNum;
    }
}
