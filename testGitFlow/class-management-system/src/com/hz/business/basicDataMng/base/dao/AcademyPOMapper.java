package com.hz.business.basicDataMng.base.dao;

import java.util.List;
import org.apache.ibatis.annotations.Param;

import com.hz.business.basicDataMng.base.pojo.AcademyPO;
import com.hz.business.basicDataMng.base.pojo.AcademyPOExample;


public interface AcademyPOMapper {
    int countByExample(AcademyPOExample example);

    int deleteByExample(AcademyPOExample example);

    int deleteByPrimaryKey(String academyKey);

    int insert(AcademyPO record);

    int insertSelective(AcademyPO record);

    List<AcademyPO> selectByExample(AcademyPOExample example);

    AcademyPO selectByPrimaryKey(String academyKey);

    int updateByExampleSelective(@Param("record") AcademyPO record, @Param("example") AcademyPOExample example);

    int updateByExample(@Param("record") AcademyPO record, @Param("example") AcademyPOExample example);

    int updateByPrimaryKeySelective(AcademyPO record);

    int updateByPrimaryKey(AcademyPO record);
}