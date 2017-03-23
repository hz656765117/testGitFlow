package com.hz.business.classActivity.base.pojo;

import java.util.Date;

public class ClassActivityStu {
    private Integer activityStuKey;

    private String activityKey;

    private String studentKey;

    private Date createTime;

    private Integer deleteFlag;

    public Integer getActivityStuKey() {
        return activityStuKey;
    }

    public void setActivityStuKey(Integer activityStuKey) {
        this.activityStuKey = activityStuKey;
    }

    public String getActivityKey() {
        return activityKey;
    }

    public void setActivityKey(String activityKey) {
        this.activityKey = activityKey == null ? null : activityKey.trim();
    }

    public String getStudentKey() {
        return studentKey;
    }

    public void setStudentKey(String studentKey) {
        this.studentKey = studentKey == null ? null : studentKey.trim();
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Integer getDeleteFlag() {
        return deleteFlag;
    }

    public void setDeleteFlag(Integer deleteFlag) {
        this.deleteFlag = deleteFlag;
    }
}