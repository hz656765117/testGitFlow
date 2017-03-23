package com.hz.business.classActivity.service;


import java.util.List;

import com.hz.business.classActivity.base.pojo.ManagerMenu;

/**
 * @author 作者 bhy
 * @version 创建时间：2017/2/9  11:28
 */
public interface IManagerMenuService {
    /**
     * 根绝安装应用id和父菜单id查询菜单
     * @param parentId 父id
     * @param appIds 企业安装的应用id
     * @return 返回菜单
     */
    List<ManagerMenu> listByAppIdsAndParentId(Integer parentId, List<Integer> appIds);

    /**
     * 查询全部菜单
     * @return 菜单列表
     */
    List<ManagerMenu> listMenus();

    /**
     * 根据角色code获取角色对应的appid
     * @param roleCodes
     * @return
     */
    String qryAppIdsByRoleCode(List<String> roleCodes);

    /**
     * 根据role_code批量查询
     * @param userRoles role_cold集合
     * @return ManagerMenu集合
     */
    List<ManagerMenu> listByRoleCodes(List<String> userRoles);

    /**
     * 根据appID获取菜单
     * @param appId appId
     * @return 菜单列表
     */
    List<ManagerMenu> listByAppId(Integer appId);
}
