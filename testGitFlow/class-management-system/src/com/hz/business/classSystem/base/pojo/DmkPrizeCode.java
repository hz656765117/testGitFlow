package com.hz.business.classSystem.base.pojo;

public class DmkPrizeCode {
    private String prizeKey;

    private String prizeName;

    private String type;

    public String getPrizeKey() {
        return prizeKey;
    }

    public void setPrizeKey(String prizeKey) {
        this.prizeKey = prizeKey == null ? null : prizeKey.trim();
    }

    public String getPrizeName() {
        return prizeName;
    }

    public void setPrizeName(String prizeName) {
        this.prizeName = prizeName == null ? null : prizeName.trim();
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type == null ? null : type.trim();
    }
}