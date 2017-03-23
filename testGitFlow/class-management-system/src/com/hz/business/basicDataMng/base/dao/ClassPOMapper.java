package com.hz.business.basicDataMng.base.dao;

import com.hz.business.basicDataMng.base.pojo.ClassPO;
import com.hz.business.basicDataMng.base.pojo.ClassPOExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface ClassPOMapper {
    int countByExample(ClassPOExample example);

    int deleteByExample(ClassPOExample example);

    int deleteByPrimaryKey(String classKey);

    int insert(ClassPO record);

    int insertSelective(ClassPO record);

    List<ClassPO> selectByExample(ClassPOExample example);

    ClassPO selectByPrimaryKey(String classKey);

    int updateByExampleSelective(@Param("record") ClassPO record, @Param("example") ClassPOExample example);

    int updateByExample(@Param("record") ClassPO record, @Param("example") ClassPOExample example);

    int updateByPrimaryKeySelective(ClassPO record);

    int updateByPrimaryKey(ClassPO record);
}