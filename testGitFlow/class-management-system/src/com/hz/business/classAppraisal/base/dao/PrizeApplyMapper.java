package com.hz.business.classAppraisal.base.dao;

import com.hz.business.classAppraisal.base.pojo.PrizeApply;
import com.hz.business.classAppraisal.base.pojo.PrizeApplyExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface PrizeApplyMapper {
    int countByExample(PrizeApplyExample example);

    int deleteByExample(PrizeApplyExample example);

    int deleteByPrimaryKey(String scholarshipApplyId);

    int insert(PrizeApply record);

    int insertSelective(PrizeApply record);

    List<PrizeApply> selectByExample(PrizeApplyExample example);

    PrizeApply selectByPrimaryKey(String scholarshipApplyId);

    int updateByExampleSelective(@Param("record") PrizeApply record, @Param("example") PrizeApplyExample example);

    int updateByExample(@Param("record") PrizeApply record, @Param("example") PrizeApplyExample example);

    int updateByPrimaryKeySelective(PrizeApply record);

    int updateByPrimaryKey(PrizeApply record);
}