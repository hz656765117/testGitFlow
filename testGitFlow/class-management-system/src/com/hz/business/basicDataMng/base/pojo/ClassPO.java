package com.hz.business.basicDataMng.base.pojo;

import java.util.Date;

public class ClassPO {
    private String classKey;

    private String className;

    private String majorKey;

    private Date createDate;
    
    private MajorPO majorPO;

    public String getClassKey() {
        return classKey;
    }

    public void setClassKey(String classKey) {
        this.classKey = classKey == null ? null : classKey.trim();
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className == null ? null : className.trim();
    }

    public String getMajorKey() {
        return majorKey;
    }

    public void setMajorKey(String majorKey) {
        this.majorKey = majorKey == null ? null : majorKey.trim();
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

	public MajorPO getMajorPO() {
		return majorPO;
	}

	public void setMajorPO(MajorPO majorPO) {
		this.majorPO = majorPO;
	}
}