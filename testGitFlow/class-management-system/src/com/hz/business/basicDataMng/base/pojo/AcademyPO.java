package com.hz.business.basicDataMng.base.pojo;

import java.util.Date;

public class AcademyPO {
    private String academyKey;

    private String academyName;

    private Date createDate;

    public String getAcademyKey() {
        return academyKey;
    }

    public void setAcademyKey(String academyKey) {
        this.academyKey = academyKey == null ? null : academyKey.trim();
    }

    public String getAcademyName() {
        return academyName;
    }

    public void setAcademyName(String academyName) {
        this.academyName = academyName == null ? null : academyName.trim();
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }
}