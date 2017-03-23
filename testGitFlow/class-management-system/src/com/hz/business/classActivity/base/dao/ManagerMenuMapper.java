package com.hz.business.classActivity.base.dao;

import java.util.List;
import org.apache.ibatis.annotations.Param;

import com.hz.business.classActivity.base.pojo.ManagerMenu;
import com.hz.business.classActivity.base.pojo.ManagerMenuCriteria;

public interface ManagerMenuMapper {
    long countByExample(ManagerMenuCriteria example);

    int deleteByExample(ManagerMenuCriteria example);

    int deleteByPrimaryKey(Integer id);

    int insert(ManagerMenu record);

    int insertSelective(ManagerMenu record);

    List<ManagerMenu> selectByExample(ManagerMenuCriteria example);

    ManagerMenu selectByPrimaryKey(Integer id);

    int updateByExampleSelective(@Param("record") ManagerMenu record, @Param("example") ManagerMenuCriteria example);

    int updateByExample(@Param("record") ManagerMenu record, @Param("example") ManagerMenuCriteria example);

    int updateByPrimaryKeySelective(ManagerMenu record);

    int updateByPrimaryKey(ManagerMenu record);

    String qryAppIdsByRoleCode(List<String> roleCodes);
}