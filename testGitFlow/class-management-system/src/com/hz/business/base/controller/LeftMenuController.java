package com.hz.business.base.controller;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.collections.CollectionUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hz.base.utils.JsonUtil;
import com.hz.base.utils.StringUtil;
import com.hz.business.base.model.JsonResult;
import com.hz.business.base.model.ManagerMenuExt;
import com.hz.business.classActivity.base.pojo.ManagerMenu;
import com.hz.business.classActivity.service.IManagerMenuService;

 

 
@Controller
@RequestMapping("sysm/leftMenu")
public class LeftMenuController extends BaseController {

    @Resource
    private IManagerMenuService managerMenuService;

 

    private List<ManagerMenu> managerMenus;

    @PostConstruct
    private  void initMenu() {
        managerMenus = managerMenuService.listMenus();
    }

    /**
     * 获取左侧菜单
     *
     * @param request request
     * @param authentication authentication
     * @return jsonResult
     */
    @RequestMapping("get")
    @ResponseBody
    public JsonResult getLeftMenu(HttpServletRequest request) {
        List<ManagerMenuExt> menus =   getMenu(managerMenus, -1,  new ArrayList<Integer>());
        
        JsonUtil util = JsonUtil.nonDefaultMapper();
        String json = util.toJson(menus);
        return JsonResult.success(menus);
    }
    
     

    /**
     * 递归查询应用菜单
     *
     * @param managerMenus 所有菜单
     * @param parentId 父appId
     * @param appendedMenuId 已添加的menuID
     * @param isAdmin 是否是超级管理员
     * @param roles 有权限应用
     * @param installApps 已安装应用
     * @return ManagerMenuExt对象集合
     */
    private List<ManagerMenuExt> getMenu(List<ManagerMenu> managerMenus, Integer parentId,  List<Integer> appendedMenuId) {
        List<ManagerMenuExt> result = new ArrayList<>();
        for (ManagerMenu menu : managerMenus) {
            if (parentId != -1 && parentId != menu.getParentId().intValue()
                    || appendedMenuId.contains(menu.getId())) {
                continue;
            }
            ManagerMenuExt ext = new ManagerMenuExt();
            ext.setId(menu.getId());
            
            ext.setName(menu.getMenuName());
            ext.setMenuUrl(menu.getMenuUrl());
            ext.setCode(menu.getRoleCode());
            ext.setAppId(menu.getAppId());
            
            
            if (StringUtil.isEmpty(menu.getMenuUrl())) {//表示有子菜单
                //递归查询子菜单
                ext.setChildren(getMenu(managerMenus, menu.getId(),  appendedMenuId));
                appendedMenuId.add(menu.getId());//已添菜单的id,避免重复添加
                if (!CollectionUtils.isEmpty(ext.getChildren())) {
                    result.add(ext);
                }
            } else {
                appendedMenuId.add(menu.getId());//已添菜单的id,避免重复添加
                result.add(ext);
            }
        }
        return result;
    }
}
