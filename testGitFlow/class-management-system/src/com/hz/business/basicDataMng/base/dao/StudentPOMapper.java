package com.hz.business.basicDataMng.base.dao;

import com.hz.business.basicDataMng.base.pojo.StudentPO;
import com.hz.business.basicDataMng.base.pojo.StudentPOExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface StudentPOMapper {
    int countByExample(StudentPOExample example);

    int deleteByExample(StudentPOExample example);

    int deleteByPrimaryKey(String studentKey);

    int insert(StudentPO record);

    int insertSelective(StudentPO record);

    List<StudentPO> selectByExample(StudentPOExample example);

    StudentPO selectByPrimaryKey(String studentKey);

    int updateByExampleSelective(@Param("record") StudentPO record, @Param("example") StudentPOExample example);

    int updateByExample(@Param("record") StudentPO record, @Param("example") StudentPOExample example);

    int updateByPrimaryKeySelective(StudentPO record);

    int updateByPrimaryKey(StudentPO record);
}