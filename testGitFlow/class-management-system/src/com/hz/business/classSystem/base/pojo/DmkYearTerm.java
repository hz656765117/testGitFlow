package com.hz.business.classSystem.base.pojo;

public class DmkYearTerm {
    private String yearTermKey;

    private String yearTermName;

    private String yearKey;

    private String yearName;

    public String getYearTermKey() {
        return yearTermKey;
    }

    public void setYearTermKey(String yearTermKey) {
        this.yearTermKey = yearTermKey == null ? null : yearTermKey.trim();
    }

    public String getYearTermName() {
        return yearTermName;
    }

    public void setYearTermName(String yearTermName) {
        this.yearTermName = yearTermName == null ? null : yearTermName.trim();
    }

    public String getYearKey() {
        return yearKey;
    }

    public void setYearKey(String yearKey) {
        this.yearKey = yearKey == null ? null : yearKey.trim();
    }

    public String getYearName() {
        return yearName;
    }

    public void setYearName(String yearName) {
        this.yearName = yearName == null ? null : yearName.trim();
    }
}