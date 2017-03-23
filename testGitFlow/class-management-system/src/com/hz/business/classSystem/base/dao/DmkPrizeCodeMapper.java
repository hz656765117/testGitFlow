package com.hz.business.classSystem.base.dao;

import com.hz.business.classSystem.base.pojo.DmkPrizeCode;
import com.hz.business.classSystem.base.pojo.DmkPrizeCodeExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface DmkPrizeCodeMapper {
    int countByExample(DmkPrizeCodeExample example);

    int deleteByExample(DmkPrizeCodeExample example);

    int deleteByPrimaryKey(String prizeKey);

    int insert(DmkPrizeCode record);

    int insertSelective(DmkPrizeCode record);

    List<DmkPrizeCode> selectByExample(DmkPrizeCodeExample example);

    DmkPrizeCode selectByPrimaryKey(String prizeKey);

    int updateByExampleSelective(@Param("record") DmkPrizeCode record, @Param("example") DmkPrizeCodeExample example);

    int updateByExample(@Param("record") DmkPrizeCode record, @Param("example") DmkPrizeCodeExample example);

    int updateByPrimaryKeySelective(DmkPrizeCode record);

    int updateByPrimaryKey(DmkPrizeCode record);
}