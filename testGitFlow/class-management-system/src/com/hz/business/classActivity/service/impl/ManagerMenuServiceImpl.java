package com.hz.business.classActivity.service.impl;

 
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hz.business.classActivity.base.dao.ManagerMenuMapper;
import com.hz.business.classActivity.base.pojo.ManagerMenu;
import com.hz.business.classActivity.base.pojo.ManagerMenuCriteria;
import com.hz.business.classActivity.service.IManagerMenuService;



/**
 * @author 作者 bhy
 * @version 创建时间：2017/2/9  11:29
 */
@Service
public class ManagerMenuServiceImpl implements IManagerMenuService{
    @Autowired
    private ManagerMenuMapper managerMenuMapper;

    @Override
    public List<ManagerMenu> listByAppIdsAndParentId(Integer parentId, List<Integer> appIds) {
        ManagerMenuCriteria query = new ManagerMenuCriteria();
        byte deleteFlag = 0;
        query.createCriteria()
                .andDeleteFlagEqualTo(deleteFlag)
                .andParentIdEqualTo(parentId)
                .andAppIdIn(appIds);
        query.setOrderByClause("id ASC, sort desc");
        return managerMenuMapper.selectByExample(query);
    }

    @Override
    public List<ManagerMenu> listMenus() {
        ManagerMenuCriteria query = new ManagerMenuCriteria();
        byte deleteFlag = 0;
        query.createCriteria().andDeleteFlagEqualTo(deleteFlag);
        query.setOrderByClause("parent_id ASC, sort ASC");
        return managerMenuMapper.selectByExample(query);
    }

    public String qryAppIdsByRoleCode(List<String> roleCodes){
        return managerMenuMapper.qryAppIdsByRoleCode(roleCodes);
    }

    @Override
    public List<ManagerMenu> listByRoleCodes(List<String> userRoles) {
        ManagerMenuCriteria query = new ManagerMenuCriteria();
        byte deleteFlag = 0;
        query.createCriteria().andDeleteFlagEqualTo(deleteFlag)
        .andRoleCodeIn(userRoles);
        return managerMenuMapper.selectByExample(query);
    }

    /**
     * 根据appID获取菜单
     * @param appId appId
     * @return 菜单列表
     */
    @Override public List<ManagerMenu> listByAppId(Integer appId) {
        ManagerMenuCriteria criteria = new ManagerMenuCriteria();
        criteria.createCriteria()
                .andAppIdEqualTo(appId)
                .andDeleteFlagEqualTo((byte)0);
        return managerMenuMapper.selectByExample(criteria);
    }
}
