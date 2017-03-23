package com.hz.business.base.model;

import java.io.Serializable;
import java.util.List;

/**
 * @author 作者 bhy
 * @version 创建时间：2017/2/9  11:47
 */
public class ManagerMenuExt implements Serializable {

    private static final long serialVersionUID = -2763797170132622696L;

    /**
     * 菜单id
     */
    private Integer id ;
    /**
     * 菜单名称
     */
    private String name;
    /**
     * 对应角色
     */
    private String code;

    /**
     * 套件ID
     */
    private Integer suitId;

    /**
     * 是否安装
     */
    private boolean isInstall;

    /**
     * 菜单连接
     */
    private String menuUrl;

    private Integer appId;

    private boolean isVip;

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    /**
     * 子菜单
     */
    private List<ManagerMenuExt> children;

    public List<ManagerMenuExt> getChildren() {
        return children;
    }

    public void setChildren(List<ManagerMenuExt> children) {
        this.children = children;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Integer getSuitId() {
        return suitId;
    }

    public void setSuitId(Integer suitId) {
        this.suitId = suitId;
    }

    public boolean isInstall() {
        return isInstall;
    }

    public void setInstall(boolean install) {
        isInstall = install;
    }

    public String getMenuUrl() {
        return menuUrl;
    }

    public void setMenuUrl(String menuUrl) {
        this.menuUrl = menuUrl;
    }

    public Integer getAppId() {
        return appId;
    }

    public void setAppId(Integer appId) {
        this.appId = appId;
    }

    public boolean isVip() {
        return isVip;
    }

    public void setVip(boolean vip) {
        isVip = vip;
    }
}
