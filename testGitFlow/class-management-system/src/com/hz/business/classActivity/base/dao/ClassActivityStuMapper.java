package com.hz.business.classActivity.base.dao;

import com.hz.business.classActivity.base.pojo.ClassActivityStu;
import com.hz.business.classActivity.base.pojo.ClassActivityStuExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface ClassActivityStuMapper {
    int countByExample(ClassActivityStuExample example);

    int deleteByExample(ClassActivityStuExample example);

    int deleteByPrimaryKey(Integer activityStuKey);

    int insert(ClassActivityStu record);

    int insertSelective(ClassActivityStu record);

    List<ClassActivityStu> selectByExample(ClassActivityStuExample example);

    ClassActivityStu selectByPrimaryKey(Integer activityStuKey);

    int updateByExampleSelective(@Param("record") ClassActivityStu record, @Param("example") ClassActivityStuExample example);

    int updateByExample(@Param("record") ClassActivityStu record, @Param("example") ClassActivityStuExample example);

    int updateByPrimaryKeySelective(ClassActivityStu record);

    int updateByPrimaryKey(ClassActivityStu record);
}