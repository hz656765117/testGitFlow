package com.hz.business.basicDataMng.base.dao;

import com.hz.business.basicDataMng.base.pojo.TeacherPO;
import com.hz.business.basicDataMng.base.pojo.TeacherPOExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface TeacherPOMapper {
    int countByExample(TeacherPOExample example);

    int deleteByExample(TeacherPOExample example);

    int deleteByPrimaryKey(String teacherKey);

    int insert(TeacherPO record);

    int insertSelective(TeacherPO record);

    List<TeacherPO> selectByExample(TeacherPOExample example);

    TeacherPO selectByPrimaryKey(String teacherKey);

    int updateByExampleSelective(@Param("record") TeacherPO record, @Param("example") TeacherPOExample example);

    int updateByExample(@Param("record") TeacherPO record, @Param("example") TeacherPOExample example);

    int updateByPrimaryKeySelective(TeacherPO record);

    int updateByPrimaryKey(TeacherPO record);
}