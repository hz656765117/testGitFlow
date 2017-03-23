package com.hz.business.classMoney.base.pojo;

import java.util.Date;

public class ClassMoney {
    private String classMoneyKey;

    private Double money;

    private Date datetime;

    private String commonts;

    private String type;

    private String classKey;

    public String getClassMoneyKey() {
        return classMoneyKey;
    }

    public void setClassMoneyKey(String classMoneyKey) {
        this.classMoneyKey = classMoneyKey == null ? null : classMoneyKey.trim();
    }

    public Double getMoney() {
        return money;
    }

    public void setMoney(Double money) {
        this.money = money;
    }

    public Date getDatetime() {
        return datetime;
    }

    public void setDatetime(Date datetime) {
        this.datetime = datetime;
    }

    public String getCommonts() {
        return commonts;
    }

    public void setCommonts(String commonts) {
        this.commonts = commonts == null ? null : commonts.trim();
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type == null ? null : type.trim();
    }

    public String getClassKey() {
        return classKey;
    }

    public void setClassKey(String classKey) {
        this.classKey = classKey == null ? null : classKey.trim();
    }
}