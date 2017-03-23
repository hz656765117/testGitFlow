package com.hz.business.classSystem.base.dao;

import com.hz.business.classSystem.base.pojo.DmkYearTerm;
import com.hz.business.classSystem.base.pojo.DmkYearTermExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface DmkYearTermMapper {
    int countByExample(DmkYearTermExample example);

    int deleteByExample(DmkYearTermExample example);

    int deleteByPrimaryKey(String yearTermKey);

    int insert(DmkYearTerm record);

    int insertSelective(DmkYearTerm record);

    List<DmkYearTerm> selectByExample(DmkYearTermExample example);

    DmkYearTerm selectByPrimaryKey(String yearTermKey);

    int updateByExampleSelective(@Param("record") DmkYearTerm record, @Param("example") DmkYearTermExample example);

    int updateByExample(@Param("record") DmkYearTerm record, @Param("example") DmkYearTermExample example);

    int updateByPrimaryKeySelective(DmkYearTerm record);

    int updateByPrimaryKey(DmkYearTerm record);
}