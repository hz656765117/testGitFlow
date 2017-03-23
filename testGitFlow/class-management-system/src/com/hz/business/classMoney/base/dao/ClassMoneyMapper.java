package com.hz.business.classMoney.base.dao;

import com.hz.business.classMoney.base.pojo.ClassMoney;
import com.hz.business.classMoney.base.pojo.ClassMoneyExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface ClassMoneyMapper {
    int countByExample(ClassMoneyExample example);

    int deleteByExample(ClassMoneyExample example);

    int deleteByPrimaryKey(String classMoneyKey);

    int insert(ClassMoney record);

    int insertSelective(ClassMoney record);

    List<ClassMoney> selectByExample(ClassMoneyExample example);

    ClassMoney selectByPrimaryKey(String classMoneyKey);

    int updateByExampleSelective(@Param("record") ClassMoney record, @Param("example") ClassMoneyExample example);

    int updateByExample(@Param("record") ClassMoney record, @Param("example") ClassMoneyExample example);

    int updateByPrimaryKeySelective(ClassMoney record);

    int updateByPrimaryKey(ClassMoney record);
}